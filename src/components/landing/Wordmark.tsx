import { cn } from "@/lib/utils"

type WordmarkProps = {
  className?: string
  showText?: boolean
}

export function Wordmark({ className, showText = true }: WordmarkProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        aria-hidden="true"
        className="relative inline-flex size-7 items-center justify-center"
      >
        <span className="bg-primary absolute inset-0 rounded-[8px] opacity-90 shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_55%,transparent),0_8px_24px_-6px_color-mix(in_oklab,var(--primary)_55%,transparent)]" />
        <span className="bg-foreground/85 dark:bg-background/90 relative size-2.5 rounded-full" />
      </span>
      {showText && (
        <span className="font-heading text-base font-semibold tracking-tight">
          wisp
        </span>
      )}
    </span>
  )
}
