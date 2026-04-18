import { CentersSection } from "./_components/home/CentersSection";
import { ComplianceStrip } from "./_components/home/ComplianceStrip";
import { EcosystemSection } from "./_components/home/EcosystemSection";
import { HeroSection } from "./_components/home/HeroSection";
import { SiteFooter } from "./_components/home/SiteFooter";
import { SiteHeader } from "./_components/home/SiteHeader";
import { SpecialistsSection } from "./_components/home/SpecialistsSection";
import { TechnologySection } from "./_components/home/TechnologySection";
import { TestimonialsAppointmentSection } from "./_components/home/TestimonialsAppointmentSection";
import { TrustBar } from "./_components/home/TrustBar";
import {
  centerCards,
  ecosystemCards,
  institutionLogos,
  navItems,
  specialistCards,
  technologyCards,
  testimonials,
} from "./_components/home/data";

export default function HomePage() {
  return (
    <main className="bg-(--ca-page-bg) text-(--ca-text)">
      <SiteHeader navItems={navItems} />
      <HeroSection />
      <TrustBar logos={institutionLogos} />
      <EcosystemSection cards={ecosystemCards} />
      <CentersSection cards={centerCards} />
      <SpecialistsSection cards={specialistCards} />
      <TechnologySection cards={technologyCards} />
      <ComplianceStrip />
      <TestimonialsAppointmentSection testimonials={testimonials} />
      <SiteFooter />
    </main>
  );
}
