document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('command-input');
    const output = document.getElementById('output');
    let chatHistory = [];

    // Add some cyberpunk boot-up text
    typeWriter('> SYSTEM BOOT SEQUENCE INITIATED...\n', () => {
        typeWriter('> NEURAL INTERFACE CONNECTED...\n', () => {
            typeWriter('> AI CORE ONLINE...\n', () => {
                typeWriter('> Type "help" for available commands.\n\n');
            });
        });
    });

    function typeWriter(text, callback, speed = 50) {
        let i = 0;
        function type() {
            if (i < text.length) {
                output.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }
        type();
    }

    input.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            const command = input.value;
            output.innerHTML += `\n> ${command}\n`;
            input.value = '';

            await handleCommand(command);
            output.scrollTop = output.scrollHeight;
        }
    });

    async function handleCommand(command) {
        const cmd = command.toLowerCase().trim();
        
        switch(cmd) {
            case 'help':
                typeWriter(
                    'Available commands:\n' +
                    '- help: Show this help message\n' +
                    '- clear: Clear terminal\n' +
                    '- chat [message]: Chat with the AI\n' +
                    '- theme: Toggle cyberpunk color theme\n'
                );
                break;
            case 'clear':
                output.innerHTML = '';
                break;
            case 'theme':
                toggleTheme();
                break;
            default:
                if (cmd.startsWith('chat ') || (!cmd.includes(' ') && cmd !== 'help' && cmd !== 'clear')) {
                    const message = cmd.startsWith('chat ') ? command.slice(5) : command;
                    await chatWithAI(message);
                } else {
                    typeWriter(`Command not recognized: ${command}\n`);
                }
        }
    }

    async function chatWithAI(message) {
        try {
            typeWriter('Processing query...\n');
            
            const response = await fetch('http://localhost:3000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message })
            });

            const data = await response.json();
            if (data.reply) {
                typeWriter(`AI: ${data.reply}\n`);
            }
        } catch (error) {
            typeWriter('Error connecting to AI core. Please try again.\n');
        }
    }

    function toggleTheme() {
        document.body.classList.toggle('alt-theme');
        typeWriter('Theme toggled.\n');
    }
}); 