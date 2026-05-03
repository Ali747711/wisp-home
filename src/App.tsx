import { AgentProvider } from "@wisp/react"
import { Nav } from "@/components/landing/Nav"
import { Hero } from "@/components/landing/Hero"
import { Features } from "@/components/landing/Features"
import { LiveDemo } from "@/components/landing/LiveDemo"
import { Quickstart } from "@/components/landing/Quickstart"
import { WhyWisp } from "@/components/landing/WhyWisp"
import { Comparison } from "@/components/landing/Comparison"
import { Faq } from "@/components/landing/Faq"
import { Footer } from "@/components/landing/Footer"
import { DemoBubbleProvider } from "@/components/landing/DemoBubble"
import { mockAgentFetch } from "@/demo/mock-fetch"

export function App() {
  return (
    <AgentProvider endpoint="/api/agent" fetch={mockAgentFetch}>
      <DemoBubbleProvider>
        <div id="top" className="relative">
          <Nav />
          <main>
            <Hero />
            <Features />
            <LiveDemo />
            <Quickstart />
            <WhyWisp />
            <Comparison />
            <Faq />
          </main>
          <Footer />
        </div>
      </DemoBubbleProvider>
    </AgentProvider>
  )
}

export default App
