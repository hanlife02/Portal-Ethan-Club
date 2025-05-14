import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { PortalIntro } from "@/components/portal-intro"
import { ServiceGrid } from "@/components/service-grid"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 dark:from-navy-900 dark:to-purple-950">
      <Navbar />
      <Hero />
      <PortalIntro />
      <ServiceGrid />
      <Footer />
    </main>
  )
}
