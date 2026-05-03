import { Reveal } from "./Reveal"

const PRIMITIVES = [
  { name: "React", note: "19" },
  { name: "TypeScript", note: "5.x" },
  { name: "Tailwind", note: "v4" },
  { name: "Radix UI", note: "primitives" },
  { name: "Zod", note: "validation" },
  { name: "Zustand", note: "state" },
  { name: "Shiki", note: "syntax" },
  { name: "OpenAI", note: "gpt-4o" },
  { name: "Anthropic", note: "claude-sonnet-4" },
  { name: "Vite", note: "+ Next.js" },
  { name: "shadcn/ui", note: "design" },
  { name: "Sonner", note: "toasts" },
]

export function LogoCloud() {
  const items = [...PRIMITIVES, ...PRIMITIVES]

  return (
    <section className="border-border/60 relative border-y bg-muted/20 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-muted-foreground text-center text-[11px] font-mono-tabular uppercase tracking-widest">
            Built with industry-standard primitives
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div className="marquee-fade group relative mt-6 overflow-hidden">
            <ul className="animate-marquee-x flex w-max items-center gap-10">
              {items.map((item, idx) => (
                <li
                  key={`${item.name}-${idx}`}
                  className="text-muted-foreground inline-flex shrink-0 items-center gap-2 text-sm"
                >
                  <span className="font-heading font-semibold tracking-tight text-foreground/80">
                    {item.name}
                  </span>
                  <span className="text-muted-foreground/60 font-mono-tabular text-[10px] uppercase tracking-wider">
                    {item.note}
                  </span>
                  <span aria-hidden="true" className="text-border ml-2 select-none">
                    ·
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
