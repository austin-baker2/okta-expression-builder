# Project Instructions for Claude

## Overview

A free, open-source visual builder for Okta Expression Language (EL). Static React SPA — no backend, no API calls, no secrets. 100% client-side.

## Tech Stack

- React 19 + TypeScript
- Vite 6 (bundler/dev server)
- Tailwind CSS 4
- Vitest + React Testing Library (testing)
- GitHub Pages (deployment via GitHub Actions)

## Commands

```bash
npm ci              # Install dependencies (use ci, not install)
npm run dev         # Start dev server
npm run build       # Production build
npm test            # Run tests (vitest run)
npm run test:watch  # Run tests in watch mode
```

## Architecture

This project follows **SOLID principles** with clean separation of concerns.

### Key Patterns

- **Engine modules** (serializer, parser, evaluator, validator) are pure functions with no UI dependencies
- **Single Responsibility**: Each engine module does one thing — serialize, parse, evaluate, or validate
- **Open/Closed**: The function registry is data-driven — add new EL functions without modifying engine code
- **Dependency Inversion**: Components depend on the expression model (types), not on each other
- **Interface Segregation**: Engine modules expose focused interfaces — components import only what they need
- Both Easy Mode (tree builder) and Advanced Mode (code editor) operate on the same `ExpressionNode` tree model
- Switching modes preserves the current expression
- The function registry is the single source of truth for all EL functions — it powers the catalog, autocomplete, validation, and docs
- Vite base path is `/okta-expression-builder/` for GitHub Pages

## Conventions

- Pin exact dependency versions in package.json (no `^` or `~`)
- Commit `package-lock.json`
- Dark theme: deep indigo/slate backgrounds, purple/violet accents, green for valid, amber for preview, red for errors
- Monospace font for all expression/code content
- Desktop-first layout
- TypeScript strict mode
- Tests use Vitest with jsdom environment
