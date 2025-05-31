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

    // Função para mostrar mensagens estilizadas
    static showMessage(title, message, style = 'info') {
        console.log(
            `\n%c[Ken AI]%c ${title}: %c${message}`,
            KenCommands.styles[style],
            KenCommands.styles.reset,
            KenCommands.styles[style === 'error' ? 'error' : 'success']
        );
    }

    // Recarrega o painel do Ken AI
    static async reloadPanel() {
        try {
            // Feedback visual antes de recarregar
            const panel = document.querySelector('.ken-ai-panel');
            if (panel) {
                panel.style.opacity = '0.5';
                panel.style.transition = 'opacity 0.3s ease';
            }

            // Remove o painel existente
            if (panel) {
                panel.remove();
            }

            // Força recarregamento dos scripts
            document.dispatchEvent(new Event('DOMContentLoaded'));
            
            // Aguarda um momento para garantir que tudo foi recarregado
            await new Promise(resolve => setTimeout(resolve, 500));
            
            KenCommands.showMessage('Painel', 'Recarregado com sucesso! ✨', 'success');
            
            // Atualiza a tabela de status
            setTimeout(() => kenTable([
                { componente: "Painel", status: "✨", ativo: true, info: "Recarregado" },
                { componente: "Chat", status: "💬", ativo: true, info: "Pronto" },
                { componente: "Sistema", status: "🔌", ativo: true, info: "Online" }
            ], {
                title: "STATUS DO SISTEMA",
                style: "success"
            }), 100);
        } catch (error) {
            KenCommands.showMessage('Erro', 'Falha ao recarregar o painel: ' + error.message, 'error');
        }
    }

    // Limpa o histórico do chat
    static clearChat() {
        try {
            const chat = document.querySelector('.ken-ai-chat');
            const welcome = document.querySelector('#kenAiWelcome');
            
            if (chat) {
                // Animação de fade out
                chat.style.transition = 'opacity 0.3s ease';
                chat.style.opacity = '0';
                
                setTimeout(() => {
                    chat.innerHTML = '';
                    chat.style.opacity = '1';
                    
                    // Mostra a mensagem de boas-vindas
                    if (welcome) {
                        welcome.style.display = 'block';
                    }
                }, 300);
                
                KenCommands.showMessage('Chat', 'Histórico limpo com sucesso! 🧹', 'success');
            }
        } catch (error) {
            KenCommands.showMessage('Erro', 'Falha ao limpar o chat: ' + error.message, 'error');
        }
    }

    // Toggle visibilidade do painel
    static togglePanel() {
        try {
            const panel = document.querySelector('.ken-ai-panel');
            if (panel) {
                const isVisible = panel.classList.contains('active');
                panel.style.transition = 'all 0.3s ease';
                
                if (isVisible) {
                    panel.style.transform = 'translateX(100%)';
                    setTimeout(() => panel.classList.remove('active'), 300);
                } else {
                    panel.classList.add('active');
                    setTimeout(() => panel.style.transform = 'translateX(0)', 10);
                }
                
                KenCommands.showMessage(
                    'Painel',
                    isVisible ? 'Ocultado 👻' : 'Exibido 👋',
                    'info'
                );
            }
        } catch (error) {
            KenCommands.showMessage('Erro', 'Falha ao alternar visibilidade: ' + error.message, 'error');
        }
    }

    // Mostra status do sistema
    static showStatus() {
        try {
            const components = [
                { 
                    componente: "Painel", 
                    status: "✨", 
                    ativo: document.querySelector('.ken-ai-panel') !== null,
                    info: "Interface"
                },
                { 
                    componente: "Ken Key", 
                    status: "🔑", 
                    ativo: window.kenKeyManager !== undefined,
                    info: "Gerenciador de Chaves"
                },
                { 
                    componente: "Ken Prompt", 
                    status: "📝", 
                    ativo: window.kenPromptManager !== undefined,
                    info: "Gestor de Prompts"
                },
                { 
                    componente: "API Gemini", 
                    status: "🤖", 
                    ativo: window.GEMINI_API_KEY !== undefined,
                    info: "Conexão API"
                },
                {
                    componente: "Sistema",
                    status: "⚡",
                    ativo: true,
                    info: "Ken AI v1.0"
                }
            ];

            if (typeof kenTable === 'function') {
                kenTable(components, {
                    title: "STATUS DO SISTEMA KEN AI",
                    style: "info"
                });
            } else {
                throw new Error('Função kenTable não encontrada');
            }
        } catch (error) {
            KenCommands.showMessage('Erro', 'Falha ao mostrar status: ' + error.message, 'error');
        }
    }

    // Exibe os comandos disponíveis
    static showCommands() {
        try {
            const commands = [
                { comando: "kenCmd.reload()", descrição: "Recarrega o painel", icone: "🔄", exemplo: "kenCmd.reload()" },
                { comando: "kenCmd.clear()", descrição: "Limpa o histórico", icone: "🧹", exemplo: "kenCmd.clear()" },
                { comando: "kenCmd.toggle()", descrição: "Mostra/oculta painel", icone: "👁️", exemplo: "kenCmd.toggle()" },
                { comando: "kenCmd.status()", descrição: "Status do sistema", icone: "📊", exemplo: "kenCmd.status()" },
                { comando: "kenCmd.help()", descrição: "Mostra comandos", icone: "❓", exemplo: "kenCmd.help()" }
            ];

            if (typeof kenTable === 'function') {
                kenTable(commands, {
                    title: "COMANDOS DISPONÍVEIS",
                    style: "title"
                });
            } else {
                throw new Error('Função kenTable não encontrada');
            }
        } catch (error) {
            KenCommands.showMessage('Erro', 'Falha ao mostrar comandos: ' + error.message, 'error');
        }
    }
}

// Expõe os comandos globalmente
window.kenCmd = {
    reload: () => KenCommands.reloadPanel(),
    clear: () => KenCommands.clearChat(),
    toggle: () => KenCommands.togglePanel(),
    status: () => KenCommands.showStatus(),
    help: () => KenCommands.showCommands()
};

// Verifica se a função kenTable está disponível
document.addEventListener('DOMContentLoaded', () => {
    if (typeof kenTable !== 'function') {
        console.error('%c[Ken AI]%c Erro: Sistema de tabelas não encontrado!', 
            'color: #F44336; font-weight: bold;',
            'color: inherit;'
        );
    }
});
