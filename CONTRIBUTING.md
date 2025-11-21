# Contributing to Tech Stack Analyzer

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## 🚀 Getting Started

1. **Fork the repository**
   - Click the "Fork" button on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/TechStackAnalyser.git
   cd TechStackAnalyser
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment**
   ```bash
   cp .env.example .env
   # Add your VITE_GITHUB_TOKEN
   ```

5. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 💡 Ways to Contribute

### 🐛 Report Bugs

Found a bug? Please create an issue with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/environment details

### ✨ Suggest Features

Have an idea? Create an issue with:
- Feature description
- Use case / problem it solves
- Proposed implementation (optional)
- Mockups (if UI-related)

### 🔧 Submit Code

1. **Choose an issue** or create one
2. **Comment** that you're working on it
3. **Write code** following our guidelines
4. **Test thoroughly**
5. **Submit a PR**

## 📝 Code Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper types/interfaces
- Avoid `any` type when possible
- Use meaningful variable names

```typescript
// ❌ Bad
const d = new Date();
const x: any = getData();

// ✅ Good
const currentDate = new Date();
const userData: UserData = getUserData();
```

### React Components

- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic to custom hooks
- Use proper prop types

```typescript
// ✅ Good component structure
interface ComponentProps {
  title: string;
  onAction: () => void;
}

export default function Component({ title, onAction }: ComponentProps) {
  // Component logic
  return (
    // JSX
  );
}
```

### Styling

- Use Tailwind CSS classes
- Follow existing design patterns
- Maintain responsive design
- Use semantic color names

```typescript
// ✅ Good styling
<div className="card bg-white rounded-lg shadow-md p-6">
  <h2 className="text-2xl font-bold text-gray-800">Title</h2>
</div>
```

### File Organization

```
src/
├── components/        # React components
├── services/         # API and business logic
├── types/            # TypeScript type definitions
├── utils/            # Helper functions
└── hooks/            # Custom React hooks
```

## 🧪 Testing

Before submitting:

1. **Manual testing**
   ```bash
   npm run dev
   # Test all features
   ```

2. **Build test**
   ```bash
   npm run build
   ```

3. **Lint check**
   ```bash
   npm run lint
   ```

## 📬 Pull Request Process

1. **Update documentation** if needed
2. **Follow commit conventions**:
   ```
   feat: Add new feature
   fix: Fix bug in component
   docs: Update README
   style: Format code
   refactor: Refactor service
   test: Add tests
   chore: Update dependencies
   ```

3. **PR Description should include**:
   - What changes were made
   - Why the changes were needed
   - How to test the changes
   - Screenshots (for UI changes)
   - Related issue number

4. **PR Checklist**:
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex code
   - [ ] Documentation updated
   - [ ] No new warnings
   - [ ] Tested locally
   - [ ] Build succeeds

## 🎨 UI/UX Guidelines

- **Keep it clean**: White background, minimal colors
- **Be consistent**: Follow existing patterns
- **Stay responsive**: Test on mobile, tablet, desktop
- **Accessibility**: Use semantic HTML, proper contrast
- **Loading states**: Show feedback for async operations
- **Error handling**: Display helpful error messages

## 🚫 What Not to Do

- Don't commit `.env` files
- Don't include `node_modules`
- Don't make unrelated changes in one PR
- Don't modify too many files at once
- Don't break existing functionality
- Don't ignore TypeScript errors

## 🏗️ Project Architecture

### Component Structure

```
Component
├── Props interface
├── State management
├── Effects and logic
├── Helper functions
└── JSX return
```

### Service Layer

- Keep API calls in `services/`
- Handle errors gracefully
- Use proper typing
- Return consistent data structures

### State Management

- Use React hooks (`useState`, `useEffect`)
- Lift state when needed
- Consider context for global state
- Keep state close to where it's used

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide)

## ❓ Questions?

- **General questions**: Open a discussion on GitHub
- **Bug reports**: Create an issue
- **Security issues**: Email directly (don't create public issue)

## 🎉 Recognition

Contributors will be:
- Listed in README
- Mentioned in release notes
- Part of a growing community!

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for making Tech Stack Analyzer better!** 🙏

Every contribution, no matter how small, is valuable and appreciated.
