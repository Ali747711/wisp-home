import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, GithubIcon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Reveal } from "./Reveal"

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="bg-dotgrid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent_70%)] opacity-50"
      />
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute inset-x-0 bottom-0 h-[480px] [transform:scaleY(-1)]"
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span className="font-mono-tabular mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs tracking-widest text-primary uppercase">
              <span className="inline-block size-1.5 rounded-full bg-primary shadow-[0_0_8px_2px_color-mix(in_oklab,var(--primary)_55%,transparent)]" />
              v0.1.0 available now
            </span>

            <h2 className="max-w-3xl font-heading text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
              Ship your agent{" "}
              <span className="bg-linear-to-br from-primary to-foreground bg-clip-text text-transparent">
                today.
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              Five minutes from{" "}
              <span className="font-mono-tabular text-foreground">
                npm install
              </span>{" "}
              to a working agent in your app.
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="glow-primary group h-12 gap-2 rounded-full px-6 text-sm font-medium"
                asChild
              >
                <a href="#quickstart">
                  Read the quickstart
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={16}
                    strokeWidth={2.2}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 gap-2 rounded-full px-6 text-sm font-medium"
                asChild
              >
                <a
                  href="https://github.com/Ali747711/wisp-web-ai-agent-integration"
                  target="_blank"
                  rel="noreferrer"
                >
                  <HugeiconsIcon icon={GithubIcon} size={16} strokeWidth={2} />
                  Read the source
                </a>
              </Button>
            </div>
            <p className="mt-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="font-mono-tabular text-primary">$</span>
              <span className="font-mono-tabular">
                npm i @wisp/core @wisp/react @wisp/next
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
