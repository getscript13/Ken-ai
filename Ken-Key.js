class KenKeyManager {
    constructor() {
        this.defaultKey = 'AIzaSyAgIVvbWy5DPHI18c_2Vjnw1nMS1Z4iV0Q';
    }

    static styles = {
        success: 'color: #4CAF50; font-weight: bold; font-size: 14px;',
        info: 'color: #2196F3; font-weight: bold; font-size: 14px;',
        reset: 'color: inherit;'
    };

    setKey(key) {
        window.GEMINI_API_KEY = key;
        console.log(
            '%c[Ken AI Key]%c Nova chave definida!',
            KenKeyManager.styles.success,
            KenKeyManager.styles.reset
        );
    }

    resetKey() {
        window.GEMINI_API_KEY = this.defaultKey;
        console.log(
            '%c[Ken AI Key]%c Usando chave padrão',
            KenKeyManager.styles.info,
            KenKeyManager.styles.reset
        );
    }

    showCommands() {
        console.log(
            '%c[Ken AI Key]%c Comandos disponíveis:\n\n' +
            '• %ckenKey.set("SUA-CHAVE")%c - Define uma nova chave\n' +
            '• %ckenKey.reset()%c - Volta para a chave padrão\n' +
            '• %ckenKey.help()%c - Mostra estes comandos\n',
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

// Define o comando global kenKey
window.kenKey = {
    set: function(key) {
        const manager = new KenKeyManager();
        manager.setKey(key);
    },
    reset: function() {
        const manager = new KenKeyManager();
        manager.resetKey();
    },
    help: function() {
        const manager = new KenKeyManager();
        manager.showCommands();
    }
};

// Exporta o gerenciador de chaves
window.KenKeyManager = KenKeyManager;

// Inicializa com a chave padrão
const initialManager = new KenKeyManager();
initialManager.resetKey();

// Mostra os comandos disponíveis no console
console.log(
    '%c[Ken AI Key]%c Sistema pronto! Use %ckenKey.help()%c para ver os comandos disponíveis',
    KenKeyManager.styles.info,
    KenKeyManager.styles.reset,
    KenKeyManager.styles.success,
    KenKeyManager.styles.reset
);
