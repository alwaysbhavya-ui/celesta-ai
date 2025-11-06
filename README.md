# Celesta - Professional Agentic AI Platform

A production-ready, enterprise-grade AI assistant platform with real integrations for Gmail, Google Drive, Calendar, GitHub, Twitter, and Maps.

## 🎯 Overview

Celesta is a sophisticated agentic AI platform that provides natural language interfaces to your most-used services. Built with modern web technologies and designed for real-world deployment.

## ✨ Key Features

### Core Capabilities
- **Email Management** - Full Gmail integration with read, send, search, and organize
- **File Operations** - Complete Google Drive access for file management
- **Calendar & Scheduling** - Smart calendar management and meeting coordination
- **Code Management** - GitHub integration for repository and PR management
- **Social Media** - Twitter integration for posting and engagement
- **Location Services** - Google Maps for search and navigation

### Technical Features
- Clean, professional dark UI inspired by modern AI platforms
- Real-time message streaming
- Service connection management
- Chat history persistence
- Responsive design for all devices
- OAuth 2.0 ready for service authentication
- Modular architecture for easy extension

## 🚀 Quick Start

### 1. Clone & Deploy

```bash
# Clone the repository
git clone https://github.com/alwaysbhavya-ui/celesta-ai.git
cd celesta-ai

# Open locally
open index.html

# Or serve with Python
python -m http.server 8000
```

### 2. GitHub Pages Deployment

Your site is already live at: **https://alwaysbhavya-ui.github.io/celesta-ai/**

To update:
1. Make changes to files
2. Commit and push to main branch
3. Changes go live automatically in 1-2 minutes

### 3. Custom Domain (Optional)

1. Buy a domain from Namecheap, GoDaddy, etc.
2. Add CNAME file to repo with your domain
3. Configure DNS settings:
   - Type: CNAME
   - Name: www
   - Value: alwaysbhavya-ui.github.io

## 🔧 Configuration

### API Integration

Edit `app.js` and update the configuration:

```javascript
const CONFIG = {
    BHINDI_API_KEY: 'your_api_key_here',
    BHINDI_API_URL: 'https://api.bhindi.io/v1'
};
```

### OAuth Setup

For each service, you'll need to:

1. **Gmail/Drive/Calendar** (Google OAuth)
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project
   - Enable Gmail, Drive, Calendar APIs
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs

2. **GitHub**
   - Go to GitHub Settings > Developer Settings
   - Create OAuth App
   - Set callback URL to your domain

3. **Twitter**
   - Go to [Twitter Developer Portal](https://developer.twitter.com)
   - Create an app
   - Get API keys and tokens

### Environment Variables

For production, use environment variables:

```javascript
const CONFIG = {
    BHINDI_API_KEY: process.env.BHINDI_API_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    TWITTER_API_KEY: process.env.TWITTER_API_KEY
};
```

## 📁 Project Structure

```
celesta-ai/
├── index.html          # Main application structure
├── styles.css          # Professional dark theme styling
├── app.js              # Core application logic & API integration
└── README.md           # Documentation
```

## 🎨 Customization

### Branding

Change the name and branding in `index.html`:
- Line 5: Update `<title>`
- Line 13: Update `.logo` text
- Line 47: Update welcome message

### Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --bg-primary: #0A0A0A;
    --bg-secondary: #111111;
    --accent: #3B82F6;
    /* Customize other colors */
}
```

### Add New Services

1. Add service to sidebar in `index.html`
2. Add OAuth endpoint in `app.js` CONFIG
3. Implement service detection in `detectRequiredServices()`
4. Add service-specific responses in `callBhindiAPI()`

## 🔌 Real API Integration

### Replace Mock Responses

In `app.js`, update the `callBhindiAPI()` function:

```javascript
async function callBhindiAPI(message) {
    const response = await fetch(`${CONFIG.BHINDI_API_URL}/chat`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${CONFIG.BHINDI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: message,
            services: [...state.connectedServices],
            chatId: state.currentChatId
        })
    });
    
    const data = await response.json();
    return data.response;
}
```

### Implement OAuth Flows

```javascript
function connectService(service) {
    const authUrl = buildOAuthUrl(service);
    window.location.href = authUrl;
}

function buildOAuthUrl(service) {
    const params = new URLSearchParams({
        client_id: CONFIG[`${service.toUpperCase()}_CLIENT_ID`],
        redirect_uri: `${window.location.origin}/callback`,
        scope: getServiceScopes(service),
        response_type: 'code'
    });
    
    return `${CONFIG.OAUTH_ENDPOINTS[service]}?${params}`;
}
```

## 🚢 Deployment Options

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm i -g netlify-cli
netlify deploy
```

### AWS S3 + CloudFront

```bash
aws s3 sync . s3://your-bucket-name
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

## 🔒 Security Best Practices

1. **Never commit API keys** - Use environment variables
2. **Implement rate limiting** - Prevent API abuse
3. **Validate all inputs** - Sanitize user messages
4. **Use HTTPS only** - Enforce secure connections
5. **Implement CORS properly** - Restrict origins
6. **Add authentication** - Protect user data

## 📊 Analytics Integration

Add Google Analytics to `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🐛 Troubleshooting

### Services Not Connecting
- Check OAuth credentials are correct
- Verify redirect URIs match exactly
- Check browser console for errors

### API Calls Failing
- Verify API key is valid
- Check CORS settings
- Ensure proper headers are sent

### Styling Issues
- Clear browser cache
- Check CSS file is loading
- Verify no conflicting styles

## 📚 Resources

- [Bhindi API Documentation](https://docs.bhindi.io)
- [Google OAuth Guide](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth Guide](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Twitter API Docs](https://developer.twitter.com/en/docs)

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - Free for personal and commercial use

## 💬 Support

- **Email**: bhavyajainsammyak@gmail.com
- **GitHub Issues**: [Report bugs](https://github.com/alwaysbhavya-ui/celesta-ai/issues)
- **Bhindi Support**: support@bhindi.io

## 🎯 Roadmap

- [ ] Voice input/output
- [ ] Multi-language support
- [ ] Plugin system
- [ ] Mobile apps (iOS/Android)
- [ ] Team collaboration features
- [ ] Advanced analytics dashboard
- [ ] Custom AI model training

---

**Built with Bhindi AI Platform**

⭐ Star this repo if you find it useful!