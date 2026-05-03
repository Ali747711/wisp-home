import { useEffect, useRef, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  FlashIcon,
  Layers01Icon,
  PaintBoardIcon,
  CubeIcon,
} from "@hugeicons/core-free-icons"
import { SectionHeader } from "./SectionHeader"
import { Reveal } from "./Reveal"
import { cn } from "@/lib/utils"

const STATS = [
  {
    value: 12,
    suffix: "kb",
    label: "Gzipped bundle",
    sub: "ESM + CJS · tree-shakable",
  },
  {
    value: 0,
    suffix: "",
    label: "Vercel AI SDK deps",
    sub: "Hand-rolled SSE + tool calls",
  },
  {
    value: 2,
    suffix: "",
    label: "LLM providers",
    sub: "OpenAI · Anthropic · BYOA",
  },
  {
    value: 100,
    suffix: "%",
    label: "Type inference",
    sub: "Zod → JSON Schema, end-to-end",
  },
] as const

const REASONS = [
  {
    icon: FlashIcon,
    title: "Hand-rolled streaming",
    description:
      "We parse SSE ourselves. No Vercel AI SDK in your dep tree, no surprise model behaviour from someone else's abstractions.",
  },
  {
    icon: Layers01Icon,
    title: "Zod in, JSON Schema out",
    description:
      "You write a Zod schema. We auto-generate the per-provider tool-call schema. OpenAI gets OpenAPI 3, Anthropic gets JSON Schema 7.",
  },
  {
    icon: PaintBoardIcon,
    title: "Theme via CSS variables",
    description:
      "All UI tokens are CSS variables. Your users don't need Tailwind. Dark mode follows your app, not ours.",
  },
  {
    icon: CubeIcon,
    title: "Two providers, one API",
    description:
      "OpenAI and Anthropic share a single streaming + tool-calling interface. Add your own adapter in a few dozen lines.",
  },
]

export function StatsBar() {
  return (
    <section id="why" className="relative py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="bg-dotgrid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,black,transparent_75%)] opacity-40"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader
            eyebrow="Why wisp"
            title={
              <>
                Built for the developer{" "}
                <span className="text-muted-foreground">who reads source.</span>
              </>
            }
            description="Small surface area. No magic. Every primitive is hand-rolled and replaceable."
          />
        </Reveal>

        <Reveal delay={120}>
          <div className="border-border/70 bg-card/40 ring-primary-soft/30 mt-14 grid grid-cols-2 overflow-hidden rounded-2xl border lg:grid-cols-4">
            {STATS.map((stat, idx) => (
              <StatCell key={stat.label} stat={stat} index={idx} />
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-border/60 sm:grid-cols-2">
          {REASONS.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <div className="bg-background hover:bg-card/60 group relative h-full p-7 transition-colors">
                <div className="flex items-start gap-4">
                  <span className="border-primary/30 bg-primary/10 text-primary inline-flex size-10 shrink-0 items-center justify-center rounded-xl border">
                    <HugeiconsIcon icon={p.icon} size={18} strokeWidth={1.8} />
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-heading text-lg font-semibold tracking-tight">
                      {p.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

type Stat = (typeof STATS)[number]

function StatCell({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !done) {
            setDone(true)
            const target = stat.value
            if (target === 0) {
              setCount(0)
              return
            }
            const duration = 1100 + index * 80
            const start = performance.now()
            function tick(now: number) {
              const t = Math.min(1, (now - start) / duration)
              const eased = 1 - Math.pow(1 - t, 3)
              setCount(Math.round(target * eased))
              if (t < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
          }
        })
      },
      { threshold: 0.4 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [done, stat.value, index])

  return (
    <div
      ref={ref}
      className={cn(
        "border-border/60 relative flex flex-col gap-1.5 p-6 sm:p-7",
        "border-r last:border-r-0",
        "[&:nth-child(even)]:border-r-0 [&:nth-child(odd)]:border-b sm:[&:nth-child(even)]:border-b lg:[&]:border-b-0 lg:[&:not(:last-child)]:border-r"
      )}
    >
      <span
        aria-hidden="true"
        className="from-primary/40 absolute left-0 top-0 h-px w-full bg-gradient-to-r via-transparent to-transparent opacity-0 transition-opacity"
      />
      <div className="flex items-baseline gap-1">
        <span className="font-heading text-foreground text-4xl font-bold tracking-tight tabular-nums sm:text-5xl">
          {stat.value === 0 ? 0 : count}
        </span>
        {stat.suffix && (
          <span className="text-muted-foreground text-lg font-mono-tabular">
            {stat.suffix}
          </span>
        )}
      </div>
      <p className="text-foreground/85 text-sm font-medium">{stat.label}</p>
      <p className="text-muted-foreground text-xs">{stat.sub}</p>
    </div>
  )
}
