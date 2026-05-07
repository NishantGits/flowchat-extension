# Contributing to FlowChat Extension

Thank you for your interest in contributing to FlowChat Extension! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git
- Chrome browser for testing
- Basic knowledge of JavaScript, TypeScript, and Svelte

### Setting Up Development Environment

1. **Fork the Repository**
   ```bash
   # Fork the repository on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/flowchat-extension.git
   cd flowchat-extension
   ```

2. **Install Dependencies**
   ```bash
   cd extension
   npm install
   ```

3. **Build for Development**
   ```bash
   npm run build
   ```

4. **Load Extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `extension` folder

## 📁 Project Structure

```
flowchat-extension/
├── extension/                 # Main extension source
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
├── README.md               # User documentation
└── CONTRIBUTING.md         # This file
```

## 🤝 How to Contribute

### Reporting Issues

1. **Check Existing Issues**: Search for existing issues before creating a new one
2. **Use Issue Templates**: Use the appropriate template when creating issues
3. **Provide Details**: Include:
   - Chrome version and OS
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Console errors

### Submitting Pull Requests

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation as needed

3. **Test Your Changes**
   - Build the extension: `npm run build`
   - Test in Chrome
   - Verify all functionality works

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and Create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```
   - Create a pull request against the `main` branch
   - Fill out the pull request template
   - Link any relevant issues

### Git Commit Messages
Use conventional commits:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

Examples:
```bash
feat: add dark mode toggle
fix: resolve API key encoding issue
docs: update installation instructions
```

## 🧪 Testing

### Manual Testing Checklist
Before submitting a pull request, ensure:

- [ ] Extension loads without errors in Chrome
- [ ] Configuration screen works properly
- [ ] API key and model are saved correctly
- [ ] Models load from API successfully
- [ ] Chat interface opens with keyboard shortcut
- [ ] Messages are sent and received correctly
- [ ] Extension works on different websites
- [ ] Settings persist across browser sessions
- [ ] No console errors in DevTools

### Testing Different Scenarios
- Test with various API keys
- Test with different models
- Test on different websites
- Test browser compatibility
- Test edge cases (empty inputs, network errors, etc.)

## 🔧 Development Guidelines

### Code Review Process
- All PRs require code review
- Maintain clean commit history
- Ensure tests pass
- Update documentation

### Performance Considerations
- Minimize DOM manipulation
- Optimize API calls
- Use efficient data structures
- Consider memory usage

### Security Considerations
- Never commit API keys or secrets
- Validate user inputs
- Use secure communication practices
- Follow Chrome extension security best practices

## 📚 Resources for Contributors

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Svelte Documentation](https://svelte.dev/docs)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🏆 Recognition

Contributors are recognized in:
- README.md contributors section
- Release notes
- GitHub contributor statistics

### Types of Contributions
- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 UI/UX improvements
- ⚡ Performance optimizations
- 🧪 Testing improvements

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

Thank you for contributing to FlowChat Extension! 🎉
