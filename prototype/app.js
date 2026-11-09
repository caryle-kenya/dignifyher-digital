(() => {
  const conversation = document.getElementById('conversation');
  const quickPrompts = document.getElementById('quickPrompts');
  const chatLog = document.getElementById('chatLog');
  const form = document.getElementById('questionForm');
  const input = document.getElementById('questionInput');
  const toast = document.getElementById('toast');
  let toastTimer;

  const library = {
    cycle: {
      title: 'A little about your cycle',
      text: 'A menstrual cycle is counted from the first day of one period to the first day of the next. Cycle length varies. The World Health Organization describes an average range of 21 to 35 days. A number outside that range does not tell us the cause; if a change worries you, a qualified health worker can help.',
      source: 'World Health Organization: Menstrual health',
      href: 'https://www.who.int/news-room/fact-sheets/detail/menstrual-health'
    },
    symptoms: {
      title: 'Every body can feel different',
      text: 'Some people have cramps, bloating, headaches or mood changes around a period. If pain is severe, bleeding is very heavy, periods are unpredictable or infrequent, or symptoms disrupt everyday activities, those concerns deserve to be heard by a health worker.',
      source: 'World Health Organization: Menstrual health',
      href: 'https://www.who.int/news-room/fact-sheets/detail/menstrual-health'
    },
    hygiene: {
      title: 'Care that feels right for you',
      text: 'Choose menstrual materials that are available and comfortable for you, and follow the product instructions. Reusable materials need appropriate washing, drying and storage. Access to clean water, a private place to change, and safe waste facilities also matters.',
      source: 'World Health Organization: Menstrual health',
      href: 'https://www.who.int/news-room/fact-sheets/detail/menstrual-health'
    },
    first: {
      title: 'Your first period',
      text: 'A first period is a normal part of growing up, and people experience it at different times. It can help to talk with a trusted adult or health worker and ask questions without shame. If you feel worried or unwell, you deserve support.',
      source: 'UNICEF: Talking about periods at home',
      href: 'https://www.unicef.org/parenting/health/talking-about-periods-at-home'
    }
  };

  function safeText(parent, tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = text;
    parent.appendChild(node);
    return node;
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2600);
  }

  function showAnswer(key) {
    const item = library[key];
    if (!item) return;
    quickPrompts.hidden = true;
    const bubble = document.createElement('div');
    bubble.className = 'chat-message answer';
    safeText(bubble, 'h3', 'answer-title', item.title);
    safeText(bubble, 'div', '', item.text);
    const link = document.createElement('a');
    link.className = 'answer-source';
    link.href = item.href;
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.textContent = 'Read the source ↗';
    bubble.appendChild(link);
    safeText(bubble, 'span', 'answer-note', 'General learning only · not a personal assessment');
    chatLog.appendChild(bubble);
    chatLog.scrollTop = chatLog.scrollHeight;
    document.getElementById('questionInput').focus();
  }

  function matchTopic(question) {
    const text = question.toLowerCase();
    if (/first period|first time|start.*period|period.*start/.test(text)) return 'first';
    if (/cycle|regular|late|early|days between|how long|month/.test(text)) return 'cycle';
    if (/pain|cramp|heavy|symptom|bleed|mood|headache/.test(text)) return 'symptoms';
    if (/wash|clean|hygiene|pad|material|dry|care for myself/.test(text)) return 'hygiene';
    return null;
  }

  function ask(question) {
    const cleaned = question.trim();
    if (!cleaned) return;
    quickPrompts.hidden = true;
    safeText(chatLog, 'div', 'chat-message user', cleaned);
    const topic = matchTopic(cleaned);
    if (topic) {
      showAnswer(topic);
    } else {
      const bubble = document.createElement('div');
      bubble.className = 'chat-message answer';
      safeText(bubble, 'h3', 'answer-title', 'Let’s keep this general');
      safeText(bubble, 'div', '', 'This small demo can share information about cycle basics, common period symptoms, care and hygiene, or a first period. Try one of those topics. For a personal concern, speak with a qualified health worker or trusted adult.');
      safeText(bubble, 'span', 'answer-note', 'Your message stays in this page and is not saved.');
      chatLog.appendChild(bubble);
    }
    input.value = '';
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  document.querySelectorAll('.prompt-card').forEach((button) => {
    button.addEventListener('click', () => ask(button.dataset.question));
  });

  document.querySelectorAll('.rail-item').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.rail-item').forEach((item) => item.classList.remove('selected'));
      button.classList.add('selected');
      const topic = button.dataset.topic;
      if (topic === 'welcome') {
        chatLog.replaceChildren();
        quickPrompts.hidden = false;
      } else {
        const questions = {
          cycle: 'How does the menstrual cycle work?',
          symptoms: 'What symptoms are common during a period?',
          hygiene: 'How can I care for myself during my period?'
        };
        ask(questions[topic]);
      }
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    ask(input.value);
  });

  document.getElementById('languageButton').addEventListener('click', () => {
    showToast('English is the only language available in this demo.');
  });

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.nav-link').forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    });
  });
})();
