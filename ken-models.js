// Sistema de Modelos do Ken AI
window.kenModels = {
    currentModel: 'gemini', // Modelo padrão

    // Configurações dos modelos
    models: {
        gemini: {
            name: 'Gemini',
            apiEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
            headers: {
                'Content-Type': 'application/json'
            }
        },
        deepseek: {
            name: 'Deepseek',
            apiEndpoint: 'https://openrouter.ai/api/v1/chat/completions',
            headers: {
                'Authorization': 'Bearer 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',
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://plurall.net',
                'X-Title': 'Ken AI'
            }
        }
    },

    // Função para trocar o modelo
    switchModel: function(modelName) {
        if (this.models[modelName]) {
            this.currentModel = modelName;
            console.log(`%c[Ken AI]%c Modelo alterado para ${this.models[modelName].name}`, 'color: #2196F3; font-weight: bold;', 'color: inherit;');
            return true;
        }
        return false;
    },

    // Função para obter o modelo atual
    getCurrentModel: function() {
        return this.models[this.currentModel];
    }
};
