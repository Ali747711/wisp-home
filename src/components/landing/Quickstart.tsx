import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "./CodeBlock"
import { SectionHeader } from "./SectionHeader"
import { Reveal } from "./Reveal"
import { cn } from "@/lib/utils"

const STEPS = [
  {
    label: "Define",
    title: "Define your commands",
    description:
      "Each command is a typed Zod schema and a server-side handler. wisp turns it into a tool the LLM can call safely.",
    filename: "lib/agent-commands.ts",
    lang: "tsx" as const,
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
  },
  {
    label: "Mount",
    title: "Mount the route",
    description:
      "One Route Handler keeps your API key server-side and streams agent events back to the browser as Server-Sent Events.",
    filename: "app/api/agent/route.ts",
    lang: "tsx" as const,
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
    lang: "tsx" as const,
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
]

export function Quickstart() {
  const [active, setActive] = useState(0)

  return (
    <section id="quickstart" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
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
          <div className="mt-16 grid gap-8 md:grid-cols-[260px_1fr] md:items-start">
            <ol className="flex flex-row gap-2 md:flex-col md:gap-1.5">
              {STEPS.map((step, i) => {
                const isActive = i === active
                const isComplete = i < active
                return (
                  <li key={step.label} className="flex-1">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className={cn(
                        "group/step border-border/70 bg-card/40 relative flex w-full items-center gap-3 overflow-hidden rounded-xl border px-3 py-3 text-left transition-all",
                        "hover:bg-card/80",
                        isActive &&
                          "border-primary/50 bg-card shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_30%,transparent),0_12px_30px_-15px_color-mix(in_oklab,var(--primary)_55%,transparent)]"
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                          isActive
                            ? "border-primary/50 bg-primary text-primary-foreground"
                            : isComplete
                              ? "border-primary/30 bg-primary/10 text-primary"
                              : "border-border bg-background/60 text-muted-foreground"
                        )}
                      >
                        {isComplete ? (
                          <HugeiconsIcon icon={Tick02Icon} size={14} strokeWidth={2.4} />
                        ) : (
                          <span className="font-mono-tabular">{i + 1}</span>
                        )}
                      </span>
                      <span className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-muted-foreground font-mono-tabular text-[10px] tracking-widest uppercase">
                          Step {i + 1}
                        </span>
                        <span
                          className={cn(
                            "truncate text-sm font-medium transition-colors",
                            isActive ? "text-foreground" : "text-muted-foreground"
                          )}
                        >
                          {step.title}
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>

            <div className="flex flex-col gap-5">
              <div>
                <h3 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                  {STEPS[active].title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                  {STEPS[active].description}
                </p>
              </div>

              <CodeBlock
                code={STEPS[active].code}
                lang={STEPS[active].lang}
                filename={STEPS[active].filename}
                showTrafficLights
              />

              <div className="flex items-center gap-2 pt-2">
                {active > 0 && (
                  <Button
                    variant="ghost"
                    onClick={() => setActive((i) => i - 1)}
                    className="rounded-full"
                  >
                    Previous
                  </Button>
                )}
                <div className="flex-1" />
                {active < STEPS.length - 1 ? (
                  <Button
                    onClick={() => setActive((i) => i + 1)}
                    className="group rounded-full gap-2"
                  >
                    Next: {STEPS[active + 1].title}
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      size={14}
                      strokeWidth={2.2}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </Button>
                ) : (
                  <Button asChild className="rounded-full gap-2">
                    <a href="/docs/quickstart" rel="noreferrer">
                      Read the full docs
                      <HugeiconsIcon
                        icon={ArrowRight01Icon}
                        size={14}
                        strokeWidth={2.2}
                      />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
