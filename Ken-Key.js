class KenKeyManager {
    constructor() {
        this.defaultKey = 'AIzaSyAgIVvbWy5DPHI18c_2Vjnw1nMS1Z4iV0Q'; // Chave padrão do Gemini
        this.keyPrefix = 'AI'; // Prefixo padrão das chaves Gemini
    }

    static styles = {
        success: 'color: #4CAF50; font-weight: bold; font-size: 14px;',
        error: 'color: #F44336; font-weight: bold; font-size: 14px;',
        info: 'color: #2196F3; font-weight: bold; font-size: 14px;',
        reset: 'color: inherit;'
    };    validateKey(key = this.defaultKey) {
        // Garante que a chave padrão esteja sempre definida primeiro
        if (!window.GEMINI_API_KEY) {
            window.GEMINI_API_KEY = this.defaultKey;
        }

        // Se for a chave padrão, aceita direto
        if (key === this.defaultKey) {
            console.log(
                '%c[Ken AI Key]%c Usando chave padrão',
                KenKeyManager.styles.info,
                KenKeyManager.styles.reset
            );
            window.GEMINI_API_KEY = key;
            return true;
        }

        // Verifica se a chave tem o formato correto
        if (key.startsWith(this.keyPrefix) && key.length >= 39) {
            console.log(
                '%c[Ken AI Key]%c Chave personalizada válida! %cIA pronta para uso',
                KenKeyManager.styles.success,
                KenKeyManager.styles.success,
                KenKeyManager.styles.reset
            );
            window.GEMINI_API_KEY = key;
            return true;
        }

        console.log(
            '%c[Ken AI Key]%c Chave inválida! %cUsando chave padrão...',
            KenKeyManager.styles.error,
            KenKeyManager.styles.error,
            KenKeyManager.styles.reset
        );
        window.GEMINI_API_KEY = this.defaultKey;
        this.showHelp();
        return true;
    }

    showHelp() {
        console.log(
            '%c[Ken AI Key]%c Comandos disponíveis:\n' +
            '• %cken-key set SUA-CHAVE%c - Define uma nova chave\n' +
            '• %cken-key reset%c - Volta para a chave padrão\n' +
            '• %cken-key help%c - Mostra esta ajuda',
            KenKeyManager.styles.info,
            KenKeyManager.styles.reset,
            KenKeyManager.styles.success,
            KenKeyManager.styles.reset,
            KenKeyManager.styles.success,
            KenKeyManager.styles.reset,
            KenKeyManager.styles.success,
            KenKeyManager.styles.reset
        );
    }
}

// Define o comando global ken-key
window.kenKey = {
    set: function(key) {
        const manager = new KenKeyManager();
        manager.validateKey(key);
    },
    reset: function() {
        const manager = new KenKeyManager();
        manager.validateKey(manager.defaultKey);
    },
    help: function() {
        const manager = new KenKeyManager();
        manager.showHelp();
    }
};

// Exporta o gerenciador de chaves
window.KenKeyManager = KenKeyManager;

// Inicializa com a chave padrão
const initialManager = new KenKeyManager();
initialManager.validateKey();

// Mensagem inicial no console
console.log(
    '%c[Ken AI Key]%c Sistema pronto! Digite %cken-key help%c para ver os comandos',
    KenKeyManager.styles.info,
    KenKeyManager.styles.reset,
    KenKeyManager.styles.success,
    KenKeyManager.styles.reset
);
