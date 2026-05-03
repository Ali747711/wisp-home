import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AgentProvider } from "@wisp/react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { LandingPage } from "@/pages/LandingPage"
import { ChangelogPage } from "@/pages/ChangelogPage"
import { mockAgentFetch } from "@/demo/mock-fetch"

export function App() {
  return (
    <BrowserRouter>
      <AgentProvider endpoint="/api/agent" fetch={mockAgentFetch}>
        <TooltipProvider delayDuration={150}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/changelog" element={<ChangelogPage />} />
          </Routes>
          <Toaster position="bottom-right" richColors closeButton />
        </TooltipProvider>
      </AgentProvider>
    </BrowserRouter>
  )
}

export default App
