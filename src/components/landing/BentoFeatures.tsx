import type { ReactNode } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  PuzzleIcon,
  PaintBoardIcon,
  Database01Icon,
  FlashIcon,
  CubeIcon,
} from "@hugeicons/core-free-icons"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "./SectionHeader"
import { Reveal } from "./Reveal"
import { CodeBlock } from "./CodeBlock"
import { cn } from "@/lib/utils"

const TYPE_SAFE_CODE = `import { defineCommand } from "@wisp/core"
import { z } from "zod"

defineCommand({
  name: "createTask",
  description: "Create a new task",
  params: z.object({
    title: z.string().min(1),
    dueDate: z.string().datetime().optional(),
    priority: z.enum(["low", "med", "high"]),
  }),
  handler: async ({ title, dueDate, priority }) => {
    // ✓ fully typed — params is z.infer<typeof params>
    return await db.task.create({
      data: { title, dueDate, priority },
    })
  },
})`

type Tile = {
  id: string
  className: string
  children: ReactNode
}

export function BentoFeatures() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader
            eyebrow="What's in the box"
            title={
              <>
                Five pillars,{" "}
                <span className="text-muted-foreground">one install.</span>
              </>
            }
            description="Everything you need to ship a real agent — no glue code, no swap-out abstractions, no surprise vendor lock-in."
          />
        </Reveal>

        <div className="mt-14 grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-6">
          <Tile className="md:col-span-2 lg:col-span-4 lg:row-span-2">
            <TileHeader
              icon={PuzzleIcon}
              eyebrow="Pillar 01"
              title="Type-safe commands, end-to-end"
              description="Describe your app's capabilities once with Zod. wisp generates the JSON schema, validates the LLM's arguments, and runs your handler with full type inference — no manual schema, no any."
            />
            <div className="-mx-1 mt-4 overflow-hidden">
              <CodeBlock
                code={TYPE_SAFE_CODE}
                lang="tsx"
                filename="lib/agent-commands.ts"
                density="compact"
                className="bg-background/80"
              />
            </div>
          </Tile>

          <Tile className="lg:col-span-2">
            <TileHeader
              icon={CubeIcon}
              eyebrow="Pillar 02"
              title="Tiny by default"
              description=""
              compact
            />
            <div className="mt-3 flex flex-1 flex-col justify-end">
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-foreground text-5xl font-bold tracking-tight">
                  ~12
                </span>
                <span className="text-muted-foreground font-mono-tabular text-sm">
                  kb gzipped
                </span>
              </div>
              <p className="text-muted-foreground mt-2 text-xs leading-snug">
                Tree-shakable. ESM + CJS. Zero runtime deps on Vercel AI SDK.
              </p>
              <div className="mt-3 flex gap-1.5">
                {[12, 28, 64, 110, 180].map((kb, i) => (
                  <div
                    key={kb}
                    className={cn(
                      "h-1.5 flex-1 rounded-full",
                      i === 0 ? "bg-primary" : "bg-muted-foreground/15"
                    )}
                    title={`${kb}kb`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground/70 mt-1.5 font-mono-tabular text-[10px] uppercase tracking-wider">
                vs. typical agent stacks
              </p>
            </div>
          </Tile>

          <Tile className="lg:col-span-2">
            <TileHeader
              icon={FlashIcon}
              eyebrow="Pillar 03"
              title="Provider-agnostic"
              description=""
              compact
            />
            <div className="mt-3 flex flex-1 flex-col justify-end gap-2.5">
              <ProviderRow name="OpenAI" model="gpt-4o · gpt-4o-mini" active />
              <ProviderRow name="Anthropic" model="claude-sonnet-4" active />
              <ProviderRow name="Custom" model="bring your own adapter" />
            </div>
          </Tile>

          <Tile className="lg:col-span-3">
            <TileHeader
              icon={PaintBoardIcon}
              eyebrow="Pillar 04"
              title="Drop-in UI kit"
              description="Floating bubble plus composable chat primitives. Themed via CSS variables — no Tailwind required for your app. Light + dark out of the box."
            />
            <div className="mt-4 flex flex-1 items-end">
              <BubblePreview />
            </div>
          </Tile>

          <Tile className="lg:col-span-3">
            <TileHeader
              icon={Database01Icon}
              eyebrow="Pillar 05"
              title="Hand-rolled streaming"
              description="Our own SSE parser + tool-calling loop. No surprise abstractions. Stream tokens, tool calls, and final state with predictable backpressure."
            />
            <div className="mt-4 flex flex-1 items-end">
              <TokenStreamPreview />
            </div>
          </Tile>
        </div>
      </div>
    </section>
  )
}

function Tile({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "surface-card border-border/70 group relative flex flex-col overflow-hidden rounded-2xl border p-5 transition-all duration-300 sm:p-6",
        "hover:border-primary/40 hover:-translate-y-0.5",
        "hover:shadow-[0_18px_40px_-20px_color-mix(in_oklab,var(--primary)_45%,transparent)]",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="from-primary/10 pointer-events-none absolute inset-x-0 -top-px h-px bg-linear-to-r via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {children}
    </div>
  )
}

function TileHeader({
  icon,
  eyebrow,
  title,
  description,
  compact,
}: {
  icon: typeof PuzzleIcon
  eyebrow: string
  title: string
  description: string
  compact?: boolean
}) {
  return (
    <div className={cn("flex flex-col gap-2.5", compact && "gap-2")}>
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "border-primary/30 bg-primary/10 text-primary inline-flex size-9 items-center justify-center rounded-xl border",
            "shadow-[0_0_24px_-6px_color-mix(in_oklab,var(--primary)_60%,transparent)]"
          )}
        >
          <HugeiconsIcon icon={icon} size={16} strokeWidth={1.8} />
        </span>
        <Badge
          variant="outline"
          className="font-mono-tabular border-border/60 text-muted-foreground rounded-full px-2 py-0 text-[10px] tracking-widest uppercase"
        >
          {eyebrow}
        </Badge>
      </div>
      <h3
        className={cn(
          "font-heading text-foreground font-semibold tracking-tight",
          compact ? "text-lg" : "text-xl"
        )}
      >
        {title}
      </h3>
      {description && (
        <p
          className={cn(
            "text-muted-foreground leading-relaxed",
            compact ? "text-xs" : "text-sm"
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}

function ProviderRow({
  name,
  model,
  active,
}: {
  name: string
  model: string
  active?: boolean
}) {
  return (
    <div
      className={cn(
        "border-border/60 bg-background/60 flex items-center gap-3 rounded-lg border px-3 py-2",
        active && "border-primary/35"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 rounded-full",
          active
            ? "bg-primary shadow-[0_0_8px_2px_color-mix(in_oklab,var(--primary)_60%,transparent)]"
            : "bg-muted-foreground/30"
        )}
      />
      <span className="text-foreground text-xs font-medium">{name}</span>
      <span className="text-muted-foreground font-mono-tabular ml-auto text-[10px]">
        {model}
      </span>
    </div>
  )
}

function BubblePreview() {
  return (
    <div className="border-border/60 bg-background/70 relative w-full overflow-hidden rounded-xl border p-4 pb-12">
      <div className="space-y-2">
        <div className="flex justify-end">
          <div className="bg-primary/15 text-foreground max-w-[80%] rounded-2xl rounded-tr-sm px-3 py-1.5 text-xs">
            Create a task: "Ship v0.1.0" due Friday
          </div>
        </div>
        <div className="flex">
          <div className="border-border/60 bg-card text-muted-foreground max-w-[80%] rounded-2xl rounded-tl-sm border px-3 py-1.5 text-xs">
            Done — task <span className="text-primary">#42</span> created.
          </div>
        </div>
      </div>
      <div className="absolute right-3 bottom-3">
        <div className="bg-primary text-primary-foreground glow-primary inline-flex size-8 items-center justify-center rounded-full">
          <svg viewBox="0 0 24 24" fill="none" className="size-4">
            <path
              d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

function TokenStreamPreview() {
  const tokens = [
    "Sure",
    ", ",
    "I'll ",
    "create ",
    "the ",
    "task ",
    "now",
    ".",
  ]
  return (
    <div className="border-border/60 bg-background/70 w-full overflow-hidden rounded-xl border p-4">
      <div className="font-mono-tabular text-muted-foreground mb-2 flex items-center gap-1.5 text-[10px] uppercase tracking-wider">
        <span className="bg-primary inline-block size-1.5 animate-pulse rounded-full" />
        SSE · streaming
      </div>
      <p className="text-foreground text-sm leading-relaxed">
        {tokens.map((tok, i) => (
          <span
            key={i}
            className="inline-block opacity-0 animate-[fadein_2s_ease-out_forwards]"
            style={{
              animationDelay: `${i * 110}ms`,
            }}
          >
            {tok}
          </span>
        ))}
        <span className="bg-foreground ml-0.5 inline-block h-3.5 w-1 align-middle animate-pulse" />
      </p>
      <style>{`
        @keyframes fadein { to { opacity: 1; } }
      `}</style>
    </div>
  )
}
