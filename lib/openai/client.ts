
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG_API_KEY,
    project: process.env.OPENAI_PROJECT_API_KEY,
  });

export default openai;

