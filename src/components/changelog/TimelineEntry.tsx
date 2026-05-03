import { HugeiconsIcon } from "@hugeicons/react"
import {
  PlusSignIcon,
  Exchange01Icon,
  Tick02Icon,
  MinusSignIcon,
  LinkSquare02Icon,
} from "@hugeicons/core-free-icons"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ChangelogEntry, ReleaseKind } from "@/data/changelog"

const KIND_LABEL: Record<ReleaseKind, string> = {
  initial: "Initial",
  major: "Major",
  minor: "Minor",
  patch: "Patch",
}

const CHANGE_META = {
  added: {
    label: "Added",
    icon: PlusSignIcon,
    cls: "text-primary border-primary/30 bg-primary/10",
  },
  changed: {
    label: "Changed",
    icon: Exchange01Icon,
    cls: "text-amber-700 dark:text-amber-300 border-amber-400/30 bg-amber-400/10",
  },
  fixed: {
    label: "Fixed",
    icon: Tick02Icon,
    cls: "text-emerald-700 dark:text-emerald-300 border-emerald-400/30 bg-emerald-400/10",
  },
  removed: {
    label: "Removed",
    icon: MinusSignIcon,
    cls: "text-rose-700 dark:text-rose-300 border-rose-400/30 bg-rose-400/10",
  },
} as const

type Props = {
  entry: ChangelogEntry
  isLatest: boolean
}

export function TimelineEntry({ entry, isLatest }: Props) {
  const grouped = entry.changes.reduce<Record<string, string[]>>((acc, c) => {
    if (!acc[c.kind]) acc[c.kind] = []
    acc[c.kind].push(c.text)
    return acc
  }, {})

  const date = new Date(entry.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  const kindGroups = ["added", "changed", "fixed", "removed"] as const

  return (
    <article
      id={`v${entry.version.replace(/^v/, "")}`}
      className="group/entry relative pl-12 sm:pl-16 scroll-mt-28 pb-14 last:pb-0"
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-3 top-2 z-10 inline-flex size-4 items-center justify-center rounded-full border-2 transition-transform sm:left-5",
          isLatest
            ? "border-primary/40 bg-primary shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_18%,transparent),0_0_24px_4px_color-mix(in_oklab,var(--primary)_40%,transparent)]"
            : "border-border bg-background"
        )}
      >
        {isLatest && (
          <span className="bg-primary-foreground/80 absolute inline-block size-1.5 rounded-full" />
        )}
      </span>

      <div className="border-border/70 bg-card/40 ring-primary-soft/20 surface-card relative overflow-hidden rounded-2xl border p-6 transition-all hover:border-primary/30">
        <header className="flex flex-wrap items-center gap-3">
          <h2 className="font-heading text-foreground text-2xl font-bold tracking-tight">
            {entry.version}
          </h2>
          <Badge
            variant="outline"
            className={cn(
              "font-mono-tabular border-border/60 text-muted-foreground rounded-full px-2 py-0 text-[10px] tracking-widest uppercase",
              entry.kind === "initial" && "border-primary/40 text-primary bg-primary/10",
              entry.kind === "major" && "border-rose-400/40 text-rose-700 dark:text-rose-300 bg-rose-400/10",
              entry.kind === "minor" && "border-primary/30 text-primary bg-primary/10",
              entry.kind === "patch" && "border-border/60 text-muted-foreground"
            )}
          >
            {KIND_LABEL[entry.kind]}
          </Badge>
          <span className="text-muted-foreground font-mono-tabular ml-auto text-xs">
            {date}
          </span>
        </header>

        <h3 className="font-heading text-foreground mt-3 text-lg font-semibold tracking-tight">
          {entry.headline}
        </h3>

        {entry.description && (
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {entry.description}
          </p>
        )}

        <div className="mt-5 flex flex-col gap-4">
          {kindGroups.map((kind) => {
            const items = grouped[kind]
            if (!items || items.length === 0) return null
            const meta = CHANGE_META[kind]
            return (
              <div key={kind}>
                <p
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-mono-tabular tracking-widest uppercase",
                    meta.cls
                  )}
                >
                  <HugeiconsIcon icon={meta.icon} size={10} strokeWidth={2.4} />
                  {meta.label}
                </p>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {items.map((text, i) => (
                    <li
                      key={i}
                      className="text-foreground/85 flex items-start gap-2.5 text-sm leading-relaxed"
                    >
                      <span
                        aria-hidden="true"
                        className="text-muted-foreground/50 mt-2 inline-block size-1 shrink-0 rounded-full bg-current"
                      />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {entry.commitUrl && (
          <a
            href={entry.commitUrl}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground mt-6 inline-flex items-center gap-1.5 text-xs transition-colors"
          >
            View release on GitHub
            <HugeiconsIcon icon={LinkSquare02Icon} size={12} strokeWidth={2} />
          </a>
        )}
      </div>
    </article>
  )
}
