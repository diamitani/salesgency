/**
 * POST /api/chat — the streaming backend for the Artispreneur chat.
 *
 * assistant-ui's AssistantChatTransport speaks the AI SDK UI message stream
 * protocol, so this route is a thin bridge: AI SDK messages in, a streamed
 * UI message response out.
 *
 * Three things happen here that did not before:
 *
 *   1. The artist is identified. The main site's session cookie is scoped to
 *      .artispreneur.com, so it reaches this subdomain too. lib/session.ts
 *      verifies its signature with AUTH_SECRET before a single field is read —
 *      the cookie is evidence, never authority. A signed-in artist gets their
 *      onboarding answers folded into the brief, so nobody re-types their
 *      genre to every specialist.
 *   2. The thread is shared. History is read from and written to the same
 *      agent_messages rows /api/agent on the main site uses, so a conversation
 *      started in the workspace continues here and vice versa.
 *   3. The managers have tools. Split arithmetic and release-date maths are
 *      where a language model is weakest and where being wrong costs an artist
 *      real money, so both are computed rather than written.
 *
 * The briefs come from lib/agents.ts, which is generated from the main site's
 * api/_lib/agents.js on every dev and build. Editing a brief here would be
 * overwritten; edit it there.
 *
 * Without ANTHROPIC_API_KEY this returns 503 rather than a canned answer. A
 * simulated manager is worse than no manager, because the artist would act on
 * what it said.
 */

import { anthropic } from '@ai-sdk/anthropic';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { AGENTS, SHARED_BRIEF, type AgentId } from '@/lib/agents';
import { sessionFromRequest, artistOf } from '@/lib/session';
import { loadArtistContext, loadThread, appendTurn, storeConfigured } from '@/lib/store';
import { TOOLS } from '@/lib/tools';

export const maxDuration = 60;

const MODEL = process.env.AI_MODEL?.trim() || 'claude-opus-5';

/** How much stored history is replayed to the model. */
const MAX_STORED_TURNS = 20;

/** The last thing the artist actually typed, for persistence. */
function lastUserText(messages: UIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i];
    if (message.role !== 'user') continue;
    const text = (message.parts ?? [])
      .filter((part) => part.type === 'text')
      .map((part) => ('text' in part ? part.text : ''))
      .join('')
      .trim();
    if (text) return text;
  }
  return '';
}

/** The artist's own details, as a block the brief can refer to. */
function artistBrief(
  name: string,
  context: Awaited<ReturnType<typeof loadArtistContext>>
): string {
  const lines = [`You are talking to ${name || 'an artist'}.`];
  if (context?.artistName) lines.push(`They record as ${context.artistName}.`);
  if (context?.location) lines.push(`They are based in ${context.location}.`);
  if (context?.genres?.length) lines.push(`Genres: ${context.genres.join(', ')}.`);
  if (context?.goals?.length) lines.push(`Their stated goals: ${context.goals.join('; ')}.`);
  if (context?.bio) lines.push(`Their bio: ${context.bio}`);
  lines.push(
    'Use these details instead of asking for them again. If something you need is ' +
      'not here, ask for that one fact rather than inventing it.'
  );
  return lines.join('\n');
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      {
        error: 'The managers are not connected yet.',
        hint:
          'Set ANTHROPIC_API_KEY in chat/.env.local (or the Vercel project) and restart. ' +
          'Nothing here is simulated, so there is no output until the key is present.'
      },
      { status: 503 }
    );
  }

  let body: { messages?: UIMessage[]; agentId?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Malformed request body.' }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (!messages.length) {
    return Response.json({ error: 'No messages supplied.' }, { status: 400 });
  }

  // Default to the master agent — it routes to a specialist when the question
  // belongs to one, so an unrouted question is never a dead end.
  const requested = String(body.agentId || 'day-to-day') as AgentId;
  const agent = AGENTS[requested] ?? AGENTS['day-to-day'];

  const artist = artistOf(sessionFromRequest(req));
  const context = artist?.email ? await loadArtistContext(artist.email) : null;

  /* History the browser does not have — turns written from the main site's
     workspace. Replaying them is what makes this the same conversation rather
     than a second one about the same subject. */
  let carried: string = '';
  if (artist) {
    const stored = await loadThread(artist.id, agent.id);
    if (stored.state === 'loaded' && stored.turns.length) {
      // Only what the client did not already send, so a turn is never doubled.
      const seen = new Set(
        messages.flatMap((m) =>
          (m.parts ?? [])
            .filter((p) => p.type === 'text')
            .map((p) => ('text' in p ? p.text.trim() : ''))
        )
      );
      const unseen = stored.turns
        .filter((turn) => !seen.has(turn.content.trim()))
        .slice(-MAX_STORED_TURNS);
      if (unseen.length) {
        carried =
          'Earlier in this conversation, on artispreneur.com:\n\n' +
          unseen.map((t) => `${t.role === 'user' ? 'Artist' : 'You'}: ${t.content}`).join('\n\n');
      }
    }
  }

  const system = [
    SHARED_BRIEF,
    agent.brief,
    agent.mayNot.length
      ? 'Hard limits — you may not:\n' + agent.mayNot.map((r) => `- ${r}`).join('\n')
      : '',
    artist ? artistBrief(artist.name || artist.firstName, context) : '',
    carried,
    // Perplexity-shaped answers: lead with the answer, then support it.
    [
      'Answer format:',
      '- Open with the answer itself in one or two sentences. No preamble, no restating the question.',
      '- Then the detail, in short paragraphs or a tight list.',
      '- Close with the single most useful next action, on its own line, prefixed "Next: ".',
      '- Use markdown headings only when the answer genuinely has sections.'
    ].join('\n')
  ]
    .filter(Boolean)
    .join('\n\n');

  const typed = lastUserText(messages);

  try {
    const result = streamText({
      model: anthropic(MODEL),
      system,
      // v7 resolves attachments/files asynchronously, so this returns a promise.
      messages: await convertToModelMessages(messages),
      tools: TOOLS,
      maxOutputTokens: 4000,
      onFinish: async ({ text }) => {
        /* Persisted only once the model is done, and only for a signed-in
           artist with a database behind them. A stream that dies halfway
           stores nothing rather than storing half an answer the artist would
           come back and read as the whole one. */
        if (!artist || !storeConfigured()) return;
        const reply = (text || '').trim();
        if (!typed || !reply) return;
        try {
          await appendTurn(artist.id, agent.id, 'user', typed);
          await appendTurn(artist.id, agent.id, 'assistant', reply);
        } catch (error) {
          // Losing the transcript must not break the answer already delivered.
          console.error('[chat] could not persist turn', error);
        }
      }
    });

    return result.toUIMessageStreamResponse({
      onError: (error: unknown) => {
        // Surfaced in the thread, so it must read as something an artist can
        // act on rather than a stack trace.
        console.error('[chat] stream failed', error);
        return 'That request could not be completed. Try again in a moment.';
      }
    });
  } catch (error) {
    console.error('[chat] request failed', error);
    return Response.json(
      { error: 'Your manager could not be reached. Please try again.' },
      { status: 502 }
    );
  }
}
