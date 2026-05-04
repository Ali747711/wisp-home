import { BrowserRouter, Routes, Route } from "react-router-dom"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { LandingPage } from "@/pages/LandingPage"
import { ChangelogPage } from "@/pages/ChangelogPage"

export function App() {
  return (
    <BrowserRouter>
      <TooltipProvider delayDuration={150}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
        </Routes>
        <Toaster position="bottom-right" richColors closeButton />
      </TooltipProvider>
    </BrowserRouter>
  )
}

export default App
