import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "./SectionHeader"
import { Reveal } from "./Reveal"
import { cn } from "@/lib/utils"

type Category = "Setup" | "Comparison" | "Bundle" | "Customization" | "Persistence"

const CATEGORY_CLS: Record<Category, string> = {
  Setup: "border-primary/30 text-primary bg-primary/10",
  Comparison: "border-amber-400/30 text-amber-700 dark:text-amber-300 bg-amber-400/10",
  Bundle: "border-emerald-400/30 text-emerald-700 dark:text-emerald-300 bg-emerald-400/10",
  Customization: "border-violet-400/30 text-violet-700 dark:text-violet-300 bg-violet-400/10",
  Persistence: "border-rose-400/30 text-rose-700 dark:text-rose-300 bg-rose-400/10",
}

const ITEMS: { q: string; a: string; category: Category }[] = [
  {
    category: "Comparison",
    q: "Why not just use the Vercel AI SDK?",
    a: "The Vercel AI SDK is excellent — but it's a foundation, not a product. wisp is the layer on top: typed commands, a UI kit, memory, and the agent loop. We don't depend on it because we want to control the streaming and tool-calling behaviour ourselves.",
  },
  {
    category: "Customization",
    q: "Does it work without Tailwind?",
    a: "Yes. The default UI is themed entirely via CSS variables. Drop the components in a vanilla CSS app and they look right out of the box. Tailwind is only used internally during development.",
  },
  {
    category: "Setup",
    q: "App Router or Pages Router?",
    a: "Both. createAgentRoute targets App Router (returns { POST }). createAgentRouteLegacy is the Pages Router variant — same config, different signature.",
  },
  {
    category: "Customization",
    q: "How do I add my own provider?",
    a: "Implement a small LLMAdapter interface — about 80 lines. The provider receives messages plus the registered commands' schemas and yields normalised AgentEvents. Local models, Gemini, anything that streams.",
  },
  {
    category: "Bundle",
    q: "What's the bundle cost?",
    a: "@wisp/react is roughly 12 kB gzipped including the bubble + chat panel. Tree-shakeable, zero runtime CSS, ESM + CJS dual output. The core package adds ~6 kB.",
  },
  {
    category: "Persistence",
    q: "Does it persist conversations?",
    a: 'By default, conversations live in browser memory. Pass storage="localStorage" or storage="sessionStorage" on AgentProvider for persistence, or implement the StorageAdapter interface for your own backend.',
  },
]

export function Faq() {
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader
            eyebrow="FAQ"
            title="Questions, answered."
            description="The things developers ask in the first ten minutes."
          />
        </Reveal>

        <Reveal delay={120}>
          <Accordion
            type="single"
            collapsible
            className="border-border/60 bg-card/40 mt-12 overflow-hidden rounded-2xl border"
            defaultValue="q-0"
          >
            {ITEMS.map((item, idx) => (
              <AccordionItem
                key={item.q}
                value={`q-${idx}`}
                className="border-border/40 px-5 last:border-b-0"
              >
                <AccordionTrigger className="gap-3 text-left text-base font-medium">
                  <span className="flex flex-1 items-center gap-3">
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-mono-tabular shrink-0 rounded-full px-2 py-0 text-[10px] tracking-widest uppercase",
                        CATEGORY_CLS[item.category]
                      )}
                    >
                      {item.category}
                    </Badge>
                    <span className="flex-1">{item.q}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
