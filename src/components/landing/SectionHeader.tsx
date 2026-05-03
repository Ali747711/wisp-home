import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type SectionHeaderProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: "left" | "center"
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="font-mono-tabular text-primary inline-flex items-center gap-2 text-xs tracking-widest uppercase">
          <span
            aria-hidden="true"
            className="bg-primary inline-block size-1.5 rounded-full shadow-[0_0_12px_2px_color-mix(in_oklab,var(--primary)_70%,transparent)]"
          />
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading max-w-3xl text-3xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground max-w-2xl text-base text-pretty sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
