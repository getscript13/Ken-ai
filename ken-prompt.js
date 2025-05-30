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
            console.log('\n%c┌── ERRO ────────────────────────────────────────┐', KenPromptManager.styles.error);
            console.log('%c│ Por favor, forneça um prompt válido!             │', KenPromptManager.styles.error);
            console.log('%c└───────────────────────────────────────────────────┘\n', KenPromptManager.styles.error);
            return;
        }

        this.currentPrompt = newPrompt;
        window.KEN_AI_PROMPT = newPrompt;

        console.log('\n%c┌── PROMPT ATUALIZADO ─────────────────────────────┐', KenPromptManager.styles.success);
        console.log('%c│                                                   │', KenPromptManager.styles.success);
        console.log('%c│ ✓ Novo prompt definido com sucesso!              │', KenPromptManager.styles.success);
        console.log('%c│                                                   │', KenPromptManager.styles.success);
        console.log('%c└───────────────────────────────────────────────────┘\n', KenPromptManager.styles.success);
    }

    resetPrompt() {
        this.currentPrompt = this.defaultPrompt;
        window.KEN_AI_PROMPT = this.defaultPrompt;

        console.log('\n%c┌── PROMPT RESTAURADO ─────────────────────────────┐', KenPromptManager.styles.info);
        console.log('%c│                                                   │', KenPromptManager.styles.info);
        console.log('%c│ ✓ Prompt padrão restaurado com sucesso!          │', KenPromptManager.styles.info);
        console.log('%c│                                                   │', KenPromptManager.styles.info);
        console.log('%c└───────────────────────────────────────────────────┘\n', KenPromptManager.styles.info);
    }

    getPrompt() {
        return this.currentPrompt;
    }

    showPrompt() {
        console.log('\n%c┌── PROMPT ATUAL ──────────────────────────────────┐', KenPromptManager.styles.title);
        console.log('%c│                                                   │', KenPromptManager.styles.title);
        console.log('%c%s', KenPromptManager.styles.prompt, this.currentPrompt);
        console.log('%c│                                                   │', KenPromptManager.styles.title);
        console.log('%c└───────────────────────────────────────────────────┘\n', KenPromptManager.styles.title);
    }

    showCommands() {
        console.log('\n%c┌── COMANDOS DO PROMPT ────────────────────────────┐', KenPromptManager.styles.title);
        console.log('%c│                                                   │', KenPromptManager.styles.title);
        console.log(
            '%c│ %c• %ckenPrompt.set("PROMPT")%c - Define novo prompt      %c│',
            KenPromptManager.styles.title,
            KenPromptManager.styles.divider,
            KenPromptManager.styles.info,
            KenPromptManager.styles.reset,
            KenPromptManager.styles.title
        );
        console.log(
            '%c│ %c• %ckenPrompt.reset()%c - Restaura prompt padrão        %c│',
            KenPromptManager.styles.title,
            KenPromptManager.styles.divider,
            KenPromptManager.styles.info,
            KenPromptManager.styles.reset,
            KenPromptManager.styles.title
        );
        console.log(
            '%c│ %c• %ckenPrompt.show()%c - Exibe prompt atual             %c│',
            KenPromptManager.styles.title,
            KenPromptManager.styles.divider,
            KenPromptManager.styles.info,
            KenPromptManager.styles.reset,
            KenPromptManager.styles.title
        );
        console.log(
            '%c│ %c• %ckenPrompt.help()%c - Mostra este menu de ajuda      %c│',
            KenPromptManager.styles.title,
            KenPromptManager.styles.divider,
            KenPromptManager.styles.info,
            KenPromptManager.styles.reset,
            KenPromptManager.styles.title
        );
        console.log('%c│                                                   │', KenPromptManager.styles.title);
        console.log('%c└───────────────────────────────────────────────────┘\n', KenPromptManager.styles.title);
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

// Mostra mensagem de inicialização
console.log('\n%c┌── KEN AI - SISTEMA DE PROMPTS ──────────────────┐', KenPromptManager.styles.title);
console.log('%c│                                                   │', KenPromptManager.styles.title);
console.log(
    '%c│ %c✓ Sistema Iniciado com Sucesso!                    %c│',
    KenPromptManager.styles.title,
    KenPromptManager.styles.success,
    KenPromptManager.styles.title
);
console.log(
    '%c│ %c➤ Use %ckenPrompt.help()%c para ver os comandos        %c│',
    KenPromptManager.styles.title,
    KenPromptManager.styles.reset,
    KenPromptManager.styles.info,
    KenPromptManager.styles.reset,
    KenPromptManager.styles.title
);
console.log('%c│                                                   │', KenPromptManager.styles.title);
console.log('%c└───────────────────────────────────────────────────┘\n', KenPromptManager.styles.title);
