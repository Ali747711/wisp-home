import { Link } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import { GithubIcon, NpmIcon } from "@hugeicons/core-free-icons"
import { Separator } from "@/components/ui/separator"
import { Wordmark } from "./Wordmark"

type FooterColumn = {
  heading: string
  links: { label: string; href: string; external?: boolean }[]
}

const COLUMNS: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Live demo", href: "/#demo" },
      { label: "Quickstart", href: "/#quickstart" },
      { label: "Comparison", href: "/#comparison" },
      { label: "Why wisp", href: "/#why" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Docs", href: "https://docs.wisp.dev", external: true },
      { label: "Changelog", href: "/changelog" },
      { label: "FAQ", href: "/#faq" },
      {
        label: "GitHub",
        href: "https://github.com/Ali747711/wisp-web-ai-agent-integration",
        external: true,
      },
      {
        label: "Portfolio",
        href: "https://portfolio-nabiev-na.vercel.app/",
        external: true,
      },
    ],
  },
  {
    heading: "Install",
    links: [
      {
        label: "npm",
        href: "https://www.npmjs.com/package/@wisp/react",
        external: true,
      },
      {
        label: "@wisp/core",
        href: "https://www.npmjs.com/package/@wisp/core",
        external: true,
      },
      {
        label: "@wisp/react",
        href: "https://www.npmjs.com/package/@wisp/react",
        external: true,
      },
      {
        label: "@wisp/next",
        href: "https://www.npmjs.com/package/@wisp/next",
        external: true,
      },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-muted/15">
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,1fr))]">
          <div className="flex flex-col gap-4">
            <Link to="/" aria-label="wisp home">
              <Wordmark />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              A drop-in agent SDK for React and Next.js. Type-safe commands,
              streaming UI, no glue code.
            </p>
            <div className="inline-flex w-fit items-center gap-3 rounded-lg border border-border/60 bg-card/40 px-3 py-2">
              <span className="font-mono-tabular text-xs text-primary">$</span>
              <span className="font-mono-tabular text-xs text-foreground/85">
                npm i @wisp/react
              </span>
            </div>
            <div className="mt-2 inline-flex items-center gap-2 text-[11px] text-muted-foreground">
              <span
                aria-hidden="true"
                className="inline-block size-1.5 rounded-full bg-primary shadow-[0_0_6px_2px_color-mix(in_oklab,var(--primary)_50%,transparent)]"
              />
              <span className="font-mono-tabular tracking-wider uppercase">
                v0.1.0 · MIT licensed
              </span>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <p className="font-mono-tabular text-xs tracking-widest text-foreground uppercase">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink {...link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mt-12 bg-border/60" />

        <div className="mt-6 flex flex-col items-start justify-between gap-4 text-xs sm:flex-row sm:items-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} wisp · Made by{" "}
            <a
              href="https://portfolio-nabiev-na.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:text-foreground hover:underline"
            >
              Azamat Nabiev
            </a>
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Ali747711/wisp-web-ai-agent-integration"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <HugeiconsIcon icon={GithubIcon} size={14} strokeWidth={2} />
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/@wisp/react"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <HugeiconsIcon icon={NpmIcon} size={14} strokeWidth={2} />
              npm
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({
  label,
  href,
  external,
}: {
  label: string
  href: string
  external?: boolean
}) {
  if (external || href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {label}
        <span className="text-[10px] text-muted-foreground/50">↗</span>
      </a>
    )
  }
  if (href.startsWith("/#")) {
    return (
      <a
        href={href}
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {label}
      </a>
    )
  }
  return (
    <Link
      to={href}
      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      {label}
    </Link>
  )
}
