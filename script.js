document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('command-input');
    const output = document.getElementById('output');

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = input.value;
            output.innerHTML += `$ ${command}\n`;
            
            // Add your command handling logic here
            handleCommand(command);
            
            input.value = '';
        }
    });

    function handleCommand(command) {
        const cmd = command.toLowerCase().trim();
        
        switch(cmd) {
            case 'help':
                output.innerHTML += 'Available commands:\n- help\n- clear\n- date\n- echo [text]\n';
                break;
            case 'clear':
                output.innerHTML = '';
                break;
            case 'date':
                output.innerHTML += new Date().toLocaleString() + '\n';
                break;
            default:
                if (cmd.startsWith('echo ')) {
                    output.innerHTML += cmd.slice(5) + '\n';
                } else {
                    output.innerHTML += `Command not found: ${command}\n`;
                }
        }
    }
}); 