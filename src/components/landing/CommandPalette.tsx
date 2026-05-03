import { useNavigate } from "react-router-dom"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  GithubIcon,
  Sun01Icon,
  Moon02Icon,
  PaintBoardIcon,
  CodeIcon,
  Layers01Icon,
  PuzzleIcon,
  FileQuestionMarkIcon,
  LinkSquare02Icon,
  Rocket01Icon,
  CommandIcon,
} from "@hugeicons/core-free-icons"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useTheme } from "@/components/theme-provider"

type CommandPaletteProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate()
  const { setTheme } = useTheme()

  function go(href: string) {
    onOpenChange(false)
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer")
      return
    }
    if (href.startsWith("#")) {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
      return
    }
    navigate(href)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Jump to a section, page, or action…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => go("#features")}>
            <HugeiconsIcon icon={PuzzleIcon} size={16} strokeWidth={2} />
            <span>Features</span>
          </CommandItem>
          <CommandItem onSelect={() => go("#demo")}>
            <HugeiconsIcon icon={Layers01Icon} size={16} strokeWidth={2} />
            <span>Live demo</span>
          </CommandItem>
          <CommandItem onSelect={() => go("#quickstart")}>
            <HugeiconsIcon icon={Rocket01Icon} size={16} strokeWidth={2} />
            <span>Quickstart</span>
          </CommandItem>
          <CommandItem onSelect={() => go("#comparison")}>
            <HugeiconsIcon icon={CodeIcon} size={16} strokeWidth={2} />
            <span>Comparison</span>
          </CommandItem>
          <CommandItem onSelect={() => go("#faq")}>
            <HugeiconsIcon
              icon={FileQuestionMarkIcon}
              size={16}
              strokeWidth={2}
            />
            <span>FAQ</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Pages">
          <CommandItem onSelect={() => go("/")}>
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={2} />
            <span>Home</span>
          </CommandItem>
          <CommandItem onSelect={() => go("/changelog")}>
            <HugeiconsIcon icon={CommandIcon} size={16} strokeWidth={2} />
            <span>Changelog</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              go("https://github.com/Ali747711/wisp-web-ai-agent-integration")
            }
          >
            <HugeiconsIcon icon={GithubIcon} size={16} strokeWidth={2} />
            <span>GitHub repository</span>
            <CommandShortcut>
              <HugeiconsIcon
                icon={LinkSquare02Icon}
                size={12}
                strokeWidth={2}
              />
            </CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => go("https://www.npmjs.com/package/@wisp/react")}
          >
            <HugeiconsIcon icon={LinkSquare02Icon} size={16} strokeWidth={2} />
            <span>npm package</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Theme">
          <CommandItem
            onSelect={() => {
              setTheme("light")
              onOpenChange(false)
            }}
          >
            <HugeiconsIcon icon={Sun01Icon} size={16} strokeWidth={2} />
            <span>Light mode</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setTheme("dark")
              onOpenChange(false)
            }}
          >
            <HugeiconsIcon icon={Moon02Icon} size={16} strokeWidth={2} />
            <span>Dark mode</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setTheme("system")
              onOpenChange(false)
            }}
          >
            <HugeiconsIcon icon={PaintBoardIcon} size={16} strokeWidth={2} />
            <span>Match system</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
