# Okta Expression Builder

A free, open-source visual builder for Okta Expression Language (EL). Build profile mappings, group rules, and conditional expressions visually — no more writing EL by hand in a tiny text box.

## Features

- **Easy Mode** — Visual tree builder where you pick functions from a catalog and fill argument slots
- **Advanced Mode** — Code editor with autocomplete for function names and user attributes
- **Live Preview** — Expressions evaluate in real-time against an editable test profile
- **One-Click Copy** — Copy the generated expression string to your clipboard
- **Complete EL Coverage** — String, Array, Conversion, Directory, Manager, and Time functions
- **Test Profile** — Pre-filled with standard Okta attributes, editable values, and custom attribute support

## Getting Started

```bash
npm ci
npm run dev
```

Open `http://localhost:5173/okta-expression-builder/` in your browser.

## Development

```bash
npm ci              # Install dependencies
npm run dev         # Start dev server
npm run build       # Production build
npm test            # Run tests
npm run test:watch  # Run tests in watch mode
```

## Tech Stack

- React 19 + TypeScript
- Vite (bundler/dev server)
- Tailwind CSS 4
- Vitest + React Testing Library

## How It Works

Both modes operate on the same `ExpressionNode` tree model — switching between Easy and Advanced mode preserves the current expression.

The expression engine has four modules:
- **Serializer** — Converts the tree into an Okta EL string
- **Parser** — Converts an EL string back into a tree
- **Evaluator** — Evaluates the tree against test profile data for live preview
- **Validator** — Checks for missing arguments, unknown functions, and syntax errors

## License

MIT
