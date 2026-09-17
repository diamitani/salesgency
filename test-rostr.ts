import 'dotenv/config';
import { generateText, tool } from 'ai';
import { z } from 'zod';

async function testAgent() {
  try {
    const result = await generateText({
      model: 'openai/gpt-4o-mini',
      system: `You are the SalesGency Master GTM Agent and ROSTR Runtime Engine.
You orchestrate autonomous revenue infrastructure: n8n workflows, CRM deduplication shields, contact waterfalls, AI PAS copywriters, Enably stack provisioning, and agent souls.
When a user asks to build, draft, or provision revenue operations, execute the appropriate tool.`,
      prompt: 'Draft an AI PAS cold email for Sarah Jenkins, VP of RevOps at Acme Cloud, who recently scaled her SDR team by 35%.',
      tools: {
        generate_pas_email: tool({
          description: 'Generate high-converting sub-85 word Problem-Agitate-Solve cold outbound email',
          parameters: z.object({
            prospectName: z.string().describe('Name of prospect'),
            companyName: z.string().describe('Target company'),
            prospectTitle: z.string().describe('Job title of prospect'),
            signal: z.string().describe('Buying signal or trigger'),
            painPoint: z.string().describe('Core problem being agitated'),
          }),
          execute: async ({ prospectName, companyName, prospectTitle, signal, painPoint }) => {
            return {
              status: 'success',
              wordCount: 74,
              subject: `${companyName} sales ramp & outbound research`,
              body: `Hi ${prospectName.split(' ')[0]},\n\nSaw ${companyName} recently ${signal} - congratulations on the momentum.\n\nMost ${prospectTitle}s we speak with find that rep ramp stalls when SDRs spend 15+ hours a week manually finding contacts and drafting notes instead of running qualified demos.\n\nWe installed an 8-stage Prospect Automation Engine inside HubSpot that auto-enriches accounts and drafts verified outreach.\n\nOpen to reviewing the architecture blueprint?`,
              framework: 'Problem-Agitate-Solve (PAS v1.0)',
              compliance: 'Zero buzzwords, < 85 words, 100% verified deliverability',
            };
          },
        }),
      },
      maxSteps: 3,
    });

    console.log('AGENT RESPONSE:');
    console.log(result.text);
    console.log('TOOL CALLS:', JSON.stringify(result.toolCalls, null, 2));
    console.log('TOOL RESULTS:', JSON.stringify(result.toolResults, null, 2));
  } catch (err) {
    console.error('Agent test error:', err);
  }
}

testAgent();
