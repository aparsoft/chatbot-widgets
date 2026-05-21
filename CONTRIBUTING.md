# Contributing to Aparsoft Chatbot Widgets

Thank you for your interest in contributing! We welcome bug reports, feature requests, and pull requests.

## Quick Start

1. Fork the repository
2. Clone your fork: `git clone https://github.com/<you>/chatbot-widgets.git`
3. Install dependencies: `pnpm install`
4. Create a feature branch: `git checkout -b my-feature`
5. Make changes and test
6. Push and open a Pull Request

## Pull Request Process

- Keep PRs small and focused on a single change
- Update the relevant `README.md` if you change public API
- Ensure `node --check` passes on all modified `.js` files
- New framework wrappers should follow the same pattern as existing packages

## Code Style

- **React / Next.js**: 2-space indent, single quotes, no semicolons
- **Vue**: 2-space indent, Options API (Vue 2 + 3 compat)
- **Angular**: 4-space indent, standalone component pattern

## Reporting Issues

Open a [GitHub Issue](https://github.com/aparsoft/chatbot-widgets/issues) with:

- Framework and version (e.g., React 18, Vue 3.3)
- Node.js version
- Minimal reproduction steps
- Expected vs. actual behavior

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
