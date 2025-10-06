# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js interview test project designed to evaluate TypeScript and React skills. The focus is on functionality and code quality rather than HTML/CSS styling.

## Tech Stack

- **Next.js 15.5.4** - React framework with App Router
- **TypeScript 5** - Static typing
- **React 19.1.0** - UI library
- **Tailwind CSS 4** - Utility-first CSS framework (v4 using new @import syntax)
- **ESLint 9** - Linting with flat config format
- **Turbopack** - Fast bundler (used for dev and build)

## Development Commands

```bash
# Start development server with hot reload
npm run dev
# Server runs on http://localhost:3000

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Auto-fix linting issues
npm run lint -- --fix
```

## ESLint Configuration

The project uses ESLint flat config format (`eslint.config.mjs`) with:
- `next/core-web-vitals` - Next.js recommended rules
- `next/typescript` - TypeScript-specific rules
- `eslint-plugin-simple-import-sort` - Automatic import sorting (configured as errors)

Import order is enforced and can be auto-fixed with `npm run lint -- --fix`.

## Environment Variables

Create a `.env` file in the root directory (see `.env.example` for template):

```
COINGECKO_API_KEY=your_api_key_here
```

Note: `.env*` files are gitignored for security.

## API Routes

### GET /api/coins

Fetches the list of all coins from CoinGecko API.

- **Endpoint**: `/api/coins`
- **Method**: GET
- **Returns**: JSON array of coins (each with `id`, `symbol`, `name`, `platforms`)
- **Implementation**: `app/api/coins/route.ts`
- **External API**: Uses CoinGecko API (demo endpoint)
- **Query Parameters**: `status=active&include_platform=true`

### GET /api/coin/[id]

Fetches detailed information for a specific coin.

- **Endpoint**: `/api/coin/{id}` (e.g., `/api/coin/bitcoin`)
- **Method**: GET
- **Parameters**: `id` - The coin identifier (e.g., "bitcoin", "ethereum")
- **Returns**: JSON object with comprehensive coin data (price, market data, description, etc.)
- **Implementation**: `app/api/coin/[id]/route.ts`
- **External API**: Uses CoinGecko API (demo endpoint)

## Project Structure

```
app/
  api/
    coins/
      route.ts     - CoinGecko coins list API endpoint
    coin/
      [id]/
        route.ts   - Individual coin details API endpoint (dynamic route)
  layout.tsx       - Root layout component with metadata
  page.tsx         - Home page component (minimal starter)
  globals.css      - Global styles with Tailwind and CSS variables
  favicon.ico      - Site favicon
.env               - Environment variables (gitignored)
.env.example       - Environment variables template
eslint.config.mjs  - ESLint flat config
tsconfig.json      - TypeScript configuration with strict mode
next.config.ts     - Next.js configuration
```

## Architecture Notes

- **App Router**: Uses Next.js App Router (app directory) instead of Pages Router
- **TypeScript**: Strict mode enabled for better type safety
- **Import Alias**: `@/*` maps to project root for cleaner imports
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support)
- **No src directory**: Files are in root app directory for simplicity

## TypeScript Configuration

- Strict mode enabled
- Path alias `@/*` configured for imports from project root
- Target: ES2017
- Module resolution: bundler (optimized for Next.js)
