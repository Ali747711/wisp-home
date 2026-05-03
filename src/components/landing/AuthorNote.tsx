import { HugeiconsIcon } from "@hugeicons/react"
import {
  GithubIcon,
  QuoteDownIcon,
  OpenSourceIcon,
} from "@hugeicons/core-free-icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Reveal } from "./Reveal"

export function AuthorNote() {
  return (
    <section id="author" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <div className="ring-primary-soft/30 surface-card relative overflow-hidden rounded-2xl border border-border/70 bg-card/40 p-8 sm:p-10">
            <span
              aria-hidden="true"
              className="absolute -top-4 -left-2 font-serif text-[120px] leading-none text-primary/15"
            >
              <HugeiconsIcon icon={QuoteDownIcon} size={56} strokeWidth={1.4} />
            </span>

            <p className="relative font-heading text-lg leading-relaxed text-foreground/90 sm:text-xl">
              I built wisp because I wanted to{" "}
              <span className="font-semibold text-foreground">
                actually understand
              </span>{" "}
              how agent SDKs work — streaming, tool-calling, and the whole
              orchestration loop. Not by reading source for an afternoon, but by
              writing it. If it ends up being your favorite way to drop an agent
              into React, that's a bonus. The real point is{" "}
              <span className="text-foreground italic">no magic</span> — every
              primitive in here is something you could read in an evening.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Avatar size="xl" className="border border-border/60">
                <AvatarImage src="/developer.jpeg" alt="Azamat Nabiev" />
                <AvatarFallback className="bg-primary/15 font-semibold text-primary">
                  AN
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  Azamat Nabiev
                </span>
                <span className="text-xs text-muted-foreground">
                  Author of wisp · solo maintainer
                </span>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <a
                  href="https://portfolio-nabiev-na.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border/60 px-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Avatar size="sm">
                    <AvatarImage src="/developer.jpeg" alt="Azamat Nabiev" />
                    <AvatarFallback>AN</AvatarFallback>
                  </Avatar>
                  Developer
                </a>
                <a
                  href="https://github.com/Ali747711/wisp-web-ai-agent-integration"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border/60 px-3 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <HugeiconsIcon icon={GithubIcon} size={12} strokeWidth={2} />
                  Follow
                </a>
                <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 text-xs font-medium text-primary">
                  <HugeiconsIcon
                    icon={OpenSourceIcon}
                    size={12}
                    strokeWidth={2}
                  />
                  Open source · MIT
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
