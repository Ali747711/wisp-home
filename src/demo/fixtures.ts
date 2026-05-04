export type Frame =
  | { kind: "text"; delta: string; delay?: number }
  | {
      kind: "tool_call"
      name: string
      args: Record<string, unknown>
      delay?: number
    }
  | {
      kind: "tool_result"
      name: string
      result: unknown
      delay?: number
    }
  | { kind: "done"; delay?: number }

type Script = {
  match: (text: string) => boolean
  frames: Frame[]
}

const SCRIPTS: Script[] = [
  {
    match: (t) => /create.*task|new task|\/createtask|\/tasks add/i.test(t),
    frames: [
      { kind: "text", delta: "Sure ", delay: 80 },
      { kind: "text", delta: "— I'll create that task ", delay: 70 },
      { kind: "text", delta: "for you now.\n\n", delay: 70 },
      {
        kind: "tool_call",
        name: "createTask",
        args: { title: "Write the README", dueDate: "2026-05-09" },
        delay: 220,
      },
      {
        kind: "tool_result",
        name: "createTask",
        result: { id: "task_8af2", title: "Write the README", status: "open" },
        delay: 380,
      },
      { kind: "text", delta: "Done. ", delay: 240 },
      { kind: "text", delta: "Task **#task_8af2** ", delay: 60 },
      { kind: "text", delta: "is on your list, due Friday.", delay: 80 },
      { kind: "done", delay: 120 },
    ],
  },
  {
    match: (t) => /list.*tasks|\/tasks/i.test(t),
    frames: [
      { kind: "text", delta: "Pulling your open tasks", delay: 80 },
      { kind: "text", delta: "…\n\n", delay: 220 },
      {
        kind: "tool_call",
        name: "listTasks",
        args: { status: "open" },
        delay: 180,
      },
      {
        kind: "tool_result",
        name: "listTasks",
        result: [
          { id: "task_8af2", title: "Write the README" },
          { id: "task_91d0", title: "Polish landing page" },
          { id: "task_b3e1", title: "Ship v0.1.0 to npm" },
        ],
        delay: 320,
      },
      { kind: "text", delta: "You have **3 open tasks**:\n", delay: 200 },
      { kind: "text", delta: "1. Write the README\n", delay: 70 },
      { kind: "text", delta: "2. Polish landing page\n", delay: 70 },
      { kind: "text", delta: "3. Ship v0.1.0 to npm", delay: 70 },
      { kind: "done", delay: 100 },
    ],
  },
  {
    match: (t) => /summari[sz]e|summary|pull request|prs?/i.test(t),
    frames: [
      { kind: "text", delta: "Skimming open PRs", delay: 80 },
      { kind: "text", delta: "…\n\n", delay: 240 },
      { kind: "text", delta: "**3 open PRs**, ranked by size:\n\n", delay: 180 },
      { kind: "text", delta: "• ", delay: 60 },
      {
        kind: "text",
        delta: "**#42** Add Anthropic adapter — _+412 / -86_\n",
        delay: 90,
      },
      {
        kind: "text",
        delta: "• **#41** Refactor SSE parser — _+98 / -64_\n",
        delay: 90,
      },
      {
        kind: "text",
        delta: "• **#40** Bump zod to v3.23 — _+2 / -2_\n\n",
        delay: 90,
      },
      {
        kind: "text",
        delta: "Want me to leave a comment on any of them?",
        delay: 60,
      },
      { kind: "done", delay: 100 },
    ],
  },
  {
    match: (t) => /help|what.*can.*you|hello|hi\b/i.test(t),
    frames: [
      { kind: "text", delta: "Hi 👋 ", delay: 80 },
      { kind: "text", delta: "I'm your app's agent, ", delay: 60 },
      { kind: "text", delta: "wired up via wisp. ", delay: 60 },
      { kind: "text", delta: "Try one of these:\n\n", delay: 80 },
      {
        kind: "text",
        delta: "• `Create a task to write the README`\n",
        delay: 60,
      },
      { kind: "text", delta: "• `List my open tasks`\n", delay: 60 },
      {
        kind: "text",
        delta: "• `Summarize my open pull requests`",
        delay: 60,
      },
      { kind: "done", delay: 100 },
    ],
  },
]

const FALLBACK: Frame[] = [
  { kind: "text", delta: "Got it. ", delay: 80 },
  { kind: "text", delta: "On the live site this would call ", delay: 60 },
  { kind: "text", delta: "your real LLM ", delay: 60 },
  { kind: "text", delta: "(OpenAI or Anthropic) ", delay: 60 },
  { kind: "text", delta: "and run any matching `defineCommand`. ", delay: 60 },
  {
    kind: "text",
    delta: "This page uses a scripted demo backend.\n\n",
    delay: 60,
  },
  { kind: "text", delta: "Try: ", delay: 80 },
  {
    kind: "text",
    delta: "_create a task_, _list tasks_, _summarize my PRs_.",
    delay: 80,
  },
  { kind: "done", delay: 80 },
]

export function getResponseFrames(text: string): Frame[] {
  for (const s of SCRIPTS) {
    if (s.match(text)) return s.frames
  }
  return FALLBACK
}
