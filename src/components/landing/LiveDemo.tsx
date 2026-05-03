import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  SparklesIcon,
  Tick02Icon,
  Search01Icon,
  ShoppingBag01Icon,
  CustomerSupportIcon,
  ReloadIcon,
  ArrowLeft01Icon,
} from "@hugeicons/core-free-icons"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { SectionHeader } from "./SectionHeader"
import { Reveal } from "./Reveal"
import { useDemoBubble } from "./demo-bubble-context"
import { cn } from "@/lib/utils"

type ScenarioId = "tasks" | "shop" | "support"

type Prompt = {
  label: string
  prompt: string
  icon: typeof SparklesIcon
  tool: string
  tooltip: string
}

type Scenario = {
  id: ScenarioId
  name: string
  url: string
  icon: typeof SparklesIcon
  prompts: Prompt[]
  page: { title: string; subtitle: string; rows: string[] }
}

const SCENARIOS: Scenario[] = [
  {
    id: "tasks",
    name: "Task manager",
    url: "tasks.demo/projects/wisp",
    icon: Tick02Icon,
    page: {
      title: "Inbox · Wisp",
      subtitle: "3 open tasks · sorted by due date",
      rows: ["Write the README", "Ship v0.1.0 to npm", "Plan v0.2 roadmap"],
    },
    prompts: [
      {
        label: "/createTask write the README",
        prompt: "Create a task to write the README, due Friday",
        icon: SparklesIcon,
        tool: "createTask",
        tooltip:
          "Calls the createTask command with z.object({ title, dueDate }) — runs your handler server-side.",
      },
      {
        label: "/tasks list",
        prompt: "List my open tasks",
        icon: Tick02Icon,
        tool: "listTasks",
        tooltip:
          "Calls the listTasks command — wisp validates the empty params and streams the result back as a tool message.",
      },
      {
        label: "Summarize my open PRs",
        prompt: "Summarize my open pull requests",
        icon: Search01Icon,
        tool: "no tool",
        tooltip:
          "Free-form prompt — no tool fires. The agent answers directly from app context.",
      },
    ],
  },
  {
    id: "shop",
    name: "E-commerce",
    url: "shop.demo/cart",
    icon: ShoppingBag01Icon,
    page: {
      title: "Your cart · Acme",
      subtitle: "2 items · ready to checkout",
      rows: ["Wireless headphones — $89", "USB-C cable (2m) — $14"],
    },
    prompts: [
      {
        label: "/applyCoupon SUMMER25",
        prompt: "Apply the SUMMER25 discount to my cart",
        icon: SparklesIcon,
        tool: "applyCoupon",
        tooltip:
          "Calls applyCoupon({ code }) — your handler validates and updates the cart total.",
      },
      {
        label: "/track #4421",
        prompt: "Where is my order #4421?",
        icon: Search01Icon,
        tool: "trackOrder",
        tooltip:
          "Calls trackOrder({ orderId }) — wisp validates the ID format before your handler runs.",
      },
      {
        label: "Recommend a gift under $40",
        prompt: "Recommend a gift under $40",
        icon: SparklesIcon,
        tool: "recommendProducts",
        tooltip:
          "Calls recommendProducts({ budget, audience }) — the LLM extracts both args and your handler queries the catalog.",
      },
    ],
  },
  {
    id: "support",
    name: "Support agent",
    url: "support.demo/chat",
    icon: CustomerSupportIcon,
    page: {
      title: "Help center · Acme",
      subtitle: "Search docs · open tickets · contact",
      rows: [
        "Getting started · 12 articles",
        "Billing · 8 articles",
        "API reference · 41 articles",
      ],
    },
    prompts: [
      {
        label: "/openTicket billing issue",
        prompt: "Open a ticket about a duplicate charge on my last invoice",
        icon: SparklesIcon,
        tool: "openTicket",
        tooltip:
          "Calls openTicket({ category, summary }) — your handler routes to the right team.",
      },
      {
        label: "How do I rotate my API key?",
        prompt: "How do I rotate my API key?",
        icon: Search01Icon,
        tool: "searchDocs",
        tooltip:
          "Calls searchDocs({ query }) — wisp streams the citations as the model writes.",
      },
      {
        label: "Show me my last 3 tickets",
        prompt: "Show me my last 3 tickets",
        icon: Tick02Icon,
        tool: "listTickets",
        tooltip:
          "Calls listTickets({ limit }) — your handler scopes by the userId passed in agent.setContext.",
      },
    ],
  },
]

