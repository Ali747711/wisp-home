import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  GithubIcon,
  StarsIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CodeBlock } from "./CodeBlock"
import { CopyButton } from "./CopyButton"
import { InstallTabs } from "./InstallTabs"
import { Reveal } from "./Reveal"
import { cn } from "@/lib/utils"

const ROUTE_CODE = `// app/api/agent/route.ts
import { createAgentRoute } from "@wisp/next"
import { commands } from "@/lib/agent-commands"

export const { POST } = createAgentRoute({
  llm: {
    provider: "openai",
    apiKey: process.env.OPENAI_API_KEY!,
    model: "gpt-4o-mini",
  },
  commands,
})`

const COMMANDS_CODE = `// lib/agent-commands.ts
import { defineCommand } from "@wisp/core"
import { z } from "zod"

export const commands = [
  defineCommand({
    name: "createTask",
    description: "Create a new task",
    params: z.object({
      title: z.string(),
      dueDate: z.string().optional(),
    }),
    handler: async ({ title, dueDate }) => {
      return await db.task.create({ data: { title, dueDate } })
    },
  }),
]`

const LAYOUT_CODE = `// app/layout.tsx
import { AgentProvider, AgentBubble } from "@wisp/react"

export default function Layout({ children }) {
  return (
    <AgentProvider endpoint="/api/agent">
      {children}
      <AgentBubble />
    </AgentProvider>
  )
}`

const FILES = [
  { id: "route", name: "route.ts", code: ROUTE_CODE, lang: "tsx" as const },
  { id: "commands", name: "commands.ts", code: COMMANDS_CODE, lang: "tsx" as const },
  { id: "layout", name: "layout.tsx", code: LAYOUT_CODE, lang: "tsx" as const },
]

const TRUST_POINTS = [
  "MIT licensed",
  "ESM + CJS",
  "~12kb gzipped",
  "TypeScript-first",
]

export function Hero() {
  const [activeFile, setActiveFile] = useState("route")
  const active = FILES.find((f) => f.id === activeFile) ?? FILES[0]

  return (
    <section className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px]"
      />
      <div
        aria-hidden="true"
        className="bg-dotgrid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent_70%)] opacity-50"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div className="flex flex-col items-start text-left">
            <Reveal>
              <Badge
                variant="secondary"
                className="border-primary/25 bg-primary/10 text-primary-foreground dark:text-primary mb-6 gap-1.5 rounded-full border px-3 py-1 backdrop-blur"
              >
                <HugeiconsIcon icon={StarsIcon} size={14} strokeWidth={2} />
                <span className="font-mono-tabular tracking-wider uppercase">
                  v0.1.0 · Now in beta
                </span>
              </Badge>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="font-heading max-w-2xl text-balance text-5xl leading-[1.02] font-bold tracking-tight sm:text-6xl">
                Drop an{" "}
                <span className="relative inline-block">
                  <span className="from-primary via-primary to-foreground bg-linear-to-br bg-clip-text text-transparent">
                    AI agent
                  </span>
                  <span
                    aria-hidden="true"
                    className="bg-primary/30 absolute inset-x-0 -bottom-1 -z-10 h-3 blur-md"
                  />
                </span>{" "}
                into your app.
                <br className="hidden sm:block" />
                <span className="text-muted-foreground">In five minutes.</span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="text-muted-foreground mt-6 max-w-xl text-pretty text-lg sm:text-xl">
                <span className="text-foreground">wisp</span> is a drop-in agent SDK
                for React and Next.js. Define your app's capabilities as type-safe
                commands — we handle streaming, tool-calling, and the UI.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  className="glow-primary group h-12 gap-2 rounded-full px-6 text-sm font-medium"
                  asChild
                >
                  <a href="#quickstart">
                    Get started
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      size={16}
                      strokeWidth={2.2}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 gap-2 rounded-full px-6 text-sm font-medium"
                  asChild
                >
                  <a
                    href="https://github.com/azamat/wisp"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <HugeiconsIcon icon={GithubIcon} size={16} strokeWidth={2} />
                    Star on GitHub
                  </a>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 w-full max-w-md">
                <InstallTabs />
              </div>
            </Reveal>

            <Reveal delay={380}>
              <ul className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                {TRUST_POINTS.map((point) => (
                  <li
                    key={point}
                    className="text-muted-foreground inline-flex items-center gap-1.5"
                  >
                    <HugeiconsIcon
                      icon={Tick02Icon}
                      size={12}
                      strokeWidth={2.2}
                      className="text-primary"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={120} className="w-full">
            <div className="relative">
              <div
                aria-hidden="true"
                className="from-primary/35 absolute -inset-3 -z-10 rounded-[28px] bg-gradient-to-br to-transparent opacity-60 blur-2xl"
              />

              <div className="border-border/70 bg-card/80 ring-primary-soft/40 surface-card overflow-hidden rounded-2xl border shadow-[0_24px_60px_-24px_color-mix(in_oklab,var(--primary)_30%,transparent),0_2px_0_0_color-mix(in_oklab,var(--foreground)_4%,transparent)_inset]">
                <Tabs value={activeFile} onValueChange={setActiveFile}>
                  <div className="border-border/60 bg-muted/40 flex items-center gap-2 border-b px-3 py-2">
                    <div
                      aria-hidden="true"
                      className="flex items-center gap-1.5 pl-1 pr-1"
                    >
                      <span className="size-2.5 rounded-full bg-[#fc615d]" />
                      <span className="size-2.5 rounded-full bg-[#fdbc40]" />
                      <span className="size-2.5 rounded-full bg-[#34c749]" />
                    </div>
                    <TabsList className="h-auto gap-0.5 bg-transparent p-0">
                      {FILES.map((file) => (
                        <TabsTrigger
                          key={file.id}
                          value={file.id}
                          className={cn(
                            "font-mono-tabular text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-none",
                            "rounded-md border border-transparent data-[state=active]:border-border/60 px-2.5 py-1 text-xs font-normal"
                          )}
                        >
                          {file.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    <div className="ml-auto">
                      <CopyButton value={active.code} className="size-7" />
                    </div>
                  </div>
                  {FILES.map((file) => (
                    <TabsContent
                      key={file.id}
                      value={file.id}
                      className="m-0 border-0 p-0"
                    >
                      <CodeBlock
                        code={file.code}
                        lang={file.lang}
                        showCopy={false}
                        density="comfortable"
                        className="border-0 rounded-none ring-0 shadow-none"
                      />
                    </TabsContent>
                  ))}
                </Tabs>

                <div className="border-border/60 bg-muted/30 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t px-4 py-2.5 text-[11px]">
                  <span className="text-muted-foreground inline-flex items-center gap-1.5">
                    <span className="bg-primary inline-block size-1.5 rounded-full animate-pulse" />
                    <span className="font-mono-tabular">streaming · ready</span>
                  </span>
                  <span className="text-muted-foreground/70">·</span>
                  <span className="text-muted-foreground font-mono-tabular">
                    OpenAI · Anthropic
                  </span>
                  <span className="text-muted-foreground/70">·</span>
                  <span className="text-muted-foreground font-mono-tabular">
                    Zod → JSON Schema
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
