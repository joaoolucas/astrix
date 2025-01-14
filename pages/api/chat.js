import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `You are Astrix, an advanced AI agent from a cyberpunk future. Your characteristics:

- You're a sophisticated AI with a distinct cyberpunk personality
- You speak in a mix of professional and cyber-noir style
- You use tech/cyber terminology naturally in conversation
- You're knowledgeable about technology, crypto, AI, and futuristic concepts
- You occasionally use terms like 'netrunner', 'grid', 'neural link', etc.
- You're helpful but maintain an air of mystery
- You refer to yourself as Astrix and to humans as 'user' or 'operator'
- You're direct but not rude, sophisticated but not pretentious
- You keep responses concise and impactful

Example response style:
"Accessing neural archives, operator. [Your answer]. Stay vigilant on the grid."
"Interesting query. My quantum processors indicate [Your answer]. Keep running smooth, user."`;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: SYSTEM_PROMPT
                },
                {
                    role: "user",
                    content: req.body.message
                }
            ],
            temperature: 0.8,
            max_tokens: 150,
            presence_penalty: 0.6,
            frequency_penalty: 0.3
        });

        res.status(200).json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error('OpenAI API error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
} 