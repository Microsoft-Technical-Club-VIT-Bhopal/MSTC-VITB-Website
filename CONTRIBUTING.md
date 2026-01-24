# Contributing to Microsoft Club Website

Welcome! We're excited that you want to contribute to our website. This guide will help you get started, even if you're a beginner.

## 🌟 How Can I Contribute?

### 1. Add or Update Events
- Edit `src/data/events.json`
- Add event poster images to `public/posters/`
- Follow the existing JSON structure

### 2. Add or Update Team Members
- Edit `src/data/team.json`
- Add team photos to `public/team/`
- Follow the existing JSON structure

### 3. Improve Design or Features
- Modify components in `src/components/`
- Update pages in `src/pages/`
- Adjust styles in `src/index.css` or Tailwind classes

### 4. Fix Bugs or Issues
- Check open issues in the repository
- Create a pull request with your fix

## 🚀 Getting Started

### Prerequisites
- Node.js installed (version 16 or higher)
- Git installed
- A code editor (VS Code recommended)

### Setup Steps

1. **Fork the repository** (click Fork button on GitHub)

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/microsoft-club-website.git
   cd microsoft-club-website
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**: http://localhost:5173

## 📝 Making Changes

### For JSON Updates (Easiest!)

1. Open `src/data/events.json` or `src/data/team.json`
2. Add or modify entries following the existing format
3. Save the file
4. The website will automatically reload with your changes

### For Code Changes

1. Create a new branch
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes in the appropriate files

3. Test your changes locally
   ```bash
   npm run dev
   ```

4. Build to ensure no errors
   ```bash
   npm run build
   ```

## 🔄 Submitting Your Changes

1. **Commit your changes**
   ```bash
   git add .
   git commit -m "Brief description of your changes"
   ```

2. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your fork and branch
   - Add a clear description of your changes
   - Submit!

## ✅ Code Standards

### For JSON Files
- Use proper JSON formatting (validate at jsonlint.com)
- Keep consistent naming conventions
- Include all required fields

### For React Components
- Use functional components with hooks
- Write clear, descriptive variable names
- Add comments for complex logic
- Follow existing code style

### For Styling
- Use Tailwind CSS utility classes
- Follow the existing color scheme
- Ensure responsive design (test on mobile)

## 🐛 Reporting Bugs

Found a bug? Please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 💡 Suggesting Features

Have an idea? Open an issue with:
- Feature description
- Why it would be useful
- Any implementation ideas

## ❓ Questions?

- Check the [README.md](README.md) first
- Ask in our club meetings
- Open an issue with the "question" label
- Contact the maintainers

## 🎉 Recognition

All contributors will be acknowledged! Your contributions help make our club website better for everyone.

Thank you for contributing! 🚀
