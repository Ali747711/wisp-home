import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  GithubIcon,
  Menu01Icon,
  Search01Icon,
  ArrowRight01Icon,
  CodeIcon,
  Layers01Icon,
  PuzzleIcon,
  Rocket01Icon,
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "./ThemeToggle"
import { Wordmark } from "./Wordmark"
import { CommandPalette } from "./CommandPalette"
import { cn } from "@/lib/utils"

type ProductLink = {
  href: string
  label: string
  description: string
  icon: typeof PuzzleIcon
}

const PRODUCT_LINKS: ProductLink[] = [
  {
    href: "/#features",
    label: "Features",
    description: "Type-safe commands, drop-in UI, agnostic streaming.",
    icon: PuzzleIcon,
  },
  {
    href: "/#demo",
    label: "Live demo",
    description: "Try the agent bubble in a fake task-manager app.",
    icon: Layers01Icon,
  },
  {
    href: "/#comparison",
    label: "Comparison",
    description: "How wisp compares to CopilotKit, AssistantUI, and DIY.",
    icon: CodeIcon,
  },
  {
    href: "/#quickstart",
    label: "Quickstart",
    description: "Three files, five minutes, working agent.",
    icon: Rocket01Icon,
  },
]

const PAGE_LINKS = [
  { href: "/#quickstart", label: "Quickstart" },
  { href: "/changelog", label: "Changelog" },
  { href: "https://docs.wisp.dev", label: "Docs", external: true },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [isMac] = useState(() => {
    if (typeof window === "undefined") return true
    return /Mac|iPhone|iPad|iPod/i.test(navigator.platform)
  })
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      setScrolled(y > 8)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, y / max) : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const meta = e.metaKey || e.ctrlKey
      if (meta && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  function handleAnchorNav(href: string) {
    setSheetOpen(false)
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer")
      return
    }
    if (href.startsWith("/#")) {
      const hash = href.slice(1)
      if (location.pathname !== "/") {
        navigate("/" + hash)
        return
      }
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
      return
    }
    navigate(href)
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all",
          scrolled
            ? "border-b border-border/60 bg-background/75 backdrop-blur-xl"
            : "border-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
          <Link
            to="/"
            aria-label="wisp home"
            className="inline-flex items-center gap-2"
          >
            <Wordmark />
            <Badge
              variant="outline"
              className="font-mono-tabular hidden rounded-full border-border/60 px-1.5 py-0 text-[10px] tracking-widest text-muted-foreground uppercase sm:inline-flex"
            >
              v0.1.0
            </Badge>
          </Link>

          <NavigationMenu className="ml-2 hidden md:block" viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-auto rounded-full bg-transparent px-3 py-1.5 text-sm font-normal text-muted-foreground hover:bg-accent hover:text-foreground data-[state=open]:bg-accent">
                  Product
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-2 md:w-[460px]">
                  <ul className="grid grid-cols-2 gap-1">
                    {PRODUCT_LINKS.map((link) => (
                      <li key={link.href}>
                        <button
                          type="button"
                          onClick={() => handleAnchorNav(link.href)}
                          className="group flex w-full flex-col gap-1 rounded-md p-3 text-left transition-colors hover:bg-accent focus:outline-none focus-visible:bg-accent"
                        >
                          <span className="flex items-center gap-2 text-sm font-medium">
                            <span className="flex size-6 items-center justify-center rounded-md border border-border/60 bg-card text-primary">
                              <HugeiconsIcon
                                icon={link.icon}
                                size={12}
                                strokeWidth={2}
                              />
                            </span>
                            {link.label}
                          </span>
                          <span className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                            {link.description}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {PAGE_LINKS.map((link) =>
                link.external ? (
                  <NavigationMenuItem key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={link.href}>
                    <button
                      type="button"
                      onClick={() => handleAnchorNav(link.href)}
                      className="inline-flex items-center rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      {link.label}
                    </button>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command palette"
              className="hidden h-9 items-center gap-2 rounded-full border border-border/60 pr-1.5 pl-3 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:inline-flex"
            >
              <HugeiconsIcon icon={Search01Icon} size={14} strokeWidth={2} />
              <span className="hidden lg:inline">Search</span>
              <kbd className="font-mono-tabular inline-flex items-center gap-0.5 rounded-md border border-border/80 bg-muted/60 px-1.5 py-0.5 text-[10px] tracking-wider text-muted-foreground">
                {isMac ? "⌘" : "Ctrl"}
                <span>K</span>
              </kbd>
            </button>

            <a
              href="https://github.com/Ali747711/wisp-web-ai-agent-integration"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hidden size-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:inline-flex"
            >
              <HugeiconsIcon icon={GithubIcon} size={16} strokeWidth={2} />
            </a>

            <ThemeToggle className="hidden sm:inline-flex" />

            <Button
              size="sm"
              onClick={() => handleAnchorNav("/#quickstart")}
              className="hidden h-9 gap-1 rounded-full px-4 text-sm font-medium sm:inline-flex"
            >
              Get started
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={14}
                strokeWidth={2.2}
              />
            </Button>

            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open menu"
                  className="inline-flex size-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:hidden"
                >
                  <HugeiconsIcon icon={Menu01Icon} size={18} strokeWidth={2} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[88%] max-w-sm p-0">
                <SheetHeader className="border-b">
                  <SheetTitle className="flex items-center gap-2 text-base">
                    <Wordmark />
                    <Badge
                      variant="outline"
                      className="font-mono-tabular text-[10px]"
                    >
                      v0.1.0
                    </Badge>
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Site navigation
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-1 p-4">
                  <p className="font-mono-tabular mb-1 px-2 text-[10px] tracking-widest text-muted-foreground uppercase">
                    Product
                  </p>
                  {PRODUCT_LINKS.map((link) => (
                    <button
                      key={link.href}
                      type="button"
                      onClick={() => handleAnchorNav(link.href)}
                      className="flex items-center gap-3 rounded-md px-2 py-2.5 text-left text-sm hover:bg-accent"
                    >
                      <span className="flex size-7 items-center justify-center rounded-md border border-border/60 bg-card text-primary">
                        <HugeiconsIcon
                          icon={link.icon}
                          size={14}
                          strokeWidth={2}
                        />
                      </span>
                      <span className="flex flex-col">
                        <span className="font-medium">{link.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {link.description}
                        </span>
                      </span>
                    </button>
                  ))}
                  <Separator className="my-3" />
                  <p className="font-mono-tabular mb-1 px-2 text-[10px] tracking-widest text-muted-foreground uppercase">
                    Pages
                  </p>
                  {PAGE_LINKS.map((link) => (
                    <button
                      key={link.href}
                      type="button"
                      onClick={() => handleAnchorNav(link.href)}
                      className="rounded-md px-2 py-2.5 text-left text-sm hover:bg-accent"
                    >
                      {link.label}
                      {link.external && (
                        <span className="ml-1 text-[10px] text-muted-foreground">
                          ↗
                        </span>
                      )}
                    </button>
                  ))}
                  <Separator className="my-3" />
                  <div className="flex items-center gap-2 px-2">
                    <a
                      href="https://github.com/Ali747711/wisp-web-ai-agent-integration"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className="inline-flex size-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      <HugeiconsIcon
                        icon={GithubIcon}
                        size={16}
                        strokeWidth={2}
                      />
                    </a>
                    <ThemeToggle />
                    <button
                      type="button"
                      onClick={() => {
                        setSheetOpen(false)
                        setTimeout(() => setPaletteOpen(true), 100)
                      }}
                      className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-full border border-border/60 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      <HugeiconsIcon
                        icon={Search01Icon}
                        size={14}
                        strokeWidth={2}
                      />
                      Search
                    </button>
                  </div>
                  <Button
                    onClick={() => handleAnchorNav("/#quickstart")}
                    className="mt-3 h-10 gap-1 rounded-full"
                  >
                    Get started
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      size={14}
                      strokeWidth={2.2}
                    />
                  </Button>
                  <p className="mt-4 inline-flex items-center gap-1.5 px-2 text-[10px] text-muted-foreground">
                    <HugeiconsIcon icon={CodeIcon} size={12} strokeWidth={2} />
                    Open source · MIT licensed
                  </p>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px overflow-hidden"
        >
          <div
            className="h-full origin-left bg-primary transition-transform duration-150 ease-out"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </header>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  )
}
