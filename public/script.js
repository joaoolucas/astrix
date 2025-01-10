document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('command-input');
    const output = document.getElementById('output');
    let isTyping = false;

    // Initial boot message
    typeWriter('> ASTRIX CORE ONLINE...\n> Welcome to Astrix Haven...\n> Ready for conversation...\n\n');

    function typeWriter(text, speed = 20) {
        let i = 0;
        isTyping = true;
        input.disabled = true;

        function type() {
            if (i < text.length) {
                output.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                isTyping = false;
                input.disabled = false;
                input.focus();
            }
            output.scrollTop = output.scrollHeight;
        }
        type();
    }

    input.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter' && !isTyping) {
            const message = input.value;
            if (!message.trim()) return;

            output.innerHTML += `\n> ${message}\n`;
            input.value = '';
            input.disabled = true;

            try {
                const response = await fetch(
                    '/api/chat',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ message })
                    }
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                if (data.reply) {
                    typeWriter(`AI: ${data.reply}\n`);
                }
            } catch (error) {
                console.error('Error:', error);
                typeWriter('Error connecting to AI core. Please try again.\n');
            }
            
            output.scrollTop = output.scrollHeight;
        }
    });
}); 