import type { HighlighterCore } from "shiki/core"

export type CodeLang = "tsx" | "ts" | "bash" | "json"

let highlighterPromise: Promise<HighlighterCore> | null = null

export function getHighlighter(): Promise<HighlighterCore> {
  if (highlighterPromise) return highlighterPromise

  highlighterPromise = (async () => {
    const [{ createHighlighterCore }, { createOnigurumaEngine }, githubLight, githubDark, tsx, ts, bash, json] =
      await Promise.all([
        import("shiki/core"),
        import("shiki/engine/oniguruma"),
        import("@shikijs/themes/github-light"),
        import("@shikijs/themes/github-dark"),
        import("@shikijs/langs/tsx"),
        import("@shikijs/langs/typescript"),
        import("@shikijs/langs/bash"),
        import("@shikijs/langs/json"),
      ])

    return createHighlighterCore({
      themes: [githubLight.default, githubDark.default],
      langs: [tsx.default, ts.default, bash.default, json.default],
      engine: createOnigurumaEngine(import("shiki/wasm")),
    })
  })()

  return highlighterPromise
}

export const SHIKI_THEME_LIGHT = "github-light"
export const SHIKI_THEME_DARK = "github-dark"
