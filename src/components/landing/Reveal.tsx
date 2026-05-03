import type { ReactNode, CSSProperties } from "react"
import { cn } from "@/lib/utils"
import { useReveal } from "@/hooks/use-reveal"

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  as?: "div" | "section" | "article"
}

export function Reveal({ children, className, delay = 0, as: As = "div" }: RevealProps) {
  const ref = useReveal<HTMLDivElement>()
  const style: CSSProperties = delay
    ? { transitionDelay: `${delay}ms` }
    : {}

  return (
    <As ref={ref as never} className={cn("reveal", className)} style={style}>
      {children}
    </As>
  )
}
