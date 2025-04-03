document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const closeChatbot = document.getElementById('closeChatbot');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const sendMessage = document.getElementById('sendMessage');
  
    // Knowledge base for common queries
    const knowledgeBase = {
      enrollment: {
        keywords: ['enroll', 'enrollment', 'register', 'registration'],
        response: `Here's what you need to know about enrollment:
  • Visit the Online Enrollment section in the menu
  • Complete the 5-step process: Student Information, Subject Selection, Assessment, Payment, and Confirmation
  • Make sure to clear any outstanding balances
  • Current enrollment period is for Spring 2025`
      },
      grades: {
        keywords: ['grade', 'grades', 'score', 'scores', 'gpa'],
        response: `I can help you with grades information:
  • Current semester GPA: 3.87
  • You can view detailed grades in the Student Performance section
  • For grade completion requests, visit the Grade Completion Request form`
      },
      schedule: {
        keywords: ['schedule', 'class', 'classes', 'time'],
        response: `Here's your schedule information:
  • View your complete schedule in the Subject Schedule Inquiry section
  • Current classes include Math, Physics, English, Computer Science, and PE
  • You can export your schedule to calendar or PDF`
      },
      deadlines: {
        keywords: ['deadline', 'due', 'when'],
        response: `Here are your upcoming deadlines:
  • Mathematics Assignment: Due Apr 10, 2025
  • Physics Lab Report: Due Apr 15, 2025
  • English Essay: Due Apr 20, 2025
  • Computer Science Project: Due Apr 30, 2025
  • Tuition Payment: Due May 15, 2025`
      }
    };
  
    function addMessage(text, isUser = false) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
  
      const content = document.createElement('div');
      content.className = 'message-content';
  
      if (text.includes('•')) {
        content.innerHTML = text.split('\n').map(line => 
          line.trim().startsWith('•') ? 
            `<div class="bullet-point">${line}</div>` : 
            line
        ).join('<br>');
      } else {
        content.textContent = text;
      }
  
      messageDiv.appendChild(content);
      chatbotMessages.appendChild(messageDiv);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
  
    function findResponse(userInput) {
      const input = userInput.toLowerCase();
      
      for (const category in knowledgeBase) {
        if (knowledgeBase[category].keywords.some(keyword => input.includes(keyword))) {
          return knowledgeBase[category].response;
        }
      }
  
      return `I'm here to help! You can ask me about:
  • Enrollment and registration
  • Grades and academic performance
  • Class schedules
  • Upcoming deadlines
  • Or try asking your question in a different way`;
    }
  
    function sendUserMessage() {
      const userText = chatbotInput.value.trim();
      if (!userText) return;
  
      addMessage(userText, true);
      chatbotInput.value = '';
  
      const botResponse = findResponse(userText);
      setTimeout(() => addMessage(botResponse), 500);
    }
  
    chatbotToggle.addEventListener('click', () => {
      chatbotWindow.classList.toggle('hidden');
      if (!chatbotWindow.classList.contains('hidden')) {
        chatbotInput.focus();
      }
    });
  
    closeChatbot.addEventListener('click', () => {
      chatbotWindow.classList.add('hidden');
    });
  
    chatbotInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendUserMessage();
      }
    });
  
    sendMessage.addEventListener('click', sendUserMessage);
  });