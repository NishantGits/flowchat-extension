# FlowChat Extension - Development

This is the development branch of the FlowChat Extension. For users looking to install the extension, please visit the [main branch](https://github.com/NishantGits/flowchat-extension) or install from the Chrome Web Store.

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git
- Chrome browser for testing

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/NishantGits/flowchat-extension.git
   cd flowchat-extension
   ```

2. **Install dependencies**
   ```bash
   cd extension
   npm install
   ```

3. **Development build**
   ```bash
   npm run build
   ```

4. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `extension` folder
   - The extension should now appear in your extensions list

### Development Commands

```bash
# Install dependencies
npm install

# Build for development
npm run build

# Watch for changes during development (if available)
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
flowchat-extension/
├── extension/                 # Main extension source code
│   ├── src/
│   │   ├── lib/
│   │   │   ├── apis/         # API integration
│   │   │   ├── components/   # Svelte components
│   │   │   └── utils/       # Utility functions
│   │   ├── App.svelte        # Main Svelte app
│   │   ├── main.ts           # Entry point
│   │   └── app.css          # Global styles
│   ├── dist/                # Built files (generated)
│   ├── package.json          # Dependencies
│   └── vite.config.ts       # Vite configuration
├── background.js            # Background script
├── content.js              # Content script
├── manifest.json           # Extension manifest
├── images/                # Extension icons
└── .github/workflows/      # CI/CD workflows
```

## 🔧 Architecture

### Core Components

1. **Content Script (`content.js`)**
   - Injects the Svelte app into web pages
   - Provides storage bridge for chrome.storage access
   - Handles CSS and script injection

2. **Background Script (`background.js`)**
   - Handles API calls to avoid CORS issues
   - Manages storage operations
   - Processes message passing between components

3. **Svelte App (`extension/src/`)**
   - Main UI component: `SpotlightSearch.svelte`
   - API integration: `lib/apis/index.js`
   - Built with Vite for modern development

### Key Features

- **Storage Bridge**: Content script provides chrome.storage access to injected Svelte app
- **API Proxying**: Background script handles CORS and API key encoding
- **Message Passing**: Secure communication between extension components
- **Persistent Config**: Settings saved across browser sessions

## 🔄 Development Workflow

### Making Changes

1. **Code Changes**: Edit files in `extension/src/`
2. **Build**: Run `npm run build` to compile Svelte app
3. **Test**: Reload extension in Chrome (`chrome://extensions/`)
4. **Debug**: Use Chrome DevTools and console logs

### Git Workflow

```bash
# Work on dev branch
git checkout dev

# Make your changes
git add .
git commit -m "your changes"

# Push to dev (triggers CI/CD)
git push origin dev

# CI/CD automatically builds and pushes to main branch
```

### CI/CD Pipeline

- **Trigger**: Push to `dev` branch
- **Build**: Compiles Svelte app with Vite
- **Release**: Pushes production files to `main` branch
- **Main Branch**: Contains only files needed to run the extension

## 🐛 Debugging

### Common Development Issues

**Extension not loading after changes?**
- Run `npm run build` to compile latest changes
- Reload extension in `chrome://extensions/`
- Check console for errors

**API calls failing?**
- Check background script console for API errors
- Verify API key in extension storage
- Check network tab for failed requests

**Storage not persisting?**
- Check content script console for storage errors
- Verify chrome.storage permissions in manifest
- Test storage bridge functionality

### Debug Tools

- **Chrome DevTools**: F12 on any webpage
- **Extension Console**: `chrome://extensions/` → "Inspect views: service worker"
- **Content Script Console**: Right-click → Inspect → Console

## 📦 Building for Production

The CI/CD pipeline automatically:
1. Builds the Svelte app
2. Copies only necessary files to main branch:
   - `manifest.json`
   - `background.js`
   - `content.js`
   - `images/`
   - `extension/dist/`

### Manual Production Build

```bash
cd extension
npm run build

# Files are now in extension/dist/
# These are the only files needed for the extension
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Push to your fork
6. Create a Pull Request to `dev` branch

### Code Style

- Use TypeScript for new files
- Follow existing Svelte patterns
- Add console logs for debugging
- Update documentation as needed

## 🔐 Security Considerations

- API keys are stored in `chrome.storage.local`
- No sensitive data in source code
- Secure message passing between components
- Proper CORS handling in background script

## 📋 Testing

### Manual Testing Checklist

- [ ] Extension loads without errors
- [ ] Configuration screen appears on first use
- [ ] API key and model are saved correctly
- [ ] Models load from API
- [ ] Chat interface opens with keyboard shortcut
- [ ] Messages are sent and received correctly
- [ ] Extension works on different websites
- [ ] Settings persist across browser sessions

### Automated Testing

Currently using manual testing. Future plans include:
- Unit tests for API functions
- Integration tests for storage
- E2E tests with Playwright

## 🚀 Deployment

### Release Process

1. **Development**: Work on `dev` branch
2. **Testing**: Manual testing of all features
3. **Push**: `git push origin dev`
4. **CI/CD**: Automatic build and release to `main`
5. **Distribution**: Main branch contains production-ready extension

### Version Management

- Update `version` in `manifest.json`
- Update `package.json` version
- Create release tag on GitHub
- Update Chrome Web Store listing

## 📚 Resources

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Svelte Documentation](https://svelte.dev/docs)
- [Vite Documentation](https://vitejs.dev/)
- [FlowChat API Documentation](https://flowchats.org/docs)

## 🐛 Issues & Support

- **Report Issues**: [GitHub Issues](https://github.com/NishantGits/flowchat-extension/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/NishantGits/flowchat-extension/discussions)
- **Development Questions**: Create an issue with "question" label

---

**Development Team**: FlowChat Extension Contributors
**License**: MIT License - see [LICENSE](LICENSE) file
