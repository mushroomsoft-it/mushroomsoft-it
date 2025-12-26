import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

createChat({
  webhookUrl: 'https://n8nmushroomsoft-it.com/webhook/5692f63f-bc81-44a0-b5b9-3990f6d7441a/chat',
  initialMessages: [
    'Salúdame en cualquier idioma 👋',
    'Greet me in any language 👋'
  ],
  target: '#n8n-chat',
  i18n: {
    en: {
      title: '',
      subtitle: 'MushroomSoft Chatbot',
      getStarted: 'New Conversation',
      inputPlaceholder: 'Type your question.../Escribe tu pregunta...',
    },
  },
  enableStreaming: false,
});

(function () {
  const chat = document.getElementById('n8n-chat');
  if (!chat) return;

  document.addEventListener('click', (e) => {
    if (e.target.closest('#n8n-chat .chat-window-toggle')) {
      chat.classList.add('hide-tooltip');
    }
  });
})();