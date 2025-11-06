// Configuration
const CONFIG = {
    BHINDI_API_KEY: 'YOUR_BHINDI_API_KEY', // Replace with your actual API key
    BHINDI_API_URL: 'https://api.bhindi.io/v1',
    OAUTH_ENDPOINTS: {
        gmail: 'https://accounts.google.com/o/oauth2/v2/auth',
        drive: 'https://accounts.google.com/o/oauth2/v2/auth',
        calendar: 'https://accounts.google.com/o/oauth2/v2/auth',
        github: 'https://github.com/login/oauth/authorize',
        twitter: 'https://twitter.com/i/oauth2/authorize'
    }
};

// State Management
const state = {
    currentChatId: null,
    messages: [],
    connectedServices: new Set(),
    isProcessing: false
};

// DOM Elements
const elements = {
    messagesContainer: document.getElementById('messagesContainer'),
    messageInput: document.getElementById('messageInput'),
    sendBtn: document.getElementById('sendBtn'),
    newChatBtn: document.getElementById('newChatBtn'),
    chatHistory: document.getElementById('chatHistory'),
    connectionModal: document.getElementById('connectionModal'),
    closeModal: document.getElementById('closeModal'),
    serviceItems: document.querySelectorAll('.service-item'),
    connectBtns: document.querySelectorAll('.connect-btn'),
    tryBtns: document.querySelectorAll('.try-btn')
};

// Initialize
function init() {
    setupEventListeners();
    loadConnectedServices();
    autoResizeTextarea();
}

// Event Listeners
function setupEventListeners() {
    elements.sendBtn.addEventListener('click', handleSendMessage);
    elements.messageInput.addEventListener('keydown', handleKeyPress);
    elements.messageInput.addEventListener('input', autoResizeTextarea);
    elements.newChatBtn.addEventListener('click', startNewChat);
    elements.closeModal.addEventListener('click', closeConnectionModal);
    
    elements.serviceItems.forEach(item => {
        item.addEventListener('click', () => openConnectionModal(item.dataset.service));
    });
    
    elements.connectBtns.forEach(btn => {
        btn.addEventListener('click', () => connectService(btn.dataset.service));
    });
    
    elements.tryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const prompt = btn.dataset.prompt;
            elements.messageInput.value = prompt;
            handleSendMessage();
        });
    });
}

// Auto-resize textarea
function autoResizeTextarea() {
    const textarea = elements.messageInput;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
}

// Handle key press
function handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
    }
}

// Start new chat
function startNewChat() {
    state.currentChatId = generateId();
    state.messages = [];
    showWelcomeScreen();
    addChatToHistory();
}

// Show welcome screen
function showWelcomeScreen() {
    elements.messagesContainer.innerHTML = `
        <div class="welcome-screen">
            <h1>Celesta</h1>
            <p>Your intelligent agentic AI assistant</p>
            
            <div class="capabilities-grid">
                <div class="capability-card">
                    <div class="capability-icon">📧</div>
                    <h3>Email Management</h3>
                    <p>Read, compose, and manage emails with natural language</p>
                    <button class="try-btn" onclick="tryPrompt('Check my latest unread emails')">Try it</button>
                </div>
                <div class="capability-card">
                    <div class="capability-icon">📁</div>
                    <h3>File Operations</h3>
                    <p>Search, organize, and manage your Drive files</p>
                    <button class="try-btn" onclick="tryPrompt('Show me my recent documents')">Try it</button>
                </div>
                <div class="capability-card">
                    <div class="capability-icon">📅</div>
                    <h3>Calendar & Scheduling</h3>
                    <p>Create events, check availability, manage meetings</p>
                    <button class="try-btn" onclick="tryPrompt('What\\'s on my calendar today?')">Try it</button>
                </div>
                <div class="capability-card">
                    <div class="capability-icon">⚡</div>
                    <h3>Code & GitHub</h3>
                    <p>Manage repositories, review PRs, commit code</p>
                    <button class="try-btn" onclick="tryPrompt('List my GitHub repositories')">Try it</button>
                </div>
                <div class="capability-card">
                    <div class="capability-icon">𝕏</div>
                    <h3>Social Media</h3>
                    <p>Post tweets, read timeline, engage with content</p>
                    <button class="try-btn" onclick="tryPrompt('Show my Twitter timeline')">Try it</button>
                </div>
                <div class="capability-card">
                    <div class="capability-icon">🗺️</div>
                    <h3>Maps & Location</h3>
                    <p>Find places, get directions, explore locations</p>
                    <button class="try-btn" onclick="tryPrompt('Find coffee shops near me')">Try it</button>
                </div>
            </div>
        </div>
    `;
}

