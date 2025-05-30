// Sistema de Gerenciamento de Prompts do Ken AI
class KenPromptManager {
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

    static styles = {
        success: 'color: #4CAF50; font-weight: bold; font-size: 14px;',
        info: 'color: #2196F3; font-weight: bold; font-size: 14px;',
        reset: 'color: inherit;'
    };

    setPrompt(newPrompt) {
        if (!newPrompt) {
            console.log(
                '%c[Ken AI Prompt]%c Por favor, forneça um prompt válido!',
                KenPromptManager.styles.info,
                KenPromptManager.styles.reset
            );
            return;
        }

        this.currentPrompt = newPrompt;
        window.KEN_AI_PROMPT = newPrompt;

        console.log(
            '%c[Ken AI Prompt]%c Novo prompt definido com sucesso!',
            KenPromptManager.styles.success,
            KenPromptManager.styles.reset
        );
    }

    resetPrompt() {
        this.currentPrompt = this.defaultPrompt;
        window.KEN_AI_PROMPT = this.defaultPrompt;

        console.log(
            '%c[Ken AI Prompt]%c Usando prompt padrão',
            KenPromptManager.styles.info,
            KenPromptManager.styles.reset
        );
    }

    getPrompt() {
        return this.currentPrompt;
    }

    showPrompt() {
        console.log(
            '%c[Ken AI Prompt]%c Prompt atual:\n\n%c' + this.currentPrompt,
            KenPromptManager.styles.info,
            KenPromptManager.styles.reset,
            'color: #673AB7; font-family: monospace;'
        );
    }

    showCommands() {
        console.log(
            '%c[Ken AI Prompt]%c Comandos disponíveis:\n\n' +
            '• %ckenPrompt.set("SEU-PROMPT")%c - Define um novo prompt\n' +
            '• %ckenPrompt.reset()%c - Volta para o prompt padrão\n' +
            '• %ckenPrompt.show()%c - Mostra o prompt atual\n' +
            '• %ckenPrompt.help()%c - Mostra estes comandos\n',
            KenPromptManager.styles.info,
            KenPromptManager.styles.reset,
            KenPromptManager.styles.success,
            KenPromptManager.styles.reset,
            KenPromptManager.styles.success,
            KenPromptManager.styles.reset,
            KenPromptManager.styles.success,
            KenPromptManager.styles.reset,
            KenPromptManager.styles.success,
            KenPromptManager.styles.reset
        );
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

// Mostra os comandos disponíveis no console
console.log(
    '%c[Ken AI Prompt]%c Sistema pronto! Use %ckenPrompt.help()%c para ver os comandos disponíveis',
    KenPromptManager.styles.info,
    KenPromptManager.styles.reset,
    KenPromptManager.styles.success,
    KenPromptManager.styles.reset
);
