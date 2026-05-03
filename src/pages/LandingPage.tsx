import { Nav } from "@/components/landing/Nav"
import { Hero } from "@/components/landing/Hero"
import { LogoCloud } from "@/components/landing/LogoCloud"
import { BentoFeatures } from "@/components/landing/BentoFeatures"
import { LiveDemo } from "@/components/landing/LiveDemo"
import { Quickstart } from "@/components/landing/Quickstart"
import { StatsBar } from "@/components/landing/StatsBar"
import { Comparison } from "@/components/landing/Comparison"
import { AuthorNote } from "@/components/landing/AuthorNote"
import { Faq } from "@/components/landing/Faq"
import { CtaSection } from "@/components/landing/CtaSection"
import { Footer } from "@/components/landing/Footer"
import { DemoBubbleProvider } from "@/components/landing/DemoBubble"

export function LandingPage() {
  return (
    <DemoBubbleProvider>
      <div id="top" className="relative">
        <Nav />
        <main>
          <Hero />
          <LogoCloud />
          <BentoFeatures />
          <LiveDemo />
          <Quickstart />
          <StatsBar />
          <Comparison />
          <AuthorNote />
          <Faq />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </DemoBubbleProvider>
  )
}
