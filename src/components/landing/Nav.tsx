import { useEffect, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { GithubIcon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "./ThemeToggle"
import { Wordmark } from "./Wordmark"
import { cn } from "@/lib/utils"

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#quickstart", label: "Quickstart" },
  { href: "/docs", label: "Docs" },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all",
        scrolled
          ? "border-border/60 bg-background/70 border-b backdrop-blur-md"
          : "border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-6">
        <a href="#top" aria-label="wisp home" className="inline-flex items-center gap-2">
          <Wordmark />
          <Badge
            variant="outline"
            className="border-border/60 text-muted-foreground hidden font-mono-tabular rounded-full px-1.5 py-0 text-[10px] tracking-widest uppercase sm:inline-flex"
          >
            v0.1.0
          </Badge>
        </a>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-full px-3 py-1.5 text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-2">
          <a
            href="https://github.com/azamat/wisp"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="border-border/60 text-muted-foreground hover:text-foreground hover:bg-accent inline-flex size-9 items-center justify-center rounded-full border transition-colors"
          >
            <HugeiconsIcon icon={GithubIcon} size={16} strokeWidth={2} />
          </a>
          <ThemeToggle />
          <Button asChild size="sm" className="hidden rounded-full sm:inline-flex">
            <a href="#quickstart">Get started</a>
          </Button>
        </div>
      </div>
    </header>
  )
}
