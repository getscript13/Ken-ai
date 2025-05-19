// ==UserScript==
// @name         Ken AI Plurall
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Assistente AI para Plurall
// @author       Seu Nome
// @match        https://*.plurall.net/*
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/marked/marked.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Estilos do Ken AI
    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

        .ken-ai-panel {
            position: fixed;
            right: -550px;
            top: 50%;
            transform: translateY(-50%);
            width: 520px;
            height: 85vh;
            background: linear-gradient(135deg, #5856D6 0%, #673AB7 100%);
            backdrop-filter: blur(20px);
            box-shadow: -5px 0 25px rgba(88, 86, 214, 0.3);
            z-index: 2147483647; /* Máximo z-index possível */
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            font-family: 'Inter', sans-serif;
            color: white;
            display: flex;
            flex-direction: column;
            border-radius: 20px 0 0 20px;
            margin: 20px 0;
        }

        .ken-ai-panel.active {
            right: 0;
            box-shadow: -10px 0 30px rgba(88, 86, 214, 0.4);
        }

        .ken-ai-header {
            padding: 25px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 20px 0 0 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .ken-ai-title {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 18px;
            font-weight: 600;
        }

        .ken-ai-status {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.9);
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.1);
            padding: 6px 12px;
            border-radius: 20px;
        }

        .ken-ai-status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #4CAF50;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
        }

        .ken-ai-welcome {
            padding: 40px;
            text-align: center;
            animation: fadeIn 0.5s ease-out;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            margin: 20px;
        }

        .ken-ai-welcome h1 {
            font-size: 32px;
            margin-bottom: 20px;
            background: linear-gradient(135deg, #FFFFFF, #E0E0FF);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 700;
        }

        .ken-ai-welcome p {
            color: rgba(255, 255, 255, 0.9);
            line-height: 1.7;
            font-size: 16px;
            margin-bottom: 25px;
        }

        .ken-ai-chat {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }        .ken-ai-message {
            display: flex;
            gap: 12px;
            opacity: 0;
            animation: slideIn 0.3s ease-out forwards;
            margin-bottom: 16px;
            width: 100%;
            align-items: flex-start;
        }

        .ken-ai-message.ai {
            flex-direction: row;
            padding-right: 10%;
        }

        .ken-ai-message.user {
            flex-direction: row-reverse;
            padding-left: 10%;
        }

        .ken-ai-avatar {
            flex-shrink: 0;
            width: 35px;
            height: 35px;
            border-radius: 12px;
            background: linear-gradient(135deg, #5856D6, #673AB7);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
        }       
 .ken-ai-message-content {
  
    padding: 16px;
    border-radius: 12px;
    font-size: 14px;
    line-height: 1.6;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
}
        }

        .ken-ai-message-content strong,
        .ken-ai-message-content b {
            color: #fff;
            font-weight: 600;
        }

        .ken-ai-message.ai .ken-ai-message-content {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }        /* Estilos para markdown */
        .ken-ai-message-content h1,
        .ken-ai-message-content h2,
        .ken-ai-message-content h3 {
            color: #fff;
            margin: 20px 0 12px 0;
            font-weight: 600;
            line-height: 1.3;
        }

        .ken-ai-message-content h1 { 
            font-size: 1.5em;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 8px;
        }
        .ken-ai-message-content h2 { 
            font-size: 1.3em;
            color: rgba(255, 255, 255, 0.95);
        }
        .ken-ai-message-content h3 { 
            font-size: 1.1em;
            color: rgba(255, 255, 255, 0.9);
        }

        .ken-ai-message-content p {
            margin: 8px 0;
            line-height: 1.6;
        }

        .ken-ai-message-content ul,
        .ken-ai-message-content ol {
            margin: 8px 0;
            padding-left: 20px;
        }

        .ken-ai-message-content li {
            margin: 4px 0;
        }

        .ken-ai-message-content code {
            background: rgba(255, 255, 255, 0.1);
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Consolas', monospace;
        }

        .ken-ai-message-content pre {
            background: rgba(0, 0, 0, 0.2);
            padding: 12px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 12px 0;
        }

        .ken-ai-message-content blockquote {
            border-left: 3px solid rgba(255, 255, 255, 0.2);
            margin: 8px 0;
            padding-left: 16px;
            color: rgba(255, 255, 255, 0.8);
        }

        .ken-ai-message-content a {
            color: #9B89FF;
            text-decoration: none;
        }

        .ken-ai-message-content a:hover {
            text-decoration: underline;
        }

        .ken-ai-message-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 12px 0;
        }

        .ken-ai-message-content th,
        .ken-ai-message-content td {
            padding: 8px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            text-align: left;
        }

        .ken-ai-message-content th {
            background: rgba(255, 255, 255, 0.05);
        }

        .ken-ai-input-area {
            padding: 20px;
            background: rgba(255, 255, 255, 0.02);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            flex-direction: column;
            gap: 10px;
        }        .ken-ai-input-container {
            display: flex;
            gap: 10px;
            background: rgba(255, 255, 255, 0.05);
            padding: 12px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }        .ken-ai-input {
            flex: 1;
            background: none;
            border: none;
            color: white;
            font-size: 14px;
            outline: none;
            font-family: inherit;
        }

        .ken-ai-input::placeholder {
            color: rgba(255, 255, 255, 0.7);
        }

        .ken-ai-send-btn {
            background: linear-gradient(135deg, #5856D6, #673AB7);
            border: none;
            border-radius: 8px;
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s;
        }

        .ken-ai-send-btn:hover {
            transform: scale(1.05);
        }

        @keyframes slideIn {
            from { transform: translateY(10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }        .ken-ai-image-btn {
            background: none;
            border: none;
            border-radius: 8px;
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
            color: rgba(255, 255, 255, 0.7);
        }

        .ken-ai-image-btn:hover {
            color: white;
            background: rgba(255, 255, 255, 0.1);
        }

        .ken-ai-preview-container {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            width: 100%;
            min-height: 0;
            max-height: 0;
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .ken-ai-preview-container:not(:empty) {
            min-height: 80px;
            max-height: 80px;
            padding: 8px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .ken-ai-preview-image {
            width: 60px;
            height: 60px;
            border-radius: 8px;
            object-fit: cover;
            border: 1px solid rgba(255, 255, 255, 0.1);
            position: relative;
        }

        .ken-ai-preview-image:hover::after {
            content: '×';
            position: absolute;
            top: -8px;
            right: -8px;
            background: rgba(255, 0, 0, 0.8);
            color: white;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            cursor: pointer;
        }

        .ken-ai-toggle-area {
            position: fixed;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 44px;
            height: 180px;
            z-index: 2147483646;
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .ken-ai-toggle {
            position: absolute;
            right: -44px;
            padding: 15px;
            background: linear-gradient(135deg,rgba(88, 86, 214, 0) 0%,rgba(104, 58, 183, 0) 100%);
            color: white;
            border: none;
            border-radius: 12px 0 0 12px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            box-shadow: -4px 0 15px rgba(88, 86, 214, 0);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 2147483646;
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: 'Inter', sans-serif;            writing-mode: vertical-lr;
            transform: rotate(0deg);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0);
        }

        .ken-ai-toggle-area:hover .ken-ai-toggle {
            right: 0;
            background: linear-gradient(135deg, #673AB7 0%, #5856D6 100%);
            box-shadow: -8px 0 20px rgba(88, 86, 214, 0.4);
        }

        .ken-ai-toggle svg {
            transform: rotate(180deg);
            transition: transform 0.3s ease;
        }

        .ken-ai-toggle-area:hover .ken-ai-toggle svg {
            transform: rotate(180deg) scale(1.1);
        }

        .ken-ai-toggle::before {
            content: '';
            position: absolute;
            inset: -1px;
            border-radius: 12px 0 0 12px;
            padding: 1px;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
        }        @keyframes pulseButton {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }

        .ken-ai-toggle:hover {
            animation: pulseButton 2s ease-in-out infinite;
        }

        .ken-ai-typing {
            display: flex;
            gap: 6px;
            align-items: center;
            padding: 8px 16px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            width: fit-content;
        }

        .ken-ai-typing-dot {
            width: 8px;
            height: 8px;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 50%;
            animation: typingAnimation 1.4s infinite;
            opacity: 0.6;
        }

        .ken-ai-typing-dot:nth-child(2) { 
            animation-delay: 0.2s; 
            opacity: 0.8;
        }
        
        .ken-ai-typing-dot:nth-child(3) { 
            animation-delay: 0.4s;
            opacity: 1;
        }

        @keyframes typingAnimation {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
        }        /* Estilos para mensagens com imagens */
        .ken-ai-message.user {
            flex-direction: column;
            align-items: flex-end;
            padding-left: 10%;
        }

        .ken-ai-message-images {
            display: grid;
            gap: 8px;
            width: 100%;
            margin-bottom: 8px;
        }

        .ken-ai-message-images.image-count-1 {
            grid-template-columns: minmax(0, 300px);
        }

        .ken-ai-message-images.image-count-2 {
            grid-template-columns: repeat(2, minmax(0, 200px));
        }

        .ken-ai-message-images.image-count-3 {
            grid-template-columns: repeat(3, minmax(0, 150px));
        }

        .ken-ai-message-images img {
            width: 100%;
            height: 150px;
            object-fit: cover;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.05);
        }

        // ...existing code...
    `;

    // Adiciona os estilos ao documento
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Cria e adiciona o painel
    const panel = document.createElement("div");
    panel.className = "ken-ai-panel";
    // Atualiza o HTML do painel
    panel.innerHTML = `
        <div class="ken-ai-header">
            <div class="ken-ai-title">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm-1 14H9v-2h2v2zm2.07-7.75l-.9.92c-.5.51-.86.97-1.04 1.69-.08.32-.13.68-.13 1.14h-2v-.5c0-.46.08-.9.22-1.31.2-.58.53-1.1.95-1.52l1.24-1.26c.46-.44.68-1.1.55-1.8-.13-.72-.73-1.31-1.44-1.44-.52-.09-1.03.07-1.42.45-.38.39-.6.9-.6 1.47H8.5c0-1.31.53-2.58 1.46-3.5.9-.94 2.15-1.46 3.45-1.46 2.86.01 5.08 2.49 4.76 5.38-.23 2.04-1.89 3.43-3.82 3.89-.33.11-.63.31-.63.7v.62h-2V9.83c.64-.24 1.39-.57 1.79-.98.44-.44.69-1.04.69-1.66 0-1.29-1.06-2.34-2.37-2.34-1.31 0-2.38 1.05-2.38 2.34h-2c0-2.42 1.96-4.38 4.38-4.38 2.42 0 4.38 1.96 4.38 4.38 0 1.17-.47 2.26-1.3 3.06z" fill="currentColor"/>
                </svg>
                Ken - AI
            </div>
            <div class="ken-ai-status">
                <div class="ken-ai-status-dot"></div>
                Assistente Online
            </div>
            <button class="ken-ai-close">
                <svg width="24" height="24" viewBox="0 0 24 24" stroke="white" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
        <div class="ken-ai-welcome" id="kenAiWelcome">
            <h1>Bem-vindo ao Ken AI</h1>
            <p>Olá! 👋 Sou seu assistente pessoal para estudos. Estou aqui para ajudar você a aprender de forma mais eficiente e divertida! Vamos começar?</p>
            <div class="ken-ai-features">
                <span>🚀 Respostas Rápidas</span>
                <span>📚 Explicações Detalhadas</span>
                <span>💡 Dicas Inteligentes</span>
            </div>
        </div>
        <div class="ken-ai-chat">
            <!-- Messages will be added here dynamically -->
        </div>        
        <div class="ken-ai-input-area">
            <div class="ken-ai-preview-container"></div>
            <div class="ken-ai-input-container">
                <input type="text" class="ken-ai-input" placeholder="Digite sua mensagem...">
                <button class="ken-ai-image-btn" title="Colar imagem (Ctrl+V)">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" stroke-linecap="round"/>
                        <path d="M8.5 13.5l3 3L22 6"/>
                    </svg>
                </button>
                <button class="ken-ai-send-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2"/>
                    </svg>
                </button>
            </div>
        </div>
    `;

    // Cria a área sensível ao mouse
    const toggleArea = document.createElement("div");
    toggleArea.className = "ken-ai-toggle-area";
      // Botão de toggle
    const toggleButton = document.createElement("button");
    toggleButton.className = "ken-ai-toggle";    
    toggleButton.innerHTML = `<span>Ken AI</span>`;

    // Adiciona o botão dentro da área sensível
    toggleArea.appendChild(toggleButton);

    // Adiciona os elementos ao documento
    document.body.appendChild(panel);
    document.body.appendChild(toggleArea);    // Função para carregar o Marked.js
    function loadMarked() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/marked@4.3.0/marked.min.js';
            script.onload = () => resolve(window.marked);
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // Inicializa o Marked.js
    let markedInstance = null;
    loadMarked().then(marked => {
        markedInstance = marked;
        markedInstance.setOptions({
            gfm: true,
            breaks: true,
            sanitize: false,
            smartLists: true
        });
        console.log('Marked.js carregado com sucesso!');
    }).catch(console.error);

    // Função para formatar a resposta da IA
    async function formatAIResponse(text) {
        try {
            if (!markedInstance) {
                markedInstance = await loadMarked();
            }

            // Remove tags HTML não desejadas
            text = text.replace(/<[^>]*>/g, '');
            
            // Melhora a formatação do texto para markdown
            text = text
                .replace(/^Título:\s*(.*?)$/gm, '## $1')
                .replace(/^Subtítulo:\s*(.*?)$/gm, '### $1')
                .replace(/^[-*]\s*(.*?)$/gm, '• $1')
                .replace(/\b(Importante|Nota|Dica):\s*/g, '**$1:** ')
                .replace(/\b(Conceito|Definição):\s*/g, '_$1:_ ')
                .replace(/\b(Exemplo|Caso):\s*/g, '> $1: ')
                .replace(/`(.*?)`/g, '`$1`')
                .replace(/^(Seção|Parte)\s*(\d+):\s*(.*?)$/gm, '### $1 $2: $3');

            // Converte o markdown para HTML
            return markedInstance.parse(text);
        } catch (error) {
            console.error('Erro ao formatar resposta:', error);
            return text;
        }
    }

    // Função para adicionar mensagem
    async function addMessage(text, isAi = false) {
        const chat = panel.querySelector('.ken-ai-chat');
        const message = document.createElement('div');
        message.className = `ken-ai-message ${isAi ? 'ai' : 'user'}`;
        
        let formattedText = text;
        if (isAi) {
            try {
                formattedText = await formatAIResponse(text);
            } catch (error) {
                console.error('Erro ao formatar mensagem:', error);
            }
        }
        
        message.innerHTML = `
            <div class="ken-ai-avatar">${isAi ? '🤖' : '👤'}</div>
            <div class="ken-ai-message-content">${formattedText}</div>
        `;
        
        chat.appendChild(message);
        message.scrollIntoView({ behavior: 'smooth' });
    }

    // Configuração da API Gemini
    const GEMINI_API_KEY = 'AIzaSyAgIVvbWy5DPHI18c_2Vjnw1nMS1Z4iV0Q';
    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent';

    // Função para criar o prompt contextualizado
    function createContextualPrompt(userText, images = []) {
        const basePrompt = `Você é o Ken AI, um assistente educacional amigável e focado. Responda sempre de forma relevante à pergunta do estudante.

Se for uma saudação ou pergunta casual, responda de forma amigável e breve.
Se for uma pergunta sobre conteúdo educacional, então use a seguinte estrutura:
Se tiver IMAGEM, Responda certa veja a IMAGEM atentamente e fale a resposta CORRETA.

1. Use formatação markdown para organização:
   - Títulos (## para seções principais, ### para subseções)
   - Listas com marcadores (•) para pontos importantes
   - **Negrito** para conceitos-chave
   - _Itálico_ para definições
   - \`código\` para termos técnicos
   - > Para exemplos práticos

2. Estruture respostas educacionais com:
   - Breve introdução
   - Explicação clara
   - Exemplos quando necessário
   - Conclusão concisa

3. Use linguagem:
   - Clara e direta
   - Adequada ao contexto
   - Amigável e motivadora

4. Se houver imagens, faça referência a elas na resposta.
    - Analise cada detalhe da imagem fornecida.
${images.length > 0 ? 'ATENÇÃO ESPECIAL: Analise cada detalhe da imagem fornecida. Sua resposta deve ser baseada diretamente no que é visível na imagem Fale certo.' : ''}

Mantenha foco total na pergunta. Seja direto e assertivo. Precisão é sua prioridade máxima.

Pergunta do estudante: ${userText}

Resposta:`;

        return basePrompt;
    }

    // Função para fazer requisição à API do Gemini
    async function getGeminiResponse(prompt, images = []) {
        try {
            const contextualPrompt = createContextualPrompt(prompt, images);
            
            // Prepara as partes do conteúdo
            const parts = [];
            
            // Adiciona o texto do prompt
            parts.push({
                text: contextualPrompt
            });
            
            // Adiciona as imagens, se houver
            for (const imageBase64 of images) {
                // Remove o prefixo "data:image/[tipo];base64," se existir
                const base64Data = imageBase64.split(',')[1] || imageBase64;
                
                parts.push({
                    inlineData: {
                        mimeType: "image/jpeg", // ou detectar dinamicamente
                        data: base64Data
                    }
                });
            }

            const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: parts
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 32,
                        topP: 1,
                        maxOutputTokens: 2048,
                    }
                })
            });

            if (!response.ok) {
                throw new Error('Erro na resposta da API');
            }

            const data = await response.json();
            const rawResponse = data.candidates[0].content.parts[0].text;
            
            // Garante que o Marked.js está carregado antes de formatar
            if (!markedInstance) {
                await loadMarked();
            }
            
            return rawResponse;
        } catch (error) {
            console.error('Erro ao obter resposta:', error);
            return 'Desculpe, tive um problema ao processar sua pergunta. Pode tentar novamente?';
        }
    }

    // Atualiza a função handleSend
    async function handleSend() {
        const text = input.value.trim();
        const images = Array.from(document.querySelectorAll('.ken-ai-preview-image img'))
            .map(img => img.dataset.base64);

        if (text || images.length > 0) {
            const welcome = document.getElementById('kenAiWelcome');
            if (welcome) {
                welcome.style.display = 'none';
            }
            
            // Criar mensagem com texto e imagens
            let messageContent = '';
            
            // Adiciona container de imagens se houver imagens
            if (images.length > 0) {
                messageContent += `<div class="ken-ai-message-images image-count-${images.length}">`;
                messageContent += images.map(img => `<img src="${img}" alt="Imagem anexada">`).join('');
                messageContent += '</div>';
            }
            
            // Adiciona o texto se houver
            if (text) {
                messageContent += text;
            } else if (images.length > 0) {
                // Se só tiver imagens, adiciona um espaço em branco para manter o layout
                messageContent += '&nbsp;';
            }
            
            // Adiciona a mensagem do usuário
            await addMessage(messageContent, false);
            input.value = '';
            
            // Limpa as imagens
            document.querySelector('.ken-ai-preview-container').innerHTML = '';

            // Adiciona o indicador de digitação
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'ken-ai-message ai';
            typingIndicator.innerHTML = `
                <div class="ken-ai-avatar">🤖</div>
                <div class="ken-ai-message-content" style="padding: 8px;">
                    <div class="ken-ai-typing">
                        <span class="ken-ai-typing-dot"></span>
                        <span class="ken-ai-typing-dot"></span>
                        <span class="ken-ai-typing-dot"></span>
                    </div>
                </div>
            `;
            const chat = panel.querySelector('.ken-ai-chat');
            chat.appendChild(typingIndicator);
            typingIndicator.scrollIntoView({ behavior: 'smooth' });

            try {
                // Obtém e formata a resposta da API, incluindo as imagens
                const response = await getGeminiResponse(text, images);
                chat.removeChild(typingIndicator);
                await addMessage(response, true);
            } catch (error) {
                console.error('Erro:', error);
                chat.removeChild(typingIndicator);
                await addMessage('Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.', true);
            }
        }
    }
    // Event listeners para input
    const input = panel.querySelector('.ken-ai-input');
    const sendBtn = panel.querySelector('.ken-ai-send-btn');

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
    
    sendBtn.addEventListener('click', handleSend);

    // Adiciona a funcionalidade de abrir e fechar o painel
    toggleButton.addEventListener("click", () => {
        panel.classList.toggle("active");
    });

    panel.querySelector(".ken-ai-close").addEventListener("click", () => {
        panel.classList.remove("active");
    });

    // Previne propagação de cliques dentro do painel
    panel.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    // Adiciona prefixo a todas as classes para evitar conflitos
    const allElements = panel.getElementsByTagName('*');
    for (let element of allElements) {
        if (element.classList.length > 0) {
            const classes = element.classList;
            for (let i = 0; i < classes.length; i++) {
                if (!classes[i].startsWith('ken-')) {
                    classes.replace(classes[i], `ken-${classes[i]}`);
                }
            }
        }
    }

    // Função para converter imagem para base64
    function convertImageToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    // Função para processar arquivos de imagem
    async function handleFiles(files) {
        const previewContainer = document.querySelector('.ken-ai-preview-container');
        const maxImages = 3;
        
        // Limita o número de imagens
        const currentImages = previewContainer.children.length;
        const remainingSlots = maxImages - currentImages;
        const filesToProcess = Array.from(files).slice(0, remainingSlots);

        for (const file of filesToProcess) {
            if (!file.type.startsWith('image/')) continue;

            try {
                const base64 = await convertImageToBase64(file);
                const imgWrapper = document.createElement('div');
                imgWrapper.className = 'ken-ai-preview-image';
                
                const img = document.createElement('img');
                img.src = base64;
                img.style.width = '100%';
                img.style.height = '100%';
                img.dataset.base64 = base64;
                
                imgWrapper.appendChild(img);
                imgWrapper.onclick = () => imgWrapper.remove();
                
                previewContainer.appendChild(imgWrapper);
            } catch (error) {
                console.error('Erro ao processar imagem:', error);
            }
        }
    }

    // Função para processar imagem da área de transferência
    async function handleClipboardPaste(e) {
        const clipboardItems = e.clipboardData.items;
        const imageItem = Array.from(clipboardItems).find(item => item.type.startsWith('image'));
        
        if (imageItem) {
            const file = imageItem.getAsFile();
            try {
                const base64 = await convertImageToBase64(file);
                addImagePreview(base64);
            } catch (error) {
                console.error('Erro ao processar imagem:', error);
            }
        }
    }

    // Função para adicionar preview da imagem
    function addImagePreview(base64) {
        const previewContainer = document.querySelector('.ken-ai-preview-container');
        const maxImages = 3;
        
        if (previewContainer.children.length >= maxImages) {
            previewContainer.removeChild(previewContainer.firstChild);
        }

        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'ken-ai-preview-image';
        
        const img = document.createElement('img');
        img.src = base64;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.dataset.base64 = base64;
        
        imgWrapper.appendChild(img);
        imgWrapper.onclick = () => imgWrapper.remove();
        
        previewContainer.appendChild(imgWrapper);
    }

    // Adiciona listeners para área de transferência
    document.addEventListener('paste', handleClipboardPaste);
    
    // Adiciona listener para o botão de imagem
    const imageBtn = document.querySelector('.ken-ai-image-btn');
    imageBtn.addEventListener('click', () => {
        // Dispara um evento de paste artificialmente
        const pasteEvent = new ClipboardEvent('paste', {
            clipboardData: new DataTransfer()
        });
        document.dispatchEvent(pasteEvent);
        
        // Alerta o usuário se não houver imagem na área de transferência
        setTimeout(() => {
            const previewContainer = document.querySelector('.ken-ai-preview-container');
            if (previewContainer.children.length === 0) {
                alert('Cole uma imagem usando Ctrl+V ou clique no botão após copiar uma imagem');
            }
        }, 100);
    });
})();
