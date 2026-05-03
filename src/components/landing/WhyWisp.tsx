import { HugeiconsIcon } from "@hugeicons/react"
import {
  FlashIcon,
  Layers01Icon,
  PaintBoardIcon,
  CubeIcon,
} from "@hugeicons/core-free-icons"
import { SectionHeader } from "./SectionHeader"
import { Reveal } from "./Reveal"

const POINTS = [
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

export function WhyWisp() {
  return (
    <section id="why" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
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

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border bg-border/60 sm:grid-cols-2">
          {POINTS.map((p, i) => (
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
