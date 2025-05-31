// Sistema de Comandos do Ken AI
window.kenCmd = {
    // Controles do Painel
    panel: {
        open: () => {
            const panel = document.querySelector('.ken-ai-panel');
            if (panel) {
                panel.classList.add('active');
                console.log('%c[Ken AI]%c Painel aberto!', 'color: #2196F3; font-weight: bold;', 'color: inherit;');
            }
        },
        close: () => {
            const panel = document.querySelector('.ken-ai-panel');
            if (panel) {
                panel.classList.remove('active');
                console.log('%c[Ken AI]%c Painel fechado!', 'color: #2196F3; font-weight: bold;', 'color: inherit;');
            }
        },
        toggle: () => {
            const panel = document.querySelector('.ken-ai-panel');
            if (panel) {
                panel.classList.toggle('active');
                const status = panel.classList.contains('active') ? 'aberto' : 'fechado';
                console.log('%c[Ken AI]%c Painel ' + status + '!', 'color: #2196F3; font-weight: bold;', 'color: inherit;');
            }
        }
    },

    // Controles do Chat
    chat: {
        clear: () => {
            const chat = document.querySelector('.ken-ai-chat');
            if (chat) {
                chat.innerHTML = '';
                console.log('%c[Ken AI]%c Chat limpo!', 'color: #2196F3; font-weight: bold;', 'color: inherit;');
            }
        }
    },

    // Status e Informações
    status: () => {
        const panel = document.querySelector('.ken-ai-panel');
        const chat = document.querySelector('.ken-ai-chat');
        const messages = chat ? chat.children.length : 0;

        console.log(
            '%c[Ken AI Status]%c\n' +
            '================\n' +
            `Painel: ${panel ? (panel.classList.contains('active') ? 'Aberto' : 'Fechado') : 'Não encontrado'}\n` +
            `Mensagens no chat: ${messages}\n` +
            '================',
            'color: #2196F3; font-weight: bold;',
            'color: inherit;'
        );
    },

    // Comando de Ajuda
    help: () => {
        console.log(
            '%c[Ken AI Comandos]%c\n' +
            '=================\n' +
            'Painel:\n' +
            '  kenCmd.panel.open()    - Abre o painel\n' +
            '  kenCmd.panel.close()   - Fecha o painel\n' +
            '  kenCmd.panel.toggle()  - Alterna o painel\n\n' +
            'Chat:\n' +
            '  kenCmd.chat.clear()    - Limpa o histórico do chat\n\n' +
            'Sistema:\n' +
            '  kenCmd.status()        - Mostra o status do sistema\n' +
            '  kenCmd.help()         - Mostra esta mensagem de ajuda\n' +
            '=================',
            'color: #2196F3; font-weight: bold;',
            'color: inherit;'
        );
    }
};

// Mostrar comandos disponíveis ao carregar
window.kenCmd.help();
