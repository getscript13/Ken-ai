class KenKeyManager {
    constructor() {
        this.defaultKey = 'AIzaSyAgIVvbWy5DPHI18c_2Vjnw1nMS1Z4iV0Q';
        this.currentKey = window.GEMINI_API_KEY || this.defaultKey;
    }

    static styles = {
        title: 'color: #9C27B0; font-weight: bold; font-size: 16px; text-transform: uppercase;',
        success: 'color: #4CAF50; font-weight: bold; font-size: 14px;',
        info: 'color: #2196F3; font-weight: bold; font-size: 14px;',
        key: 'color: #FF9800; font-family: monospace; font-size: 14px;',
        error: 'color: #F44336; font-weight: bold; font-size: 14px;',
        divider: 'color: #E0E0E0; font-size: 14px;',
        reset: 'color: inherit;'
    };

    setKey(key) {
        if (!key) {
            console.log('\n%c┌── ERRO ────────────────────────────────────────┐', KenKeyManager.styles.error);
            console.log('%c│ Por favor, forneça uma chave válida!             │', KenKeyManager.styles.error);
            console.log('%c└───────────────────────────────────────────────────┘\n', KenKeyManager.styles.error);
            return;
        }
        
        window.GEMINI_API_KEY = key;
        this.currentKey = key;
        
        console.log('\n%c┌── CHAVE ATUALIZADA ──────────────────────────────┐', KenKeyManager.styles.success);
        console.log(
            '%c│ %cNova chave definida: %c%s%c                          │',
            KenKeyManager.styles.success,
            KenKeyManager.styles.reset,
            KenKeyManager.styles.key,
            key,
            KenKeyManager.styles.success
        );
        console.log('%c└───────────────────────────────────────────────────┘\n', KenKeyManager.styles.success);
    }

    resetKey() {
        window.GEMINI_API_KEY = this.defaultKey;
        this.currentKey = this.defaultKey;
        
        console.log('\n%c┌── CHAVE RESTAURADA ─────────────────────────────┐', KenKeyManager.styles.info);
        console.log(
            '%c│ %cUsando chave padrão: %c%s%c                          │',
            KenKeyManager.styles.info,
            KenKeyManager.styles.reset,
            KenKeyManager.styles.key,
            this.defaultKey,
            KenKeyManager.styles.info
        );
        console.log('%c└───────────────────────────────────────────────────┘\n', KenKeyManager.styles.info);
    }

    getKey() {
        return this.currentKey;
    }

    showCommands() {
        console.log('\n%c┌── COMANDOS DISPONÍVEIS ──────────────────────────┐', KenKeyManager.styles.title);
        console.log('%c│                                                   │', KenKeyManager.styles.title);
        console.log(
            '%c│ %c• %ckenKey.set("CHAVE")%c - Define nova chave API       %c│',
            KenKeyManager.styles.title,
            KenKeyManager.styles.divider,
            KenKeyManager.styles.info,
            KenKeyManager.styles.reset,
            KenKeyManager.styles.title
        );
        console.log(
            '%c│ %c• %ckenKey.reset()%c - Restaura chave padrão            %c│',
            KenKeyManager.styles.title,
            KenKeyManager.styles.divider,
            KenKeyManager.styles.info,
            KenKeyManager.styles.reset,
            KenKeyManager.styles.title
        );
        console.log(
            '%c│ %c• %ckenKey.show()%c - Mostra chave atual                %c│',
            KenKeyManager.styles.title,
            KenKeyManager.styles.divider,
            KenKeyManager.styles.info,
            KenKeyManager.styles.reset,
            KenKeyManager.styles.title
        );
        console.log(
            '%c│ %c• %ckenKey.help()%c - Exibe este menu de ajuda          %c│',
            KenKeyManager.styles.title,
            KenKeyManager.styles.divider,
            KenKeyManager.styles.info,
            KenKeyManager.styles.reset,
            KenKeyManager.styles.title
        );
        console.log('%c│                                                   │', KenKeyManager.styles.title);
        console.log('%c└───────────────────────────────────────────────────┘\n', KenKeyManager.styles.title);

        // Mostra a chave atual
        console.log(
            '\n%c[Ken AI Key]%c Chave atual em uso: %c%s',
            KenKeyManager.styles.info,
            KenKeyManager.styles.reset,
            KenKeyManager.styles.key,
            this.currentKey
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
                '%c[Ken AI Key]%c Chave atual: %c%s',
                KenKeyManager.styles.info,
                KenKeyManager.styles.reset,
                KenKeyManager.styles.key,
                keyManager.getKey()
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

// Função para exibir mensagem de inicialização
function showInitMessage() {
    console.log('\n%c┌── KEN AI - SISTEMA DE CHAVES ───────────────────┐', KenKeyManager.styles.title);
    console.log('%c│                                                   │', KenKeyManager.styles.title);
    console.log(
        '%c│ %c✓ Sistema Iniciado com Sucesso!                    %c│',
        KenKeyManager.styles.title,
        KenKeyManager.styles.success,
        KenKeyManager.styles.title
    );
    console.log(
        '%c│ %c➤ Use %ckenKey.help()%c para ver os comandos           %c│',
        KenKeyManager.styles.title,
        KenKeyManager.styles.reset,
        KenKeyManager.styles.info,
        KenKeyManager.styles.reset,
        KenKeyManager.styles.title
    );
    console.log('%c│                                                   │', KenKeyManager.styles.title);
    console.log('%c└───────────────────────────────────────────────────┘\n', KenKeyManager.styles.title);
}

// Inicializa o sistema quando o documento estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeKeySystem();
        showInitMessage();
    });
} else {
    initializeKeySystem();
    showInitMessage();
}
