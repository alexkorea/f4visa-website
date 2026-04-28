import { Header } from "@/components/header"
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/structured-data"
import { HeroSection } from "@/components/sections/hero"
import { MessengerContactSection } from "@/components/sections/messenger-contact"
import { CoreServicesSection } from "@/components/sections/core-services"
import { TeamSection } from "@/components/sections/team"
import { WhyUsSection } from "@/components/sections/why-us"
import { ProcessSection } from "@/components/sections/process"
import { ResourcesSection } from "@/components/sections/resources"
import { FinalCtaSection } from "@/components/sections/final-cta"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <MessengerContactSection />
        <TeamSection />
        <CoreServicesSection />
        <WhyUsSection />
        <ProcessSection />
        <ResourcesSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  )
}