export function LiveDemo() {
  const { openWith } = useDemoBubble()
  const [scenarioId, setScenarioId] = useState<ScenarioId>("tasks")
  const scenario = SCENARIOS.find((s) => s.id === scenarioId) ?? SCENARIOS[0]

  return (
    <section id="demo" className="relative py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="bg-dotgrid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent_70%)] opacity-40"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeader
            eyebrow="Live demo"
            title={
              <>
                It even works{" "}
                <span className="bg-linear-to-br from-primary to-foreground bg-clip-text text-transparent">
                  on this page.
                </span>
              </>
            }
            description="The bubble in the bottom-right is the same component you'd ship — wired here to a scripted demo backend so you don't need an API key."
          />
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 flex justify-center">
            <Tabs
              value={scenarioId}
              onValueChange={(v) => setScenarioId(v as ScenarioId)}
            >
              <TabsList className="h-auto rounded-full border border-border/60 bg-card/40 p-1">
                {SCENARIOS.map((s) => (
                  <TabsTrigger
                    key={s.id}
                    value={s.id}
                    className="gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium data-[state=active]:bg-background"
                  >
                    <HugeiconsIcon icon={s.icon} size={13} strokeWidth={2} />
                    {s.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <BrowserChrome
            scenario={scenario}
            prompts={scenario.prompts}
            onPrompt={openWith}
          />
        </Reveal>

        <Reveal delay={260}>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Tap a chip above or click the bubble in the bottom-right and type
            freely.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function BrowserChrome({
  scenario,
  prompts,
  onPrompt,
}: {
  scenario: Scenario
  prompts: Prompt[]
  onPrompt: (prompt: string) => void
}) {
  return (
    <div className="ring-primary-soft/40 surface-card mt-10 overflow-hidden rounded-2xl border border-border/70 bg-card/40 shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--primary)_25%,transparent)]">
      <div className="flex items-center gap-3 border-b border-border/60 bg-muted/40 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[#fc615d]" />
          <span className="size-2.5 rounded-full bg-[#fdbc40]" />
          <span className="size-2.5 rounded-full bg-[#34c749]" />
        </div>
        <div className="ml-2 hidden items-center gap-2 text-muted-foreground/60 sm:flex">
          <HugeiconsIcon icon={ArrowLeft01Icon} size={14} strokeWidth={2} />
          <HugeiconsIcon icon={ArrowRight01Icon} size={14} strokeWidth={2} />
          <HugeiconsIcon icon={ReloadIcon} size={14} strokeWidth={2} />
        </div>
        <div className="font-mono-tabular mx-auto inline-flex max-w-md flex-1 items-center gap-2 truncate rounded-md border border-border/60 bg-background/70 px-3 py-1 text-xs text-muted-foreground">
          <span className="text-primary">●</span>
          <span className="truncate">{scenario.url}</span>
        </div>
        <Badge
          variant="outline"
          className="font-mono-tabular hidden border-border/60 text-[10px] tracking-widest uppercase sm:inline-flex"
        >
          live
        </Badge>
      </div>

      <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
        <div className="relative h-[320px] border-b border-border/60 p-6 md:h-auto md:border-r md:border-b-0">
          <p className="font-mono-tabular text-[10px] tracking-widest text-muted-foreground uppercase">
            simulated app
          </p>
          <h4 className="mt-1 font-heading text-lg font-semibold tracking-tight text-foreground">
            {scenario.page.title}
          </h4>
          <p className="mt-1 text-xs text-muted-foreground">
            {scenario.page.subtitle}
          </p>
          <ul className="mt-5 flex flex-col gap-2">
            {scenario.page.rows.map((row) => (
              <li
                key={row}
                className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/60 px-3 py-2.5 text-xs text-foreground/85"
              >
                <span
                  aria-hidden="true"
                  className="inline-block size-1.5 shrink-0 rounded-full bg-primary/40"
                />
                <span className="truncate">{row}</span>
              </li>
            ))}
          </ul>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background/70 to-transparent"
          />
        </div>

        <div className="flex flex-col gap-3 bg-muted/15 p-6">
          <Badge
            variant="outline"
            className="mr-auto gap-1.5 rounded-full border-border/70 bg-card/60 px-3 py-1 text-xs"
          >
            <span
              aria-hidden="true"
              className="inline-block size-1.5 rounded-full bg-primary shadow-[0_0_8px_2px_color-mix(in_oklab,var(--primary)_55%,transparent)]"
            />
            Try a prompt
          </Badge>

          <div className="flex flex-col gap-2">
            {prompts.map((p) => (
              <HoverCard key={p.label} openDelay={150} closeDelay={50}>
                <HoverCardTrigger asChild>
                  <button
                    type="button"
                    onClick={() => onPrompt(p.prompt)}
                    className={cn(
                      "group/chip inline-flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-card/70 px-4 py-2.5 text-left text-sm transition-all",
                      "hover:border-primary/40 hover:bg-card hover:shadow-[0_8px_24px_-12px_color-mix(in_oklab,var(--primary)_50%,transparent)]",
                      "focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
                    )}
                  >
                    <span className="inline-flex min-w-0 items-center gap-2.5">
                      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                        <HugeiconsIcon
                          icon={p.icon}
                          size={13}
                          strokeWidth={2.2}
                        />
                      </span>
                      <span className="font-mono-tabular truncate text-[12.5px]">
                        {p.label}
                      </span>
                    </span>
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      size={14}
                      strokeWidth={2}
                      className="shrink-0 text-muted-foreground transition-transform group-hover/chip:translate-x-0.5 group-hover/chip:text-foreground"
                    />
                  </button>
                </HoverCardTrigger>
                <HoverCardContent side="left" className="w-72 text-xs">
                  <p className="font-mono-tabular mb-2 inline-flex items-center gap-1.5 text-[10px] tracking-widest text-muted-foreground uppercase">
                    <span className="inline-block size-1.5 rounded-full bg-primary" />
                    will fire: <span className="text-primary">{p.tool}</span>
                  </p>
                  <p className="leading-snug text-foreground/85">{p.tooltip}</p>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
