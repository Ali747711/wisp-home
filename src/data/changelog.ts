export type ReleaseKind = "initial" | "major" | "minor" | "patch"

export type ChangelogChange = {
  kind: "added" | "changed" | "fixed" | "removed"
  text: string
}

export type ChangelogEntry = {
  version: string
  date: string
  kind: ReleaseKind
  headline: string
  description?: string
  changes: ChangelogChange[]
  commitUrl?: string
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "v0.1.0",
    date: "2026-05-03",
    kind: "initial",
    headline: "Initial public release",
    description:
      "wisp ships its first published version on npm. Type-safe commands, drop-in UI, and OpenAI + Anthropic adapters in a single 12kb gzipped bundle.",
    changes: [
      { kind: "added", text: "@wisp/core — agent orchestrator, command registry, hand-rolled SSE parser." },
      { kind: "added", text: "@wisp/react — AgentProvider, useAgent, useChat, AgentBubble, AgentChat primitives." },
      { kind: "added", text: "@wisp/next — createAgentRoute() helper for App Router and Pages Router." },
      { kind: "added", text: "Zod → JSON Schema bridge with provider-specific shaping (OpenAI vs Anthropic)." },
      { kind: "added", text: "Default UI kit themed via CSS variables — works without Tailwind in the host app." },
      { kind: "added", text: "In-browser session memory + localStorage persistence adapter." },
    ],
    commitUrl: "https://github.com/azamat/wisp/releases/tag/v0.1.0",
  },
  {
    version: "v0.0.7",
    date: "2026-04-22",
    kind: "minor",
    headline: "Anthropic adapter + tool-call normalization",
    description:
      "Tool calls now flow through a single normalized shape regardless of provider. Adding a new model is a few dozen lines.",
    changes: [
      { kind: "added", text: "Anthropic provider adapter (claude-sonnet-4 family)." },
      { kind: "added", text: "Provider-agnostic ToolCall + ToolResult contracts." },
      { kind: "changed", text: "Streaming events renamed: token → delta, tool → tool-call, end → done." },
      { kind: "fixed", text: "Race condition where two tool calls in the same turn could overwrite each other's params." },
    ],
    commitUrl: "https://github.com/azamat/wisp/releases/tag/v0.0.7",
  },
  {
    version: "v0.0.5",
    date: "2026-04-08",
    kind: "minor",
    headline: "Drop-in <AgentBubble />",
    description:
      "First pass at the floating bubble UI — keyboard-accessible, screen-reader-friendly, and themed by your CSS variables.",
    changes: [
      { kind: "added", text: "AgentBubble component with Radix primitives and Framer Motion enter/exit." },
      { kind: "added", text: "Composable AgentChat.* primitives (Header, Messages, Input)." },
      { kind: "added", text: "useChat hook with token-by-token streaming and stop/abort." },
      { kind: "changed", text: "AgentProvider now accepts a fetch override for tests and demos." },
    ],
    commitUrl: "https://github.com/azamat/wisp/releases/tag/v0.0.5",
  },
  {
    version: "v0.0.3",
    date: "2026-03-19",
    kind: "patch",
    headline: "Commands API + Zod validation",
    description:
      "defineCommand() lands. Each command is a typed Zod schema and a server-side handler — wisp validates LLM args before they ever reach your code.",
    changes: [
      { kind: "added", text: "defineCommand({ name, description, params, handler, slash? })." },
      { kind: "added", text: "Slash command parsing (e.g. /createTask)." },
      { kind: "added", text: "Auto-generated JSON Schema from Zod via zod-to-json-schema." },
      { kind: "fixed", text: "TypeScript inference now flows from params Zod schema into the handler signature." },
    ],
    commitUrl: "https://github.com/azamat/wisp/releases/tag/v0.0.3",
  },
  {
    version: "v0.0.1",
    date: "2026-03-02",
    kind: "patch",
    headline: "First commit — agent loop runs in a Node script",
    description:
      "Hand-rolled SSE parser, OpenAI streaming, and a tool-calling loop that actually works end-to-end. Not yet on npm.",
    changes: [
      { kind: "added", text: "Hand-rolled fetch-based SSE parser (no Vercel AI SDK)." },
      { kind: "added", text: "OpenAI streaming + tool-call normalization." },
      { kind: "added", text: "Single-turn agent loop with deterministic tool execution." },
    ],
  },
]
