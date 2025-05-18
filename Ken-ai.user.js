// ==UserScript==
// @name         Ken AI Plurall
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Assistente AI para Plurall
// @author       Seu Nome
// @match        https://*.plurall.net/*
// @grant        none
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
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            display: flex;
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
            gap: 8px;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.9);
            background: rgba(255, 255, 255, 0.1);
            padding: 8px 15px;
            border-radius: 20px;
            margin: 0 auto;
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
        }

        .ken-ai-message {
            display: flex;
            gap: 12px;
            opacity: 0;
            animation: slideIn 0.3s ease-out forwards;
        }

        .ken-ai-message.ai {
            flex-direction: row;
        }

        .ken-ai-message.user {
            flex-direction: row-reverse;
        }

        .ken-ai-avatar {
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
            max-width: 80%;
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 14px;
            line-height: 1.5;
        }

        .ken-ai-message.ai .ken-ai-message-content {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .ken-ai-message.user .ken-ai-message-content {
            background: linear-gradient(135deg, #5856D6, #673AB7);
        }

        .ken-ai-input-area {
            padding: 20px;
            background: rgba(255, 255, 255, 0.02);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .ken-ai-input-container {
            display: flex;
            gap: 10px;
            background: rgba(255, 255, 255, 0.05);
            padding: 12px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .ken-ai-input {
            flex: 1;
            background: none;
            border: none;
            color: white;
            font-size: 14px;
            outline: none;
            font-family: inherit;
            padding: 0 10px;
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
        }

        .ken-ai-suggestions {
            padding: 15px;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        }

        .ken-ai-suggestion-button {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 12px;
            color: white;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 13px;
            text-align: left;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .ken-ai-suggestion-button:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-2px);
        }

        .ken-ai-toggle {
            position: fixed;
            right: 30px;
            bottom: 30px;
            padding: 15px 25px;
            background: linear-gradient(135deg, #5856D6, #673AB7);
            color: white;
            border: none;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(88, 86, 214, 0.3);
            transition: all 0.3s ease;
            z-index: 9998;
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: 'Inter', sans-serif;
        }

        .ken-ai-toggle:hover {
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 6px 20px rgba(88, 86, 214, 0.4);
        }

        .ken-ai-toggle:active {
            transform: translateY(0) scale(0.98);
        }

        .ken-ai-toggle::before {
            content: '';
            position: absolute;
            inset: -2px;
            border-radius: 50px;
            padding: 2px;
            background: linear-gradient(135deg, #5856D6, #673AB7);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .ken-ai-toggle:hover::before {
            opacity: 1;
        }
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
                <span style="font-size: 24px;">🤖</span>
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
        <div class="ken-ai-suggestions">
            <button class="ken-ai-suggestion-button">📚 Resumo da aula</button>
            <button class="ken-ai-suggestion-button">💡 Resolver exercício</button>
            <button class="ken-ai-suggestion-button">✨ Explicar conceito</button>
            <button class="ken-ai-suggestion-button">📝 Criar anotações</button>
        </div>
        <div class="ken-ai-input-area">
            <div class="ken-ai-input-container">
                <input type="text" class="ken-ai-input" placeholder="Digite sua mensagem...">
                <button class="ken-ai-send-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2"/>
                    </svg>
                </button>
            </div>
        </div>
    `;

    // Botão de toggle
    const toggleButton = document.createElement("button");
    toggleButton.className = "ken-ai-toggle";
    toggleButton.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"/>
        </svg>
        Abrir Ken AI
    `;

    // Adiciona os elementos ao documento
    document.body.appendChild(panel);
    document.body.appendChild(toggleButton);

    // Função para adicionar mensagem
    function addMessage(text, isAi = false) {
        const chat = panel.querySelector('.ken-ai-chat');
        const message = document.createElement('div');
        message.className = `ken-ai-message ${isAi ? 'ai' : 'user'}`;
        message.innerHTML = `
            <div class="ken-ai-avatar">${isAi ? '🤖' : '👤'}</div>
            <div class="ken-ai-message-content">${text}</div>
        `;
        chat.appendChild(message);
        message.scrollIntoView({ behavior: 'smooth' });
    }

    // Event listeners para input
    const input = panel.querySelector('.ken-ai-input');
    const sendBtn = panel.querySelector('.ken-ai-send-btn');

    // Atualiza a função handleSend para remover boas-vindas
    function handleSend() {
        const text = input.value.trim();
        if (text) {
            const welcome = document.getElementById('kenAiWelcome');
            if (welcome) {
                welcome.style.display = 'none';
            }
            addMessage(text, false);
            input.value = '';
            // Simula resposta da IA
            setTimeout(() => {
                addMessage('Entendi sua pergunta! Estou processando uma resposta...', true);
            }, 500);
        }
    }

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
})();
