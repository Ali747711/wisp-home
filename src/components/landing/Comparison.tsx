import { HugeiconsIcon } from "@hugeicons/react"
import {
  Tick02Icon,
  Cancel01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons"
import { SectionHeader } from "./SectionHeader"
import { Reveal } from "./Reveal"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type Cell =
  | { kind: "yes"; note?: string }
  | { kind: "no"; note?: string }
  | { kind: "partial"; note: string }
  | { kind: "text"; note: string }

type Row = {
  feature: string
  why: string
  wisp: Cell
  copilotKit: Cell
  assistantUi: Cell
  diy: Cell
}

const ROWS: Row[] = [
  {
    feature: "Type-safe commands (Zod → JSON Schema)",
    why: "Catches bad LLM arguments at runtime and gives you full TS inference inside handlers.",
    wisp: { kind: "yes" },
    copilotKit: { kind: "partial", note: "useCopilotAction + Zod" },
    assistantUi: { kind: "no", note: "UI only" },
    diy: { kind: "partial", note: "you write it" },
  },
  {
    feature: "Hand-rolled streaming (no Vercel AI SDK dep)",
    why: "Keeps the dep tree small and means SSE behaviour is debuggable end-to-end.",
    wisp: { kind: "yes" },
    copilotKit: { kind: "no" },
    assistantUi: { kind: "no" },
    diy: { kind: "yes" },
  },
  {
    feature: "OpenAI + Anthropic, one interface",
    why: "Switch providers in one config line — same streaming + tool-calling shape.",
    wisp: { kind: "yes" },
    copilotKit: { kind: "yes" },
    assistantUi: { kind: "partial", note: "via your adapter" },
    diy: { kind: "no" },
  },
  {
    feature: "Theme via CSS variables (no Tailwind required)",
    why: "Drop-in for any React app. Your users don't inherit our build system.",
    wisp: { kind: "yes" },
    copilotKit: { kind: "partial", note: "CSS-in-JS" },
    assistantUi: { kind: "yes" },
    diy: { kind: "no" },
  },
  {
    feature: "Steps to ship",
    why: "Files you'll touch from `npm install` to a working agent in your app.",
    wisp: { kind: "text", note: "3 files" },
    copilotKit: { kind: "text", note: "5+ files" },
    assistantUi: { kind: "text", note: "8+ files" },
    diy: { kind: "text", note: "weeks" },
  },
  {
    feature: "Bundle size (react package)",
    why: "Includes the provider, hooks, and default UI. Measured with rollup-plugin-visualizer.",
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
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
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
            <Table className="text-sm">
              <TableHeader>
                <TableRow className="border-border/60 bg-muted/30 hover:bg-muted/30">
                  <TableHead
                    scope="col"
                    className="text-muted-foreground sticky left-0 z-10 bg-muted/30 px-5 py-4 text-left text-xs font-medium uppercase tracking-wider min-w-[260px]"
                  >
                    Feature
                  </TableHead>
                  {COLUMNS.map((col) => (
                    <TableHead
                      key={col.key}
                      scope="col"
                      className={cn(
                        "px-5 py-4 text-left text-xs font-semibold tracking-wider uppercase",
                        col.highlight ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      <span className="inline-flex items-center gap-2">
                        {col.label}
                        {col.highlight && (
                          <Badge
                            variant="secondary"
                            className="bg-primary/15 text-primary rounded-full px-1.5 py-0 text-[9px] tracking-widest uppercase"
                          >
                            this site
                          </Badge>
                        )}
                      </span>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {ROWS.map((row, idx) => (
                  <TableRow
                    key={row.feature}
                    className={cn(
                      "border-border/40 hover:bg-muted/20",
                      idx % 2 === 1 && "bg-muted/15"
                    )}
                  >
                    <TableCell
                      scope="row"
                      className={cn(
                        "text-foreground/85 sticky left-0 px-5 py-4 text-left text-sm font-medium whitespace-normal min-w-[260px]",
                        idx % 2 === 1 ? "bg-muted/15" : "bg-background"
                      )}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        {row.feature}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              aria-label={`Why ${row.feature}`}
                              className="text-muted-foreground/50 hover:text-foreground transition-colors"
                            >
                              <HugeiconsIcon
                                icon={InformationCircleIcon}
                                size={13}
                                strokeWidth={2}
                              />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            sideOffset={6}
                            className="max-w-[260px] text-xs leading-snug"
                          >
                            {row.why}
                          </TooltipContent>
                        </Tooltip>
                      </span>
                    </TableCell>
                    {COLUMNS.map((col) => (
                      <TableCell
                        key={col.key}
                        className={cn(
                          "px-5 py-4 align-middle whitespace-normal",
                          col.highlight && "bg-primary/5"
                        )}
                      >
                        <CellView cell={row[col.key]} highlighted={col.highlight} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
            highlighted
              ? "bg-primary text-primary-foreground"
              : "bg-primary/15 text-primary"
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
  return (
    <span className="text-foreground/85 font-mono-tabular text-xs font-medium">
      {cell.note}
    </span>
  )
}
