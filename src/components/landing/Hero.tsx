import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  GithubIcon,
  StarsIcon,
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { InstallTabs } from "./InstallTabs"
import { Reveal } from "./Reveal"

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-28 lg:pt-40 lg:pb-32">
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px]"
      />
      <div
        aria-hidden="true"
        className="bg-dotgrid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent_70%)] opacity-60"
      />

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Badge
              variant="secondary"
              className="border-primary/25 bg-primary/10 text-primary-foreground dark:text-primary mb-6 gap-1.5 rounded-full border px-3 py-1 backdrop-blur"
            >
              <HugeiconsIcon icon={StarsIcon} size={14} strokeWidth={2} />
              <span className="font-mono-tabular tracking-wider uppercase">
                v0.1.0 · Now in beta
              </span>
            </Badge>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="font-heading max-w-4xl text-5xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl">
              Drop an{" "}
              <span className="relative inline-block">
                <span className="from-primary via-primary to-foreground bg-linear-to-br bg-clip-text text-transparent">
                  AI agent
                </span>
                <span
                  aria-hidden="true"
                  className="bg-primary/30 absolute inset-x-0 -bottom-1 h-3 -z-10 blur-md"
                />
              </span>{" "}
              into your app.
              <br className="hidden sm:block" />
              <span className="text-muted-foreground">In five minutes.</span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="text-muted-foreground mt-8 max-w-2xl text-lg text-pretty sm:text-xl">
              <span className="text-foreground">wisp</span> is a drop-in agent SDK for
              React and Next.js. Define your app's capabilities as type-safe commands —
              we handle streaming, tool-calling, and the UI.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="glow-primary group h-12 gap-2 rounded-full px-6 text-sm font-medium"
                asChild
              >
                <a href="#quickstart">
                  Get started
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
                  href="https://github.com/azamat/wisp"
                  target="_blank"
                  rel="noreferrer"
                >
                  <HugeiconsIcon icon={GithubIcon} size={16} strokeWidth={2} />
                  Star on GitHub
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-12 w-full max-w-xl">
              <InstallTabs />
            </div>
          </Reveal>

          <Reveal delay={380}>
            <p className="text-muted-foreground mt-6 text-xs">
              MIT licensed · ESM + CJS · ~12kb gzipped · TypeScript-first
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
