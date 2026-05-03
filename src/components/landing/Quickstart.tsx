import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  Tick02Icon,
  ReactIcon,
  Package01Icon,
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CodeBlock } from "./CodeBlock"
import { SectionHeader } from "./SectionHeader"
import { Reveal } from "./Reveal"
import { cn } from "@/lib/utils"

type Step = {
  label: string
  title: string
  description: string
  filename: string
  code: string
}

type FrameworkId = "app-router" | "pages-router" | "vite"

type Framework = {
  id: FrameworkId
  name: string
  badge: string
  steps: Step[]
}

const COMMANDS_FILE: Step = {
  label: "Define",
  title: "Define your commands",
  description:
    "Each command is a typed Zod schema and a server-side handler. wisp turns it into a tool the LLM can call safely.",
  filename: "lib/agent-commands.ts",
  code: `import { defineCommand } from "@wisp/core"
import { z } from "zod"
import { db } from "@/lib/db"

export const commands = [
  defineCommand({
    name: "createTask",
    description: "Create a new task for the current user.",
    params: z.object({
      title: z.string().min(1).describe("The task title"),
      dueDate: z.string().optional().describe("ISO 8601 date"),
    }),
    handler: async ({ title, dueDate }, ctx) => {
      const task = await db.task.create({
        data: { title, dueDate, userId: ctx.userId },
      })
      return { id: task.id, title: task.title }
    },
  }),
]`,
}

const FRAMEWORKS: Framework[] = [
  {
    id: "app-router",
    name: "Next.js · App Router",
    badge: "Recommended",
    steps: [
      COMMANDS_FILE,
      {
        label: "Mount",
        title: "Mount the route",
        description:
          "One Route Handler keeps your API key server-side and streams agent events back to the browser as Server-Sent Events.",
        filename: "app/api/agent/route.ts",
        code: `import { createAgentRoute } from "@wisp/next"
import { commands } from "@/lib/agent-commands"
import { getUserId } from "@/lib/auth"

export const { POST } = createAgentRoute({
  llm: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY!,
    model: "gpt-4o-mini",
  },
  commands,
  context: async (req) => ({ userId: await getUserId(req) }),
})`,
      },
      {
        label: "Drop in",
        title: "Drop in the bubble",
        description:
          "Wrap your tree, drop the floating launcher anywhere, ship. The bubble streams tokens, runs tool calls, and respects your theme.",
        filename: "app/layout.tsx",
        code: `import { AgentProvider, AgentBubble } from "@wisp/react"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AgentProvider endpoint="/api/agent">
          {children}
          <AgentBubble />
        </AgentProvider>
      </body>
    </html>
  )
}`,
      },
    ],
  },
  {
    id: "pages-router",
    name: "Next.js · Pages Router",
    badge: "",
    steps: [
      COMMANDS_FILE,
      {
        label: "Mount",
        title: "Mount the API route",
        description:
          "Use createAgentApiHandler from @wisp/next for the legacy Pages Router. SSE streams via Node-style req/res.",
        filename: "pages/api/agent.ts",
        code: `import { createAgentApiHandler } from "@wisp/next"
import { commands } from "@/lib/agent-commands"
import { getUserId } from "@/lib/auth"

export default createAgentApiHandler({
  llm: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY!,
    model: "gpt-4o-mini",
  },
  commands,
  context: async (req) => ({ userId: await getUserId(req) }),
})`,
      },
      {
        label: "Drop in",
        title: "Drop in the bubble",
        description:
          "Wrap _app.tsx with AgentProvider — same component, same hooks, same UI primitives.",
        filename: "pages/_app.tsx",
        code: `import { AgentProvider, AgentBubble } from "@wisp/react"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AgentProvider endpoint="/api/agent">
      <Component {...pageProps} />
      <AgentBubble />
    </AgentProvider>
  )
}`,
      },
    ],
  },
  {
    id: "vite",
    name: "Vite SPA",
    badge: "BYO backend",
    steps: [
      COMMANDS_FILE,
      {
        label: "Backend",
        title: "Run the agent on any Node server",
        description:
          "@wisp/core works without Next. Mount the agent on Express, Hono, Fastify — wherever your API lives.",
        filename: "server/agent.ts",
        code: `import express from "express"
import { createAgent } from "@wisp/core"
import { commands } from "../lib/agent-commands"

const agent = createAgent({
  llm: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY!,
    model: "gpt-4o-mini",
  },
  commands,
})

const app = express()
app.post("/api/agent", agent.handler)
app.listen(8787)`,
      },
      {
        label: "Drop in",
        title: "Drop in the bubble",
        description:
          "Same React layer. Just point AgentProvider at your backend URL.",
        filename: "src/App.tsx",
        code: `import { AgentProvider, AgentBubble } from "@wisp/react"

export function App() {
  return (
    <AgentProvider endpoint="http://localhost:8787/api/agent">
      <YourApp />
      <AgentBubble />
    </AgentProvider>
  )
}`,
      },
    ],
  },
]

