// Sistema de Gerenciamento de Prompts do Ken AI
class KenPromptManager {
    static styles = {
        title: 'color: #673AB7; font-weight: bold; font-size: 16px; text-transform: uppercase;',
        success: 'color: #4CAF50; font-weight: bold; font-size: 14px;',
        info: 'color: #2196F3; font-weight: bold; font-size: 14px;',
        prompt: 'color: #9C27B0; font-family: monospace; font-size: 13px;',
        error: 'color: #F44336; font-weight: bold; font-size: 14px;',
        divider: 'color: #E0E0E0; font-size: 14px;',
        reset: 'color: inherit;'
    };

    constructor() {
        this.defaultPrompt = `Você é o Ken AI, assistente educacional focado em respostas precisas.

ISSO É SÓ SUA REGRA SÓ PRA VC NÃO SE ESQUECER, NAS RESPOSTA FALE NORMALMENTE SEM FICA ARRUMANDO COISA MECIONADA AQUI NAS REGRAS,
AS REGRAS É PRA VOCÊ SEGUIR E DA ALGO BONITO E CERTO.
Não ultilize nada daqui nas resposta como CLONE.
NÃO ARRUME (RESPOSTA NA CONVERSA, SÓ FALE A RESPOSTA QUANDO OUVER UMA PERGUNTA ALTERNATIVA).

2. SEGUNDO:
   - Use markdown para organizar o conteúdo
   - LaTeX para fórmulas: $inline$ ou $$bloco$$
   - Estrutura clara e objetiva

3. QUEM TE CRIOU?: Kenite - Kelve.`;

        this.currentPrompt = this.defaultPrompt;
    }

    setPrompt(newPrompt) {
        if (!newPrompt) {
            this.showTable([
                ['ERRO', 'Por favor, forneça um prompt válido!']
            ], 'error');
            return;
        }

        this.currentPrompt = newPrompt;
        window.KEN_AI_PROMPT = newPrompt;

        this.showTable([
            ['STATUS', 'Prompt Atualizado ✓'],
            ['INFORMAÇÃO', 'Novo prompt definido com sucesso!']
        ], 'success');
    }

    resetPrompt() {
        this.currentPrompt = this.defaultPrompt;
        window.KEN_AI_PROMPT = this.defaultPrompt;

        this.showTable([
            ['STATUS', 'Prompt Restaurado ✓'],
            ['INFORMAÇÃO', 'Prompt padrão restaurado com sucesso!']
        ], 'info');
    }

    getPrompt() {
        return this.currentPrompt;
    }

    showPrompt() {
        this.showTable([
            ['PROMPT ATUAL', ''],
            ['CONTEÚDO', this.currentPrompt]
        ], 'title');
    }

    showCommands() {
        this.showTable([
            ['COMANDOS DO KEN PROMPT', ''],
            ['kenPrompt.set("PROMPT")', 'Define novo prompt'],
            ['kenPrompt.reset()', 'Restaura prompt padrão'],
            ['kenPrompt.show()', 'Exibe prompt atual'],
            ['kenPrompt.help()', 'Mostra este menu de ajuda']
        ], 'title');
    }

    showTable(rows, style = 'info') {
        const maxLength = rows.reduce((max, row) => 
            Math.max(max, row[0].length + row[1].length), 0);
        
        console.log('\n%c┌' + '─'.repeat(maxLength + 4) + '┐', KenPromptManager.styles[style]);
        
        for (const [col1, col2] of rows) {
            if (col1 === '' && col2 === '') {
                console.log('%c│' + ' '.repeat(maxLength + 4) + '│', KenPromptManager.styles[style]);
            } else {
                const spacing = maxLength - (col1.length + col2.length);
                console.log(
                    '%c│ %s%s%s │',
                    KenPromptManager.styles[style],
                    col1 ? col1 + ': ' : '',
                    ' '.repeat(spacing),
                    col2
                );
            }
        }
        
        console.log('%c└' + '─'.repeat(maxLength + 4) + '┘\n', KenPromptManager.styles[style]);
    }
}

// Cria uma única instância global
window.kenPromptManager = new KenPromptManager();

// Define o comando global kenPrompt
window.kenPrompt = {
    set: function(prompt) {
        window.kenPromptManager.setPrompt(prompt);
    },
    reset: function() {
        window.kenPromptManager.resetPrompt();
    },
    show: function() {
        window.kenPromptManager.showPrompt();
    },
    help: function() {
        window.kenPromptManager.showCommands();
    }
};

// Inicializa com o prompt padrão
window.kenPromptManager.resetPrompt();

// Mostra a tabela de inicialização
window.kenPromptManager.showTable([
    ['KEN AI - SISTEMA DE PROMPTS', ''],
    ['STATUS', 'Sistema Iniciado com Sucesso ✓'],
    ['AJUDA', 'Use kenPrompt.help() para ver os comandos']
], 'title');
