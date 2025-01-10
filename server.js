require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post('/chat', async (req, res) => {
    try {
        console.log('Received chat request:', req.body.message);
        console.log('Using API key:', process.env.OPENAI_API_KEY.substring(0, 7) + '...');

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

        console.log('OpenAI response received');
        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error('Error details:', {
            message: error.message,
            type: error.type,
            status: error.status,
            details: error.response?.data
        });
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 