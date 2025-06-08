class KenKeyManager {
    constructor() {
        this.defaultGeminiKey = 'AIzaSyAgIVvbWy5DPHI18c_2Vjnw1nMS1Z4iV0Q';
        this.defaultDeepseekKey = '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';
        this.currentModel = 'gemini';
        this.currentKey = window.GEMINI_API_KEY || this.defaultGeminiKey;
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

    setModel(model) {
        this.currentModel = model;
        if (model === 'gemini') {
            this.currentKey = window.GEMINI_API_KEY || this.defaultGeminiKey;
        } else if (model === 'deepseek') {
            this.currentKey = this.defaultDeepseekKey;
        }
        
        this.showTable([
            ['STATUS', 'Modelo Alterado ✓'],
            ['MODELO ATUAL', model.toUpperCase()],
            ['CHAVE', this.currentKey]
        ], 'success');

        // Atualiza o texto do seletor no painel
        const modelSelector = document.querySelector('#kenai-model-selector');
        if (modelSelector) {
            modelSelector.value = model;
        }
    }

    getCurrentModel() {
        return this.currentModel;
    }

    async makeRequest(prompt) {
        try {
            if (this.currentModel === 'deepseek') {
                const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${this.currentKey}`,
                        "HTTP-Referer": "https://plurall.net",
                        "X-Title": "Ken AI Plurall",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "model": "deepseek/deepseek-r1-0528:free",
                        "messages": [
                            {
                                "role": "user",
                                "content": prompt
                            }
                        ]
                    })
                });

                const data = await response.json();
                if (data.error) {
                    throw new Error(data.error.message || 'Erro ao processar requisição DeepSeek');
                }

                // Retorna o texto da resposta no mesmo formato que o Gemini espera
                return {
                    text: () => Promise.resolve(data.choices[0].message.content)
                };
            } else {
                // Requisição original do Gemini
                const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.currentKey}`;
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: prompt
                            }]
                        }]
                    })
                });

                if (!response.ok) {
                    throw new Error('Erro na requisição Gemini');
                }

                return response;
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            throw error;
        }
    }

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
        window.GEMINI_API_KEY = this.defaultGeminiKey;
        this.currentKey = this.defaultGeminiKey;
        
        this.showTable([
            ['STATUS', 'Chave Restaurada ✓'],
            ['CHAVE PADRÃO', this.defaultGeminiKey]
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
            ['kenKey.setModel("modelo")', 'Alterna entre gemini/deepseek'],
            ['kenKey.help()', 'Exibe este menu de ajuda'],
            ['', ''],
            ['MODELO ATUAL', this.currentModel.toUpperCase()],
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
                ['MODELO ATUAL', keyManager.getCurrentModel().toUpperCase()],
                ['CHAVE ATUAL', keyManager.getKey()]
            ], 'info');
        },
        help: function() {
            keyManager.showCommands();
        },
        setModel: function(model) {
            keyManager.setModel(model);
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
