import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

type CopyButtonProps = {
  value: string
  className?: string
  label?: string
}

export function CopyButton({ value, className, label = "Copy" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(() => () => {
    if (timer.current !== null) window.clearTimeout(timer.current)
  }, [])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      const preview =
        value.length > 60 ? value.slice(0, 57).trimEnd() + "…" : value
      toast.success("Copied to clipboard", {
        description: preview,
        duration: 2200,
      })
      if (timer.current !== null) window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 1600)
    } catch {
      toast.error("Couldn't access the clipboard")
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : label}
      className={cn(
        "group/copy relative inline-flex size-8 items-center justify-center rounded-md",
        "border-border/60 text-muted-foreground hover:text-foreground hover:bg-accent",
        "border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
        className
      )}
    >
      <HugeiconsIcon
        icon={copied ? Tick02Icon : Copy01Icon}
        size={16}
        strokeWidth={2}
        className={cn(
          "transition-all",
          copied ? "scale-110 text-primary" : "group-hover/copy:scale-105"
        )}
      />
      <span className="sr-only">{copied ? "Copied" : label}</span>
    </button>
  )
}