export function Quickstart() {
  const [framework, setFramework] = useState<FrameworkId>("app-router")

  return (
    <section id="quickstart" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader
            eyebrow="Five-minute quickstart"
            title={
              <>
                Three steps. <span className="text-muted-foreground">No glue code.</span>
              </>
            }
            description="From npm install to a working agent in your app — copy, paste, ship."
          />
        </Reveal>

        <Reveal delay={120}>
          <Tabs
            value={framework}
            onValueChange={(v) => setFramework(v as FrameworkId)}
            className="mt-12"
          >
            <div className="flex justify-center">
              <TabsList className="bg-card/40 border-border/60 h-auto rounded-full border p-1">
                {FRAMEWORKS.map((f) => (
                  <TabsTrigger
                    key={f.id}
                    value={f.id}
                    className={cn(
                      "data-[state=active]:bg-background gap-2 rounded-full px-3 py-1.5 text-xs font-medium sm:px-4"
                    )}
                  >
                    <HugeiconsIcon
                      icon={f.id === "vite" ? Package01Icon : ReactIcon}
                      size={13}
                      strokeWidth={2}
                    />
                    {f.name}
                    {f.badge && (
                      <Badge
                        variant="secondary"
                        className="bg-primary/15 text-primary hidden rounded-full px-1.5 py-0 text-[9px] tracking-widest uppercase sm:inline-flex"
                      >
                        {f.badge}
                      </Badge>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {FRAMEWORKS.map((f) => (
              <TabsContent key={f.id} value={f.id} className="mt-10">
                <FrameworkSteps framework={f} />
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>
      </div>
    </section>
  )
}

function FrameworkSteps({ framework }: { framework: Framework }) {
  return (
    <div className="grid gap-6 md:grid-cols-[220px_1fr] md:items-start">
      <ol className="md:sticky md:top-24 flex flex-row gap-2 overflow-x-auto md:flex-col md:gap-1.5 md:overflow-visible">
        {framework.steps.map((step, i) => (
          <li key={step.label} className="md:flex-initial flex-1">
            <a
              href={`#qs-${framework.id}-${i}`}
              className={cn(
                "group/step border-border/70 bg-card/40 relative flex w-full items-center gap-3 overflow-hidden rounded-xl border px-3 py-3 text-left transition-all",
                "hover:bg-card/80 hover:border-primary/30"
              )}
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                  "border-primary/30 bg-primary/10 text-primary"
                )}
              >
                <span className="font-mono-tabular">{i + 1}</span>
              </span>
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="text-muted-foreground font-mono-tabular text-[10px] tracking-widest uppercase">
                  Step {i + 1}
                </span>
                <span className="text-foreground/85 truncate text-sm font-medium">
                  {step.title}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ol>

      <div className="flex flex-col gap-8">
        {framework.steps.map((step, i) => (
          <div key={step.label} id={`qs-${framework.id}-${i}`} className="scroll-mt-24">
            <div className="mb-4 flex items-center gap-3">
              <span className="border-primary/30 bg-primary/10 text-primary flex size-7 items-center justify-center rounded-full border font-mono-tabular text-xs font-semibold">
                {i + 1}
              </span>
              <h3 className="font-heading text-foreground text-xl font-semibold tracking-tight">
                {step.title}
              </h3>
            </div>
            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
              {step.description}
            </p>
            <CodeBlock
              code={step.code}
              lang="tsx"
              filename={step.filename}
              showTrafficLights
            />
          </div>
        ))}

        <Alert className="border-primary/30 bg-primary/5">
          <HugeiconsIcon
            icon={Tick02Icon}
            size={16}
            strokeWidth={2.2}
            className="text-primary"
          />
          <AlertTitle>That's it.</AlertTitle>
          <AlertDescription>
            Three files, one install. The bubble is now wired to the agent and
            running your commands.
          </AlertDescription>
        </Alert>

        <div className="flex items-center justify-end">
          <Button asChild className="gap-2 rounded-full">
            <a
              href="https://docs.wisp.dev/quickstart"
              target="_blank"
              rel="noreferrer"
            >
              Read the full docs
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={14}
                strokeWidth={2.2}
              />
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
