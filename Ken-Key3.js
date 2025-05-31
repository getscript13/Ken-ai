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
            this.showTable([
                ['ERRO', 'Por favor, forneça uma chave válida!']
            ], 'error');
            return;
        }
        
        window.GEMINI_API_KEY = key;
        this.currentKey = key;
        
        this.showTable([
            ['STATUS', 'Chave Atualizada ✓'],
            ['NOVA CHAVE', key]
        ], 'success');
    }

    resetKey() {
        window.GEMINI_API_KEY = this.defaultKey;
        this.currentKey = this.defaultKey;
        
        this.showTable([
            ['STATUS', 'Chave Restaurada ✓'],
            ['CHAVE PADRÃO', this.defaultKey]
        ], 'info');
    }

    getKey() {
        return this.currentKey;
    }

    showCommands() {
        this.showTable([
            ['COMANDOS DO KEN KEY', ''],
            ['kenKey.set("CHAVE")', 'Define nova chave API'],
            ['kenKey.reset()', 'Restaura chave padrão'],
            ['kenKey.show()', 'Mostra chave atual'],
            ['kenKey.help()', 'Exibe este menu de ajuda'],
            ['', ''],
            ['CHAVE ATUAL', this.currentKey]
        ], 'title');
    }

    showTable(rows, style = 'info') {
        const maxLength = rows.reduce((max, row) => 
            Math.max(max, row[0].length + row[1].length), 0);
        
        console.log('\n%c┌' + '─'.repeat(maxLength + 4) + '┐', KenKeyManager.styles[style]);
        
        for (const [col1, col2] of rows) {
            if (col1 === '' && col2 === '') {
                console.log('%c│' + ' '.repeat(maxLength + 4) + '│', KenKeyManager.styles[style]);
            } else {
                const spacing = maxLength - (col1.length + col2.length);
                console.log(
                    '%c│ %s%s%s │',
                    KenKeyManager.styles[style],
                    col1 ? col1 + ': ' : '',
                    ' '.repeat(spacing),
                    col2
                );
            }
        }
        
        console.log('%c└' + '─'.repeat(maxLength + 4) + '┘\n', KenKeyManager.styles[style]);
    }
}

// Expõe a classe globalmente
window.KenKeyManager = KenKeyManager;

// Função para inicializar o sistema de chaves
function initializeKeySystem() {
    const keyManager = new KenKeyManager();
    window.kenKeyManager = keyManager;

    window.kenKey = {
        set: function(key) {
            keyManager.setKey(key);
        },
        reset: function() {
            keyManager.resetKey();
        },
        show: function() {
            keyManager.showTable([
                ['CHAVE ATUAL', keyManager.getKey()]
            ], 'info');
        },
        help: function() {
            keyManager.showCommands();
        }
    };

    keyManager.resetKey();
    return keyManager;
}

// Inicializa o sistema quando o documento estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const keyManager = initializeKeySystem();
        keyManager.showTable([
            ['KEN AI - SISTEMA DE CHAVES', ''],
            ['STATUS', 'Sistema Iniciado com Sucesso ✓'],
            ['AJUDA', 'Use kenKey.help() para ver os comandos']
        ], 'title');
    });
} else {
    const keyManager = initializeKeySystem();
    keyManager.showTable([
        ['KEN AI - SISTEMA DE CHAVES', ''],
        ['STATUS', 'Sistema Iniciado com Sucesso ✓'],
        ['AJUDA', 'Use kenKey.help() para ver os comandos']
    ], 'title');
}
