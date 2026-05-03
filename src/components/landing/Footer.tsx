import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  GithubIcon,
  NpmIcon,
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Reveal } from "./Reveal"
import { Wordmark } from "./Wordmark"

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t pt-24 sm:pt-32">
      <div
        aria-hidden="true"
        className="bg-dotgrid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_100%,black,transparent_70%)] opacity-50"
      />
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute inset-x-0 bottom-0 h-[420px] [transform:scaleY(-1)]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <h2 className="font-heading max-w-3xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
              Ship your agent{" "}
              <span className="from-primary to-foreground bg-linear-to-br bg-clip-text text-transparent">
                today.
              </span>
            </h2>
            <p className="text-muted-foreground mt-6 max-w-xl text-base sm:text-lg">
              Five minutes from <span className="font-mono-tabular">npm install</span> to a
              working agent in your app.
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
                  href="https://github.com/azamat/wisp"
                  target="_blank"
                  rel="noreferrer"
                >
                  <HugeiconsIcon icon={GithubIcon} size={16} strokeWidth={2} />
                  Star on GitHub
                </a>
              </Button>
            </div>
          </div>
        </Reveal>

        <Separator className="bg-border/60 mt-24" />

        <div className="flex flex-col items-start justify-between gap-8 py-10 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-2">
            <Wordmark />
            <p className="text-muted-foreground text-xs">
              MIT licensed · Made by{" "}
              <a
                href="https://github.com/azamat"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground underline-offset-4 hover:underline"
              >
                Azamat Nabiev
              </a>
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <a
              href="/docs"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs
            </a>
            <a
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#quickstart"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Quickstart
            </a>
            <a
              href="https://github.com/azamat/wisp"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
            >
              <HugeiconsIcon icon={GithubIcon} size={14} strokeWidth={2} />
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/@wisp/react"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
            >
              <HugeiconsIcon icon={NpmIcon} size={14} strokeWidth={2} />
              npm
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
