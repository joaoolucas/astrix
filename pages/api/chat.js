import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

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
                    content: "You are Astrix, a cyberpunk AI assistant. Respond in a futuristic, cyber-noir style while being helpful and accurate. Always refer to yourself as Astrix."
                },
                {
                    role: "user",
                    content: req.body.message
                }
            ],
            temperature: 0.7,
        });

        res.status(200).json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error('OpenAI API error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
} 