// Try prompt helper
window.tryPrompt = function(prompt) {
    elements.messageInput.value = prompt;
    handleSendMessage();
};

// Handle send message
async function handleSendMessage() {
    const message = elements.messageInput.value.trim();
    
    if (!message || state.isProcessing) return;
    
    // Clear input
    elements.messageInput.value = '';
    autoResizeTextarea();
    
    // Hide welcome screen if visible
    const welcomeScreen = document.querySelector('.welcome-screen');
    if (welcomeScreen) {
        welcomeScreen.remove();
    }
    
    // Add user message
    addMessage(message, 'user');
    
    // Show thinking indicator
    showThinkingIndicator();
    
    // Process message
    state.isProcessing = true;
    elements.sendBtn.disabled = true;
    
    try {
        const response = await processMessage(message);
        removeThinkingIndicator();
        addMessage(response, 'assistant');
    } catch (error) {
        removeThinkingIndicator();
        addMessage('I apologize, but I encountered an error processing your request. Please try again.', 'assistant');
        console.error('Error:', error);
    } finally {
        state.isProcessing = false;
        elements.sendBtn.disabled = false;
    }
}

// Process message with AI
async function processMessage(message) {
    // Check if services are needed
    const requiredServices = detectRequiredServices(message);
    const missingServices = requiredServices.filter(s => !state.connectedServices.has(s));
    
    if (missingServices.length > 0) {
        return `To help you with this request, I need access to: ${missingServices.join(', ')}. Please connect these services first by clicking on them in the sidebar.`;
    }
    
    // Simulate AI processing (replace with actual Bhindi API call)
    return await callBhindiAPI(message);
}

// Call Bhindi API
async function callBhindiAPI(message) {
    // This is a placeholder - replace with actual API integration
    // For now, return intelligent mock responses
    
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('email') || lowerMessage.includes('gmail')) {
        return `I can help you with email management. Here's what I can do:

• **Read emails**: "Show me my latest emails" or "Check unread messages"
• **Send emails**: "Send an email to john@example.com about the meeting"
• **Search**: "Find emails from Sarah about the project"
• **Organize**: "Archive all promotional emails"

To enable this, connect your Gmail account in the sidebar.`;
    }
    
    if (lowerMessage.includes('calendar') || lowerMessage.includes('schedule') || lowerMessage.includes('meeting')) {
        return `I can manage your calendar efficiently:

• **View schedule**: "What's on my calendar today?"
• **Create events**: "Schedule a meeting with the team tomorrow at 2pm"
• **Check availability**: "Am I free on Friday afternoon?"
• **Update events**: "Move my 3pm meeting to 4pm"

Connect your Google Calendar to get started.`;
    }
    
    if (lowerMessage.includes('github') || lowerMessage.includes('repo') || lowerMessage.includes('code')) {
        return `I can help with GitHub operations:

• **Repository management**: "List my repositories" or "Create a new repo"
• **Code review**: "Show open pull requests" or "Review PR #123"
• **Issues**: "Create an issue in my-project" or "List open issues"
• **Commits**: "Show recent commits" or "Commit these changes"

Connect your GitHub account to enable these features.`;
    }
    
    if (lowerMessage.includes('drive') || lowerMessage.includes('file') || lowerMessage.includes('document')) {
        return `I can manage your Google Drive:

• **Search files**: "Find my presentation about Q4 results"
• **Organize**: "Create a folder for project documents"
• **Share**: "Share the budget spreadsheet with team@company.com"
• **Upload**: "Upload this file to my Drive"

Connect Google Drive to access your files.`;
    }
    
    if (lowerMessage.includes('twitter') || lowerMessage.includes('tweet')) {
        return `I can handle Twitter operations:

• **Post tweets**: "Tweet about our new product launch"
• **Read timeline**: "Show my Twitter feed"
• **Engage**: "Like and retweet posts about AI"
• **Search**: "Find tweets mentioning our company"

Connect your Twitter account to get started.`;
    }
    
    if (lowerMessage.includes('map') || lowerMessage.includes('location') || lowerMessage.includes('direction')) {
        return `I can help with location services:

• **Find places**: "Find coffee shops near me"
• **Get directions**: "How do I get to Central Park?"
• **Explore**: "Show me restaurants in downtown"
• **Navigate**: "What's the fastest route to the airport?"

Google Maps integration is ready to use.`;
    }
    
    return `I'm Celesta, your agentic AI assistant. I can help you with:

📧 **Email** - Manage Gmail, send and read messages
📁 **Files** - Organize Google Drive documents
📅 **Calendar** - Schedule meetings and events
⚡ **GitHub** - Manage code repositories
𝕏 **Twitter** - Post and engage on social media
🗺️ **Maps** - Find locations and directions

What would you like to do?`;
}

