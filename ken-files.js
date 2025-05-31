// Arquivo de Configuração CDN do Ken AI
window.KenFiles = {
    // Bibliotecas externas
    libs: {
        marked: 'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
        katex: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js',
        katexAuto: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js'
    },

    // Arquivos do Ken AI
    core: {
        ui: 'https://raw.githubusercontent.com/getscript13/Ken-ai/refs/heads/main/ken-ai.ui1.js',
        key: 'https://raw.githubusercontent.com/getscript13/Ken-ai/refs/heads/main/Ken-Key3.js',
        prompt: 'https://raw.githubusercontent.com/getscript13/Ken-ai/refs/heads/main/ken-prompt3.js',
        commands: 'https://raw.githubusercontent.com/getscript13/Ken-ai/refs/heads/main/ken-cmds4.js'
    },

    // Função para carregar todos os arquivos necessários
    loadAll: async function() {
        const allFiles = [
            ...Object.values(this.libs),
            ...Object.values(this.core)
        ];

        for (const url of allFiles) {
            try {
                await this.loadScript(url);
                console.log(`✅ Carregado: ${url.split('/').pop()}`);
            } catch (error) {
                console.error(`❌ Erro ao carregar ${url}:`, error);
            }
        }
    },

    // Função auxiliar para carregar um script
    loadScript: function(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Falha ao carregar: ${url}`));
            document.head.appendChild(script);
        });
    }
};
