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
    };

    validateKey(key) {
        // Se nenhuma chave for fornecida, usa a chave padrão
        if (!key) {
            key = this.defaultKey;
            console.log(
                '%c[Ken AI Key]%c Usando chave padrão! %cA IA está pronta para uso.',
                KenKeyManager.styles.info,
                KenKeyManager.styles.info,
                KenKeyManager.styles.reset
            );
            window.GEMINI_API_KEY = key;
            return true;
        }

        // Verifica se a chave tem o formato correto
        if (key.startsWith(this.keyPrefix) && key.length >= 39) {
            console.log(
                '%c[Ken AI Key]%c Chave personalizada válida! %cA IA está pronta para uso.',
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
        return true;
    }

    setCustomKey(newKey) {
        if (this.validateKey(newKey)) {
            console.log(
                '%c[Ken AI Key]%c Chave alterada com sucesso! %cNova chave está em uso.',
                KenKeyManager.styles.success,
                KenKeyManager.styles.success,
                KenKeyManager.styles.reset
            );
            return true;
        }
        return false;
    }

    resetToDefaultKey() {
        window.GEMINI_API_KEY = this.defaultKey;
        console.log(
            '%c[Ken AI Key]%c Sistema resetado! %cUsando chave padrão.',
            KenKeyManager.styles.info,
            KenKeyManager.styles.info,
            KenKeyManager.styles.reset
        );
    }
}

// Exporta o gerenciador de chaves
window.KenKeyManager = KenKeyManager;
