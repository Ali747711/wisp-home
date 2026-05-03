import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import {
  getHighlighter,
  SHIKI_THEME_DARK,
  SHIKI_THEME_LIGHT,
  type CodeLang,
} from "@/lib/highlighter"
import { CopyButton } from "./CopyButton"

type CodeBlockProps = {
  code: string
  lang?: CodeLang
  filename?: string
  showCopy?: boolean
  showTrafficLights?: boolean
  className?: string
  /** Visible padding inside the <pre>. Defaults to comfortable. */
  density?: "comfortable" | "compact"
}

export function CodeBlock({
  code,
  lang = "tsx",
  filename,
  showCopy = true,
  showTrafficLights = false,
  className,
  density = "comfortable",
}: CodeBlockProps) {
  const trimmed = code.replace(/\n+$/, "")
  const [html, setHtml] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    getHighlighter().then((hl) => {
      if (cancelled) return
      const out = hl.codeToHtml(trimmed, {
        lang,
        themes: { light: SHIKI_THEME_LIGHT, dark: SHIKI_THEME_DARK },
        defaultColor: false,
      })
      setHtml(out)
    })
    return () => {
      cancelled = true
    }
  }, [trimmed, lang])

  return (
    <div
      className={cn(
        "border-border/70 bg-card/60 group/code relative overflow-hidden rounded-xl border shadow-[0_1px_0_0_color-mix(in_oklab,var(--foreground)_4%,transparent)_inset]",
        "ring-primary-soft/40",
        className
      )}
    >
      {(filename || showTrafficLights || showCopy) && (
        <div
          className={cn(
            "border-border/60 bg-muted/40 flex items-center gap-3 border-b px-4",
            density === "compact" ? "py-2" : "py-2.5"
          )}
        >
          {showTrafficLights && (
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-[#fc615d]" aria-hidden="true" />
              <span className="size-2.5 rounded-full bg-[#fdbc40]" aria-hidden="true" />
              <span className="size-2.5 rounded-full bg-[#34c749]" aria-hidden="true" />
            </div>
          )}
          {filename && (
            <span className="font-mono-tabular text-muted-foreground truncate text-xs">
              {filename}
            </span>
          )}
          {showCopy && (
            <div className="ml-auto">
              <CopyButton value={trimmed} />
            </div>
          )}
        </div>
      )}

      <div className="relative">
        {html ? (
          <div
            className={cn(
              "shiki-host overflow-x-auto text-[13px] leading-relaxed",
              density === "compact" ? "[&_pre]:py-3" : "[&_pre]:py-4",
              "[&_pre]:px-4 [&_pre]:bg-transparent! [&_code]:bg-transparent!"
            )}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre
            className={cn(
              "font-mono-tabular text-foreground/90 overflow-x-auto text-[13px] leading-relaxed",
              density === "compact" ? "px-4 py-3" : "px-4 py-4"
            )}
            aria-busy="true"
          >
            <code>{trimmed}</code>
          </pre>
        )}
      </div>
    </div>
  )
}
