# Wisp — Marketing Site

The landing page for **Wisp**, an AI agent SDK for React and Next.js.

Built with Vite + React 19 + TypeScript + Tailwind v4 + shadcn/ui. The site embeds a live, mocked agent bubble so visitors can try the SDK without an API key.

## Stack

- **Vite 7** + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **shadcn/ui** primitives (Radix under the hood)
- **Shiki** for syntax-highlighted code blocks
- **@wisp/core** + **@wisp/react** linked from the monorepo (`file:../../packages/*`)
- Mock agent transport via `src/demo/mock-fetch.ts` — no backend required for the live demo

## Getting started

From the monorepo root, install once (pnpm workspaces):

```bash
pnpm install
```

Then from this folder:

```bash
pnpm dev        # start the dev server
pnpm build      # type-check + production build
pnpm preview    # serve the built site locally
pnpm typecheck  # tsc --noEmit
pnpm lint       # eslint
pnpm format     # prettier --write
```

## Project layout

```
src/
├── App.tsx                       # composes the landing sections
├── main.tsx                      # entry point
├── index.css                     # Tailwind + theme tokens
├── components/
│   ├── landing/                  # Hero, Features, LiveDemo, Quickstart,
│   │                             # WhyWisp, Comparison, Faq, Footer, Nav, ...
│   ├── ui/                       # shadcn-generated primitives
│   └── theme-provider.tsx
├── demo/
│   ├── fixtures.ts               # canned agent responses
│   └── mock-fetch.ts             # intercepts /api/agent for the live demo
├── hooks/
└── lib/
```

The page is wrapped in `<AgentProvider endpoint="/api/agent" fetch={mockAgentFetch}>` so the demo bubble streams mocked responses through the real `@wisp/react` runtime.

## Adding shadcn components

```bash
npx shadcn@latest add <component>
```

Components land in `src/components/ui/` and are imported via the `@/` alias:

```tsx
import { Button } from "@/components/ui/button"
```

## Working on the SDK alongside the site

Because `@wisp/core` and `@wisp/react` are linked from `packages/`, edits to the SDK show up here on next dev-server reload (rebuild the package if you use `tsup --watch`). This site is the primary visual harness for SDK changes — if a UI tweak doesn't look right here, it likely needs fixing in `packages/react`.

## Deploying

`pnpm build` outputs static assets to `dist/`. Any static host (Vercel, Netlify, Cloudflare Pages) works.
