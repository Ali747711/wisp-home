import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  SparklesIcon,
  StarsIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "./SectionHeader"
import { Reveal } from "./Reveal"
import { useDemoBubble } from "./demo-bubble-context"
import { cn } from "@/lib/utils"

const PROMPTS = [
  {
    label: "/createTask write the README",
    prompt: "Create a task to write the README, due Friday",
    icon: SparklesIcon,
  },
  {
    label: "/tasks list",
    prompt: "List my open tasks",
    icon: Tick02Icon,
  },
  {
    label: "Summarize my open PRs",
    prompt: "Summarize my open pull requests",
    icon: StarsIcon,
  },
]

export function LiveDemo() {
  const { openWith } = useDemoBubble()

  return (
    <section id="demo" className="relative py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="bg-dotgrid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeader
            eyebrow="Live demo"
            title={
              <>
                It even works{" "}
                <span className="from-primary to-foreground bg-linear-to-br bg-clip-text text-transparent">
                  on this page.
                </span>
              </>
            }
            description="The bubble in the bottom-right is the same component you'd ship — wired here to a scripted demo backend so you don't need an API key."
          />
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-14 flex flex-col items-center gap-6">
            <Badge
              variant="outline"
              className="border-border/70 bg-card/60 gap-1.5 rounded-full px-3 py-1 text-xs"
            >
              <span
                aria-hidden="true"
                className="bg-primary inline-block size-1.5 rounded-full shadow-[0_0_8px_2px_color-mix(in_oklab,var(--primary)_55%,transparent)]"
              />
              Try a prompt
            </Badge>

            <div className="flex w-full max-w-3xl flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
              {PROMPTS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => openWith(p.prompt)}
                  className={cn(
                    "group/chip border-border/70 bg-card/60 inline-flex items-center justify-between gap-3 rounded-full border px-4 py-2.5 text-left text-sm transition-all",
                    "hover:border-primary/40 hover:bg-card hover:shadow-[0_8px_24px_-12px_color-mix(in_oklab,var(--primary)_50%,transparent)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                    "sm:flex-initial"
                  )}
                >
                  <span className="inline-flex items-center gap-2.5 min-w-0">
                    <span className="border-primary/30 bg-primary/10 text-primary inline-flex size-7 shrink-0 items-center justify-center rounded-full border">
                      <HugeiconsIcon icon={p.icon} size={13} strokeWidth={2.2} />
                    </span>
                    <span className="font-mono-tabular truncate text-[13px]">
                      {p.label}
                    </span>
                  </span>
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={14}
                    strokeWidth={2}
                    className="text-muted-foreground shrink-0 transition-transform group-hover/chip:translate-x-0.5 group-hover/chip:text-foreground"
                  />
                </button>
              ))}
            </div>

            <p className="text-muted-foreground mt-2 text-center text-xs">
              Or click the bubble in the bottom-right and type freely.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
