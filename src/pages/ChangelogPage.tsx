import { Nav } from "@/components/landing/Nav"
import { Footer } from "@/components/landing/Footer"
import { ChangelogTimeline } from "@/components/changelog/ChangelogTimeline"

export function ChangelogPage() {
  return (
    <div id="top" className="relative">
      <Nav />
      <main>
        <ChangelogTimeline />
      </main>
      <Footer />
    </div>
  )
}
