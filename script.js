// Chat functionality
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const clearChatBtn = document.getElementById('clearChat');
const quickActionBtns = document.querySelectorAll('.quick-action-btn');

// Sample responses for demo (you'll integrate with Bhindi API later)
const responses = {
    'gmail': 'I can help you manage your Gmail! I can read your latest emails, send new messages, search for specific emails, and organize your inbox. What would you like to do?',
    'email': 'I can help you manage your Gmail! I can read your latest emails, send new messages, search for specific emails, and organize your inbox. What would you like to do?',
    'drive': 'I can access your Google Drive! I can list files, search for documents, create folders, upload files, and share content. What do you need?',
    'calendar': 'I can manage your Google Calendar! I can show your schedule, create events, update meetings, and send invites. What would you like to schedule?',
    'github': 'I can help with GitHub! I can list repositories, create repos, manage issues, review pull requests, and commit code. What do you need?',
    'twitter': 'I can manage your Twitter! I can post tweets, read your timeline, search tweets, and engage with content. What would you like to do?',
    'maps': 'I can help you with Google Maps! I can find locations, get directions, search for places, and provide travel information. Where do you want to go?',
    'default': 'I understand! As Celesta, I can help you with Gmail, Google Drive, Calendar, Maps, GitHub, and Twitter. Could you be more specific about what you\'d like to do?'
};

// Add message to chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = isUser ? '👤' : '✨';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    if (typeof text === 'string') {
        content.innerHTML = text.replace(/\n/g, '<br>');
    } else {
        content.appendChild(text);
    }
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Get bot response
function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keywords
    for (const [key, response] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }
    
    return responses.default;
}

// Handle send message
function sendMessage() {
    const message = chatInput.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addMessage(message, true);
    chatInput.value = '';
    
    // Simulate bot thinking
    setTimeout(() => {
        const response = getBotResponse(message);
        addMessage(response, false);
    }, 500);
}

// Event listeners
sendBtn.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

clearChatBtn.addEventListener('click', () => {
    // Keep only the welcome message
    const welcomeMessage = chatMessages.querySelector('.message');
    chatMessages.innerHTML = '';
    chatMessages.appendChild(welcomeMessage);
});

// Quick action buttons
quickActionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        chatInput.value = action;
        sendMessage();
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typing';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = '✨';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    content.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    
    typingDiv.appendChild(avatar);
    typingDiv.appendChild(content);
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const typing = document.getElementById('typing');
    if (typing) {
        typing.remove();
    }
}

// Enhanced send with typing indicator
const originalSendMessage = sendMessage;
sendMessage = function() {
    const message = chatInput.value.trim();
    
    if (message === '') return;
    
    addMessage(message, true);
    chatInput.value = '';
    
    showTypingIndicator();
    
    setTimeout(() => {
        removeTypingIndicator();
        const response = getBotResponse(message);
        addMessage(response, false);
    }, 1000);
};

// Add some CSS for typing indicator
const style = document.createElement('style');
style.textContent = `
    .typing-indicator .message-content {
        display: flex;
        gap: 0.3rem;
        padding: 1rem;
    }
    
    .dot {
        width: 8px;
        height: 8px;
        background: var(--text-secondary);
        border-radius: 50%;
        animation: typing 1.4s infinite;
    }
    
    .dot:nth-child(2) {
        animation-delay: 0.2s;
    }
    
    .dot:nth-child(3) {
        animation-delay: 0.4s;
    }
    
    @keyframes typing {
        0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.7;
        }
        30% {
            transform: translateY(-10px);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

console.log('🚀 Celesta AI initialized successfully!');
console.log('💡 To integrate with Bhindi API, replace the getBotResponse function with actual API calls.');
console.log('📚 Visit https://docs.bhindi.io for integration guide.');