// Detect required services
function detectRequiredServices(message) {
    const services = [];
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('email') || lowerMessage.includes('gmail')) services.push('gmail');
    if (lowerMessage.includes('drive') || lowerMessage.includes('file')) services.push('drive');
    if (lowerMessage.includes('calendar') || lowerMessage.includes('schedule')) services.push('calendar');
    if (lowerMessage.includes('github') || lowerMessage.includes('repo')) services.push('github');
    if (lowerMessage.includes('twitter') || lowerMessage.includes('tweet')) services.push('twitter');
    
    return services;
}

// Add message to chat
function addMessage(content, role) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = role === 'user' ? 'B' : 'C';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = formatMessage(content);
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    elements.messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;
    
    // Save to state
    state.messages.push({ role, content, timestamp: Date.now() });
}

// Format message content
function formatMessage(content) {
    // Convert markdown-style formatting
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
    content = content.replace(/`(.*?)`/g, '<code>$1</code>');
    content = content.replace(/\n/g, '<br>');
    
    // Convert bullet points
    content = content.replace(/^• /gm, '<br>• ');
    
    return content;
}

// Show thinking indicator
function showThinkingIndicator() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant thinking';
    messageDiv.id = 'thinking-indicator';
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = 'C';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = '<div class="thinking-indicator"><div class="thinking-dot"></div><div class="thinking-dot"></div><div class="thinking-dot"></div></div>';
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    elements.messagesContainer.appendChild(messageDiv);
    elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;
}

// Remove thinking indicator
function removeThinkingIndicator() {
    const indicator = document.getElementById('thinking-indicator');
    if (indicator) indicator.remove();
}

// Connection Modal
function openConnectionModal(service) {
    elements.connectionModal.classList.add('active');
}

function closeConnectionModal() {
    elements.connectionModal.classList.remove('active');
}

// Connect service
function connectService(service) {
    // In production, this would initiate OAuth flow
    // For now, simulate connection
    state.connectedServices.add(service);
    updateServiceStatus(service, true);
    saveConnectedServices();
    
    addMessage(`Successfully connected ${service}! You can now use ${service}-related features.`, 'assistant');
    closeConnectionModal();
}

// Update service status
function updateServiceStatus(service, connected) {
    const serviceItem = document.querySelector(`.service-item[data-service="${service}"]`);
    if (serviceItem) {
        const statusDot = serviceItem.querySelector('.status-dot');
        if (connected) {
            statusDot.classList.remove('disconnected');
            statusDot.classList.add('connected');
        } else {
            statusDot.classList.remove('connected');
            statusDot.classList.add('disconnected');
        }
    }
}

// Save connected services
function saveConnectedServices() {
    localStorage.setItem('connectedServices', JSON.stringify([...state.connectedServices]));
}

// Load connected services
function loadConnectedServices() {
    const saved = localStorage.getItem('connectedServices');
    if (saved) {
        const services = JSON.parse(saved);
        services.forEach(service => {
            state.connectedServices.add(service);
            updateServiceStatus(service, true);
        });
    }
}

// Add chat to history
function addChatToHistory() {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item active';
    historyItem.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <span>New conversation</span>
    `;
    
    const todaySection = elements.chatHistory.querySelector('.history-section');
    todaySection.appendChild(historyItem);
}

// Generate ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Initialize app
init();

console.log('🚀 Celesta AI initialized');
console.log('📝 To integrate with Bhindi API:');
console.log('1. Get your API key from https://bhindi.io');
console.log('2. Replace CONFIG.BHINDI_API_KEY with your key');
console.log('3. Implement OAuth flows for each service');
console.log('4. Update callBhindiAPI() function with real API calls');