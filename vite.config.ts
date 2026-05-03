import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// `@wisp/react` is symlinked from the workspace and its dist imports
// transitive deps (`@wisp/core`, `lucide-react`, `zustand/vanilla`,
// `zod-to-json-schema`). When Vite optimizes through the symlink it walks
// up from the source location and can't see this app's node_modules.
// We pin every shared dep — and React itself — to the website copy so
// there's exactly one React instance in the page.
const websiteRoot = __dirname
const websiteModules = path.resolve(websiteRoot, "node_modules")

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(websiteRoot, "./src"),
      react: path.resolve(websiteModules, "react"),
      "react-dom": path.resolve(websiteModules, "react-dom"),
      "react/jsx-runtime": path.resolve(
        websiteModules,
        "react/jsx-runtime.js"
      ),
      "react/jsx-dev-runtime": path.resolve(
        websiteModules,
        "react/jsx-dev-runtime.js"
      ),
      "@radix-ui/react-dialog": path.resolve(
        websiteModules,
        "@radix-ui/react-dialog"
      ),
      "@wisp/core": path.resolve(websiteModules, "@wisp/core"),
      "lucide-react": path.resolve(websiteModules, "lucide-react"),
      "zustand/vanilla": path.resolve(
        websiteModules,
        "zustand/esm/vanilla.mjs"
      ),
      "zod-to-json-schema": path.resolve(
        websiteModules,
        "zod-to-json-schema"
      ),
      zod: path.resolve(websiteModules, "zod"),
    },
    dedupe: [
      "react",
      "react-dom",
      "@radix-ui/react-dialog",
      "@wisp/core",
      "@wisp/react",
      "zod",
    ],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "@radix-ui/react-dialog"],
    exclude: ["@wisp/react", "@wisp/core"],
  },
})
