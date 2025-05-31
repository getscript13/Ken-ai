// Sistema de Comandos do Ken AI
class KenCommands {
    static styles = {
        title: 'color: #673AB7; font-weight: bold; font-size: 16px; text-transform: uppercase;',
        success: 'color: #4CAF50; font-weight: bold; font-size: 14px;',
        info: 'color: #2196F3; font-weight: bold; font-size: 14px;',
        error: 'color: #F44336; font-weight: bold; font-size: 14px;',
        divider: 'color: #E0E0E0; font-size: 14px;',
        reset: 'color: inherit;'
    };

    static showMessage(title, message, style = 'info') {
        console.log(
            `\n%c[Ken AI]%c ${title}: %c${message}`,
            KenCommands.styles[style],
            KenCommands.styles.reset,
            KenCommands.styles[style === 'error' ? 'error' : style]
        );
    }

    // Comandos de UI
    static togglePanel() {
        try {
            const panel = document.querySelector('.ken-ai-panel');
            if (panel) {
                const isVisible = panel.classList.contains('active');
                
                // Animação suave
                panel.style.transition = 'all 0.3s ease';
                if (isVisible) {
                    panel.style.transform = 'translateX(100%)';
                    setTimeout(() => panel.classList.remove('active'), 300);
                } else {
                    panel.classList.add('active');
                    setTimeout(() => panel.style.transform = 'translateX(0)', 10);
                }
                
                this.showMessage('Painel', isVisible ? 'Ocultado 👻' : 'Exibido 👋', 'info');
            }
        } catch (error) {
            this.showMessage('Erro', 'Falha ao alternar painel: ' + error.message, 'error');
        }
    }

    static clearChat() {
        try {
            const chat = document.querySelector('.ken-ai-chat');
            const welcome = document.querySelector('#kenAiWelcome');
            
            if (chat) {
                // Efeito fade out
                chat.style.transition = 'opacity 0.3s ease';
                chat.style.opacity = '0';
                
                setTimeout(() => {
                    chat.innerHTML = '';
                    chat.style.opacity = '1';
                    
                    if (welcome) {
                        welcome.style.display = 'block';
                    }
                }, 300);
                
                this.showMessage('Chat', 'Histórico limpo com sucesso! 🧹', 'success');
            }
        } catch (error) {
            this.showMessage('Erro', 'Falha ao limpar chat: ' + error.message, 'error');
        }
    }

    static reload() {
        try {
            // Feedback visual
            const panel = document.querySelector('.ken-ai-panel');
            if (panel) {
                panel.style.opacity = '0.5';
                panel.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    panel.remove();
                    document.dispatchEvent(new Event('DOMContentLoaded'));
                    
                    this.showMessage('Sistema', 'Ken AI recarregado com sucesso! ✨', 'success');
                    this.showStatus();
                }, 300);
            }
        } catch (error) {
            this.showMessage('Erro', 'Falha ao recarregar: ' + error.message, 'error');
        }
    }

    // Sistema e Status
    static showStatus() {
        try {
            const status = [
                { componente: "Interface", status: "✨", ativo: document.querySelector('.ken-ai-panel') !== null },
                { componente: "Chat", status: "💬", ativo: document.querySelector('.ken-ai-chat') !== null },
                { componente: "Chave API", status: "🔑", ativo: window.GEMINI_API_KEY !== undefined },
                { componente: "Ken Key", status: "🔐", ativo: window.kenKeyManager !== undefined },
                { componente: "Ken Prompt", status: "📝", ativo: window.kenPromptManager !== undefined },
                { componente: "Sistema", status: "⚡", ativo: true }
            ];

            console.log('\n%c=== STATUS DO KEN AI ===', KenCommands.styles.title);
            
            status.forEach(item => {
                const statusIcon = item.ativo ? '✓' : '✗';
                const style = item.ativo ? 'success' : 'error';
                console.log(
                    `%c${item.status} ${item.componente}: %c${statusIcon}`,
                    KenCommands.styles.info,
                    KenCommands.styles[style]
                );
            });
            
            console.log('%c=====================', KenCommands.styles.divider);
        } catch (error) {
            this.showMessage('Erro', 'Falha ao mostrar status: ' + error.message, 'error');
        }
    }

    static help() {
        const commands = [
            { comando: "toggle()", icone: "👁️", desc: "Mostra/oculta o painel" },
            { comando: "clear()", icone: "🧹", desc: "Limpa o histórico do chat" },
            { comando: "reload()", icone: "🔄", desc: "Recarrega o Ken AI" },
            { comando: "status()", icone: "📊", desc: "Mostra status do sistema" },
            { comando: "help()", icone: "❓", desc: "Mostra esta ajuda" }
        ];

        console.log('\n%c=== COMANDOS DO KEN AI ===', KenCommands.styles.title);
        
        commands.forEach(cmd => {
            console.log(
                `%c${cmd.icone} kenCmd.${cmd.comando}%c - ${cmd.desc}`,
                KenCommands.styles.info,
                KenCommands.styles.reset
            );
        });
        
        console.log('%c=====================', KenCommands.styles.divider);
    }

    // Animações e Efeitos
    static pulse(element) {
        if (element) {
            element.style.animation = 'none';
            element.offsetHeight; // Força reflow
            element.style.animation = 'pulse 0.3s ease';
        }
    }

    static shake(element) {
        if (element) {
            element.style.animation = 'none';
            element.offsetHeight; // Força reflow
            element.style.animation = 'shake 0.5s ease';
        }
    }
}

// Expõe os comandos globalmente
window.kenCmd = {
    toggle: () => KenCommands.togglePanel(),
    clear: () => KenCommands.clearChat(),
    reload: () => KenCommands.reload(),
    status: () => KenCommands.showStatus(),
    help: () => KenCommands.help()
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    KenCommands.showMessage('Sistema', 'Comandos Ken AI inicializados! Use kenCmd.help() para ajuda 🚀', 'success');
});
