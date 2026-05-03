import { useState } from "react"
import { cn } from "@/lib/utils"
import { CopyButton } from "./CopyButton"

type Manager = "pnpm" | "npm" | "yarn" | "bun"

const STORAGE_KEY = "wisp:pkg-manager"
const PACKAGES = "@wisp/core @wisp/react @wisp/next zod"

const COMMANDS: Record<Manager, string> = {
  pnpm: `pnpm add ${PACKAGES}`,
  npm: `npm install ${PACKAGES}`,
  yarn: `yarn add ${PACKAGES}`,
  bun: `bun add ${PACKAGES}`,
}

const TABS: Manager[] = ["pnpm", "npm", "yarn", "bun"]

function isManager(value: string | null): value is Manager {
  return value === "pnpm" || value === "npm" || value === "yarn" || value === "bun"
}

type InstallTabsProps = {
  className?: string
}

function readStoredManager(): Manager {
  if (typeof window === "undefined") return "pnpm"
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (isManager(stored)) return stored
  } catch {
    /* ignore */
  }
  return "pnpm"
}

export function InstallTabs({ className }: InstallTabsProps) {
  const [active, setActive] = useState<Manager>(readStoredManager)

  function handleSelect(next: Manager) {
    setActive(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }

  const command = COMMANDS[active]

  return (
    <div
      className={cn(
        "border-border/70 bg-card/70 ring-primary-soft/40 group/install relative overflow-hidden rounded-xl border shadow-[0_1px_0_0_color-mix(in_oklab,var(--foreground)_4%,transparent)_inset]",
        className
      )}
    >
      <div
        role="tablist"
        aria-label="Package manager"
        className="border-border/60 bg-muted/40 flex items-center gap-0.5 border-b px-2 py-1.5"
      >
        {TABS.map((m) => {
          const isActive = m === active
          return (
            <button
              key={m}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => handleSelect(m)}
              className={cn(
                "font-mono-tabular relative rounded-md px-2.5 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {m}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="bg-background ring-border/60 absolute inset-0 -z-10 rounded-md ring-1"
                />
              )}
            </button>
          )
        })}
        <div className="ml-auto">
          <CopyButton value={command} className="size-7" />
        </div>
      </div>
      <pre className="font-mono-tabular overflow-x-auto px-4 py-4 text-[13px] leading-relaxed">
        <code>
          <span className="text-muted-foreground select-none">$ </span>
          <span className="text-foreground">{command}</span>
        </code>
      </pre>
    </div>
  )
}
