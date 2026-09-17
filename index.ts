import 'dotenv/config';
import { generateText } from 'ai';

async function main() {
  try {
    const { text } = await generateText({
      model: 'openai/gpt-5.5',
      prompt: 'Invent a new holiday and describe its traditions.',
    });

    console.log('SUCCESS:\n' + text);
  } catch (err: any) {
    console.error('Error with openai/gpt-5.5:', err?.message || err);
    // Let's also check if standard model or provider works
    try {
      const { text } = await generateText({
        model: 'openai/gpt-4o-mini',
        prompt: 'Invent a new holiday and describe its traditions.',
      });
      console.log('SUCCESS (fallback):\n' + text);
    } catch (fallbackErr: any) {
      console.error('Fallback error:', fallbackErr?.message || fallbackErr);
    }
  }
}

main();
