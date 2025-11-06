# ✨ Celesta AI - Your Super Agentic Assistant

![Celesta AI](https://img.shields.io/badge/AI-Powered-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**Celesta** is a beautiful, modern AI chatbot that connects to Gmail, Google Drive, Calendar, Maps, GitHub, and Twitter. Built with stunning aesthetics and powerful integrations.

## 🌟 Features

- 📧 **Gmail Integration** - Read, send, and manage emails
- 📁 **Google Drive** - Access and organize files
- 📅 **Calendar Management** - Schedule and manage events
- 🗺️ **Google Maps** - Find locations and directions
- 🐙 **GitHub Control** - Manage repos, issues, and code
- 🐦 **Twitter Integration** - Post and read tweets
- 🎨 **Beautiful UI** - Modern gradient design with smooth animations
- ⚡ **Lightning Fast** - Instant responses and real-time updates
- 📱 **Fully Responsive** - Works perfectly on all devices

## 🚀 Quick Start

### Option 1: GitHub Pages (Easiest - No Coding Required!)

1. **Fork this repository** (click the Fork button at the top right)

2. **Enable GitHub Pages:**
   - Go to your forked repo's Settings
   - Scroll to "Pages" section
   - Under "Source", select "main" branch
   - Click Save
   - Your site will be live at: `https://YOUR-USERNAME.github.io/celesta-ai/`

3. **That's it!** 🎉 Your Celesta AI is now live!

### Option 2: Local Development

```bash
# Clone the repository
git clone https://github.com/alwaysbhavya-ui/celesta-ai.git

# Navigate to the directory
cd celesta-ai

# Open in browser
# Simply open index.html in your browser
# Or use a local server:
python -m http.server 8000
# Then visit: http://localhost:8000
```

## 📁 Project Structure

```
celesta-ai/
├── index.html          # Main HTML file with structure
├── styles.css          # Beautiful CSS with gradients & animations
├── script.js           # Interactive JavaScript for chat
└── README.md          # This file
```

## 🎨 Customization

### Change Colors

Edit `styles.css` and modify the CSS variables:

```css
:root {
    --primary: #6366f1;        /* Main brand color */
    --secondary: #8b5cf6;      /* Secondary color */
    --accent: #ec4899;         /* Accent color */
    --bg-dark: #0f172a;        /* Background */
}
```

### Modify Chat Responses

Edit `script.js` and update the `responses` object:

```javascript
const responses = {
    'gmail': 'Your custom Gmail response...',
    'drive': 'Your custom Drive response...',
    // Add more responses
};
```

## 🔌 Integration with Bhindi API

To connect Celesta with real AI capabilities:

1. **Get Bhindi API Key:**
   - Visit [bhindi.io](https://bhindi.io)
   - Sign up and get your API key

2. **Update script.js:**

```javascript
// Replace getBotResponse function with:
async function getBotResponse(userMessage) {
    const response = await fetch('https://api.bhindi.io/v1/chat', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer YOUR_API_KEY',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: userMessage,
            integrations: ['gmail', 'drive', 'calendar', 'github', 'twitter']
        })
    });
    
    const data = await response.json();
    return data.response;
}
```

3. **Enable OAuth for Integrations:**
   - Follow [Bhindi's OAuth guide](https://docs.bhindi.io/oauth)
   - Add authentication buttons for each service

## 🌐 Deployment Options

### GitHub Pages (Free)
✅ Already covered above - easiest option!

### Vercel (Free)
1. Visit [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Deploy with one click
4. Get instant HTTPS domain

### Netlify (Free)
1. Visit [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Get instant deployment

### Custom Domain
1. Buy a domain (e.g., from Namecheap, GoDaddy)
2. Point DNS to your hosting provider
3. Update in GitHub Pages/Vercel/Netlify settings

## 📱 Mobile Responsive

Celesta is fully responsive and works beautifully on:
- 📱 Mobile phones
- 📱 Tablets
- 💻 Laptops
- 🖥️ Desktop computers

## 🎯 Roadmap

- [ ] Voice input support
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Export chat history
- [ ] Advanced AI models integration
- [ ] Plugin system for custom integrations

## 🤝 Contributing

Contributions are welcome! Feel free to:
- 🐛 Report bugs
- 💡 Suggest features
- 🔧 Submit pull requests

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes!

## 💬 Support

Need help? 
- 📧 Email: support@bhindi.io
- 💬 Discord: [Join our community](https://discord.gg/bhindi)
- 📚 Docs: [docs.bhindi.io](https://docs.bhindi.io)

## 🙏 Acknowledgments

- Built with ❤️ using [Bhindi AI](https://bhindi.io)
- Inspired by modern AI assistants
- Design inspired by leading tech companies

---

**Made with ✨ by Bhavya Jain**

⭐ Star this repo if you find it helpful!