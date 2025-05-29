class KenKeyManager {
    constructor() {
        this.defaultKey = 'AIzaSyAgIVvbWy5DPHI18c_2Vjnw1nMS1Z4iV0Q';
        this.currentKey = window.GEMINI_API_KEY || this.defaultKey;
    }

    static styles = {
        success: 'color: #4CAF50; font-weight: bold; font-size: 14px;',
        info: 'color: #2196F3; font-weight: bold; font-size: 14px;',
        reset: 'color: inherit;'
    };

    setKey(key) {
        if (!key) {
            console.log(
                '%c[Ken AI Key]%c Por favor, forneça uma chave válida!',
                KenKeyManager.styles.info,
                KenKeyManager.styles.reset
            );
            return;
        }
        
        window.GEMINI_API_KEY = key;
        this.currentKey = key;
        
        console.log(
            '%c[Ken AI Key]%c Nova chave definida com sucesso!\nChave: %c' + key,
            KenKeyManager.styles.success,
            KenKeyManager.styles.reset,
            KenKeyManager.styles.info
        );
    }

    resetKey() {
        window.GEMINI_API_KEY = this.defaultKey;
        this.currentKey = this.defaultKey;
        
        console.log(
            '%c[Ken AI Key]%c Usando chave padrão\nChave: %c' + this.defaultKey,
            KenKeyManager.styles.info,
            KenKeyManager.styles.reset,
            KenKeyManager.styles.success
        );
    }    getKey() {
        return this.currentKey;
    }

    showCommands() {
        console.log(
            '%c[Ken AI Key]%c Comandos disponíveis:\n\n' +
            '• %ckenKey.set("SUA-CHAVE")%c - Define uma nova chave\n' +
            '• %ckenKey.reset()%c - Volta para a chave padrão\n' +
            '• %ckenKey.show()%c - Mostra a chave atual\n' +
            '• %ckenKey.help()%c - Mostra estes comandos\n',
            KenKeyManager.styles.info,
            KenKeyManager.styles.reset,
            KenKeyManager.styles.success,
            KenKeyManager.styles.reset,
            KenKeyManager.styles.success,
            KenKeyManager.styles.reset,
            KenKeyManager.styles.success,
            KenKeyManager.styles.reset,
            KenKeyManager.styles.success,
            KenKeyManager.styles.reset
        );

        // Mostra a chave atual
        console.log(
            '%c[Ken AI Key]%c Chave atual: %c' + this.currentKey,
            KenKeyManager.styles.info,
            KenKeyManager.styles.reset,
            KenKeyManager.styles.success
        );
    }
}

// Expõe a classe globalmente
window.KenKeyManager = KenKeyManager;

// Função para inicializar o sistema de chaves
function initializeKeySystem() {
    // Cria uma única instância global
    const keyManager = new KenKeyManager();
    window.kenKeyManager = keyManager;

    // Define o comando global kenKey
    window.kenKey = {
        set: function(key) {
            keyManager.setKey(key);
        },
        reset: function() {
            keyManager.resetKey();
        },
        show: function() {
            console.log(
                '%c[Ken AI Key]%c Chave atual: %c' + keyManager.getKey(),
                KenKeyManager.styles.info,
                KenKeyManager.styles.reset,
                KenKeyManager.styles.success
            );
        },
        help: function() {
            keyManager.showCommands();
        }
    };

    // Inicializa com a chave padrão
    keyManager.resetKey();

    return keyManager;
}

// Inicializa o sistema quando o documento estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeKeySystem();
        console.log(
            '%c[Ken AI Key]%c Sistema pronto! Use %ckenKey.help()%c para ver os comandos disponíveis',
            KenKeyManager.styles.info,
            KenKeyManager.styles.reset,
            KenKeyManager.styles.success,
            KenKeyManager.styles.reset
        );
    });
} else {
    initializeKeySystem();
    console.log(
        '%c[Ken AI Key]%c Sistema pronto! Use %ckenKey.help()%c para ver os comandos disponíveis',
        KenKeyManager.styles.info,
        KenKeyManager.styles.reset,
        KenKeyManager.styles.success,
        KenKeyManager.styles.reset
    );
}
///1
