import { useEffect, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { GithubIcon, RssIcon } from "@hugeicons/core-free-icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty"
import { CHANGELOG } from "@/data/changelog"
import { Reveal } from "@/components/landing/Reveal"
import { TimelineEntry } from "./TimelineEntry"
import { cn } from "@/lib/utils"

export function ChangelogTimeline() {
  const entries = CHANGELOG
  const [activeId, setActiveId] = useState<string | null>(
    entries[0] ? `v${entries[0].version.replace(/^v/, "")}` : null
  )

  useEffect(() => {
    if (entries.length === 0) return
    const ids = entries.map((e) => `v${e.version.replace(/^v/, "")}`)
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [entries])

  return (
    <section className="relative pt-32 pb-24 sm:pt-36">
      <div
        aria-hidden="true"
        className="bg-dotgrid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent_70%)] opacity-40"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <header className="mx-auto max-w-2xl text-center">
            <span className="font-mono-tabular inline-flex items-center gap-2 text-xs tracking-widest text-primary uppercase">
              <span
                aria-hidden="true"
                className="inline-block size-1.5 rounded-full bg-primary shadow-[0_0_12px_2px_color-mix(in_oklab,var(--primary)_70%,transparent)]"
              />
              Changelog
            </span>
            <h1 className="mt-4 font-heading text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl">
              What's new in{" "}
              <span className="bg-linear-to-br from-primary to-foreground bg-clip-text text-transparent">
                wisp
              </span>
            </h1>
            <p className="mt-5 text-base text-muted-foreground sm:text-lg">
              Every release, with every Added · Changed · Fixed · Removed —
              honest about what landed and when.
            </p>
            <div className="mt-6 inline-flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                asChild
              >
                <a
                  href="https://github.com/Ali747711/wisp-web-ai-agent-integration/releases.atom"
                  target="_blank"
                  rel="noreferrer"
                >
                  <HugeiconsIcon icon={RssIcon} size={14} strokeWidth={2} />
                  Subscribe via RSS
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                asChild
              >
                <a
                  href="https://github.com/Ali747711/wisp-web-ai-agent-integration/releases"
                  target="_blank"
                  rel="noreferrer"
                >
                  <HugeiconsIcon icon={GithubIcon} size={14} strokeWidth={2} />
                  GitHub releases
                </a>
              </Button>
            </div>
          </header>
        </Reveal>

        {entries.length === 0 ? (
          <div className="mt-20">
            <Empty className="mx-auto max-w-md rounded-2xl border border-border/70 bg-card/40 p-10">
              <EmptyHeader>
                <EmptyTitle>No releases yet</EmptyTitle>
                <EmptyDescription>
                  The first version of wisp is on the way. Check back soon.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        ) : (
          <div className="mt-16 grid gap-10 lg:grid-cols-[200px_minmax(0,1fr)] lg:items-start lg:gap-12">
            <aside className="lg:sticky lg:top-24">
              <p className="font-mono-tabular text-xs tracking-widest text-foreground uppercase">
                Versions
              </p>
              <ScrollArea className="mt-3 max-h-[60vh]">
                <ol className="flex flex-col gap-1">
                  {entries.map((e) => {
                    const id = `v${e.version.replace(/^v/, "")}`
                    const isActive = activeId === id
                    return (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          className={cn(
                            "group/link flex flex-col gap-0.5 border-l py-2 pl-4 text-sm transition-colors hover:border-primary/40 hover:text-foreground",
                            isActive
                              ? "border-primary text-foreground"
                              : "border-border/40 text-muted-foreground"
                          )}
                        >
                          <span className="font-mono-tabular text-xs">
                            {e.version}
                          </span>
                          <span className="truncate text-[11px] text-muted-foreground/70">
                            {e.headline}
                          </span>
                        </a>
                      </li>
                    )
                  })}
                </ol>
              </ScrollArea>
              <div className="mt-4 hidden lg:block">
                <Badge
                  variant="outline"
                  className="font-mono-tabular rounded-full border-primary/30 bg-primary/10 px-2 py-0 text-[10px] tracking-widest text-primary uppercase"
                >
                  Latest · {entries[0].version}
                </Badge>
              </div>
            </aside>

            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute top-0 bottom-0 left-3 w-px bg-gradient-to-b from-primary/30 via-border to-transparent sm:left-5"
              />

              <div className="flex flex-col">
                {entries.map((entry, idx) => (
                  <Reveal key={entry.version} delay={idx === 0 ? 0 : 60}>
                    <TimelineEntry entry={entry} isLatest={idx === 0} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
