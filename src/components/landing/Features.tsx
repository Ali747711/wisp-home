import type { ReactNode } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  PuzzleIcon,
  PaintBoardIcon,
  Database01Icon,
} from "@hugeicons/core-free-icons"
import { SectionHeader } from "./SectionHeader"
import { Reveal } from "./Reveal"
import { cn } from "@/lib/utils"

type Feature = {
  icon: typeof PuzzleIcon
  title: string
  description: string
  preview: ReactNode
}

const FEATURES: Feature[] = [
  {
    icon: PuzzleIcon,
    title: "Type-safe commands",
    description:
      "Describe your app's capabilities once with Zod. wisp generates the JSON schema, validates the LLM's arguments, and runs your handler with full type inference.",
    preview: (
      <CodePeek>
        <CodeLine>
          <CodeKw>defineCommand</CodeKw>
          {"({"}
        </CodeLine>
        <CodeLine indent={1}>
          name: <CodeStr>"createTask"</CodeStr>,
        </CodeLine>
        <CodeLine indent={1}>
          params: z.object({"{"}
          {" "}title: z.string()
          {" }"}),
        </CodeLine>
        <CodeLine indent={1}>
          handler: <CodeKw>async</CodeKw> ({"{"}
          {" title }"}) =&gt; …,
        </CodeLine>
        <CodeLine>{"})"}</CodeLine>
      </CodePeek>
    ),
  },
  {
    icon: PaintBoardIcon,
    title: "Drop-in UI kit",
    description:
      "A polished floating bubble plus composable chat primitives, styled via CSS variables. No Tailwind required for your app — themes work out of the box, light and dark.",
    preview: (
      <CodePeek>
        <CodeLine>
          <CodeKw>{"<"}AgentProvider</CodeKw> endpoint=
          <CodeStr>"/api/agent"</CodeStr>
          <CodeKw>{">"}</CodeKw>
        </CodeLine>
        <CodeLine indent={1}>{"{children}"}</CodeLine>
        <CodeLine indent={1}>
          <CodeKw>{"<"}AgentBubble</CodeKw> /<CodeKw>{">"}</CodeKw>
        </CodeLine>
        <CodeLine>
          <CodeKw>{"</"}AgentProvider<CodeKw>{">"}</CodeKw></CodeKw>
        </CodeLine>
      </CodePeek>
    ),
  },
  {
    icon: Database01Icon,
    title: "Memory & context",
    description:
      "Session memory ships in the box — in-memory, localStorage, or sessionStorage. Pass app context (userId, currentPage…) to every command handler with one call.",
    preview: (
      <CodePeek>
        <CodeLine>
          agent.<CodeKw>setContext</CodeKw>({"{"}
        </CodeLine>
        <CodeLine indent={1}>
          userId: ctx.userId,
        </CodeLine>
        <CodeLine indent={1}>
          currentPage: <CodeStr>"/tasks"</CodeStr>,
        </CodeLine>
        <CodeLine>{"})"}</CodeLine>
      </CodePeek>
    ),
  },
]

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeader
            eyebrow="What's in the box"
            title={
              <>
                Three pillars,{" "}
                <span className="text-muted-foreground">one install.</span>
              </>
            }
            description="Everything you need to ship a real agent — no glue code, no swap-out abstractions, no surprise vendor lock-in."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {FEATURES.map((feature, idx) => (
            <Reveal key={feature.title} delay={idx * 80}>
              <FeatureCard feature={feature} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article
      className={cn(
        "surface-card group relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl border p-6 transition-all duration-300",
        "border-border/70 hover:border-primary/40",
        "hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_color-mix(in_oklab,var(--primary)_45%,transparent)]"
      )}
    >
      <span
        aria-hidden="true"
        className="from-primary/10 pointer-events-none absolute inset-x-0 -top-px h-px bg-linear-to-r via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <span
        className={cn(
          "border-primary/30 bg-primary/10 text-primary inline-flex size-10 items-center justify-center rounded-xl border",
          "shadow-[0_0_24px_-6px_color-mix(in_oklab,var(--primary)_60%,transparent)]"
        )}
      >
        <HugeiconsIcon icon={feature.icon} size={20} strokeWidth={1.8} />
      </span>

      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-xl font-semibold tracking-tight">
          {feature.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {feature.description}
        </p>
      </div>

      <div className="mt-auto">{feature.preview}</div>
    </article>
  )
}

function CodePeek({ children }: { children: ReactNode }) {
  return (
    <pre className="border-border/60 bg-background/60 font-mono-tabular ring-primary-soft/30 overflow-x-auto rounded-lg border px-4 py-3 text-[12px] leading-relaxed">
      <code className="block">{children}</code>
    </pre>
  )
}

function CodeLine({
  children,
  indent = 0,
}: {
  children: ReactNode
  indent?: number
}) {
  return (
    <div>
      {indent > 0 && <span aria-hidden="true">{" ".repeat(indent * 2)}</span>}
      {children}
    </div>
  )
}

function CodeKw({ children }: { children: ReactNode }) {
  return <span className="text-primary">{children}</span>
}

function CodeStr({ children }: { children: ReactNode }) {
  return <span className="text-foreground/70">{children}</span>
}
