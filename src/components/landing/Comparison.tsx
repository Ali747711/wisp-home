import { HugeiconsIcon } from "@hugeicons/react"
import { Tick02Icon, Cancel01Icon } from "@hugeicons/core-free-icons"
import { SectionHeader } from "./SectionHeader"
import { Reveal } from "./Reveal"
import { cn } from "@/lib/utils"

type Cell =
  | { kind: "yes"; note?: string }
  | { kind: "no"; note?: string }
  | { kind: "partial"; note: string }
  | { kind: "text"; note: string }

type Row = {
  feature: string
  wisp: Cell
  copilotKit: Cell
  assistantUi: Cell
  diy: Cell
}

const ROWS: Row[] = [
  {
    feature: "Type-safe commands (Zod → JSON Schema)",
    wisp: { kind: "yes" },
    copilotKit: { kind: "partial", note: "useCopilotAction + Zod" },
    assistantUi: { kind: "no", note: "UI only" },
    diy: { kind: "partial", note: "you write it" },
  },
  {
    feature: "Hand-rolled streaming (no Vercel AI SDK dep)",
    wisp: { kind: "yes" },
    copilotKit: { kind: "no" },
    assistantUi: { kind: "no" },
    diy: { kind: "yes" },
  },
  {
    feature: "OpenAI + Anthropic, one interface",
    wisp: { kind: "yes" },
    copilotKit: { kind: "yes" },
    assistantUi: { kind: "partial", note: "via your adapter" },
    diy: { kind: "no" },
  },
  {
    feature: "Theme via CSS variables (no Tailwind required)",
    wisp: { kind: "yes" },
    copilotKit: { kind: "partial", note: "CSS-in-JS" },
    assistantUi: { kind: "yes" },
    diy: { kind: "no" },
  },
  {
    feature: "Steps to ship",
    wisp: { kind: "text", note: "3 files" },
    copilotKit: { kind: "text", note: "5+ files" },
    assistantUi: { kind: "text", note: "8+ files" },
    diy: { kind: "text", note: "weeks" },
  },
  {
    feature: "Bundle size (react package)",
    wisp: { kind: "text", note: "~12 kB gz" },
    copilotKit: { kind: "text", note: "~85 kB gz" },
    assistantUi: { kind: "text", note: "~40 kB gz" },
    diy: { kind: "text", note: "varies" },
  },
]

const COLUMNS = [
  { key: "wisp" as const, label: "wisp", highlight: true },
  { key: "copilotKit" as const, label: "CopilotKit", highlight: false },
  { key: "assistantUi" as const, label: "assistant-ui", highlight: false },
  { key: "diy" as const, label: "Roll your own", highlight: false },
]

export function Comparison() {
  return (
    <section id="comparison" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeader
            eyebrow="Compared"
            title={
              <>
                Honest about the{" "}
                <span className="text-muted-foreground">trade-offs.</span>
              </>
            }
            description="Each library makes different choices. Here's how wisp stacks up against the alternatives — calling out where they shine, too."
          />
        </Reveal>

        <Reveal delay={120}>
          <div className="border-border/70 bg-card/40 ring-primary-soft/30 mt-14 overflow-hidden rounded-2xl border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-border/60 bg-muted/30 border-b">
                    <th
                      scope="col"
                      className="text-muted-foreground px-5 py-4 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Feature
                    </th>
                    {COLUMNS.map((col) => (
                      <th
                        key={col.key}
                        scope="col"
                        className={cn(
                          "px-5 py-4 text-left text-xs font-semibold tracking-wider uppercase",
                          col.highlight
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                      >
                        {col.label}
                        {col.highlight && (
                          <span className="bg-primary/15 text-primary ml-2 inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-medium tracking-widest uppercase">
                            this site
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row, idx) => (
                    <tr
                      key={row.feature}
                      className={cn(
                        "border-border/40 border-b last:border-0",
                        idx % 2 === 1 && "bg-muted/15"
                      )}
                    >
                      <th
                        scope="row"
                        className="text-foreground/85 px-5 py-4 text-left text-sm font-medium"
                      >
                        {row.feature}
                      </th>
                      {COLUMNS.map((col) => (
                        <td
                          key={col.key}
                          className={cn(
                            "px-5 py-4 align-top",
                            col.highlight && "bg-primary/5"
                          )}
                        >
                          <CellView cell={row[col.key]} highlighted={col.highlight} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function CellView({ cell, highlighted }: { cell: Cell; highlighted: boolean }) {
  if (cell.kind === "yes") {
    return (
      <span className="inline-flex items-center gap-2">
        <span
          className={cn(
            "inline-flex size-5 items-center justify-center rounded-full",
            highlighted ? "bg-primary text-primary-foreground" : "bg-primary/15 text-primary"
          )}
        >
          <HugeiconsIcon icon={Tick02Icon} size={12} strokeWidth={3} />
        </span>
        {cell.note && (
          <span className="text-muted-foreground text-xs">{cell.note}</span>
        )}
      </span>
    )
  }
  if (cell.kind === "no") {
    return (
      <span className="inline-flex items-center gap-2">
        <span className="text-muted-foreground/70 bg-muted inline-flex size-5 items-center justify-center rounded-full">
          <HugeiconsIcon icon={Cancel01Icon} size={12} strokeWidth={2.4} />
        </span>
        {cell.note && (
          <span className="text-muted-foreground text-xs">{cell.note}</span>
        )}
      </span>
    )
  }
  if (cell.kind === "partial") {
    return (
      <span className="text-muted-foreground inline-flex items-center gap-2 text-xs">
        <span className="bg-amber-400/20 text-amber-700 dark:text-amber-300 inline-flex size-5 items-center justify-center rounded-full text-[10px] font-bold">
          ~
        </span>
        {cell.note}
      </span>
    )
  }
  return <span className="text-foreground/80 text-xs font-medium">{cell.note}</span>
}
