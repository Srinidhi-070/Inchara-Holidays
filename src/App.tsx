import { useState } from "react";
import { EnquiryDialog } from "./components/EnquiryDialog";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import {
  Affiliations,
  CateringFeature,
  Hero,
  InvitationBanner,
  JourneyProcess,
  Services,
} from "./components/HomeSections";
import { PackagesSection } from "./components/PackagesSection";
import { DestinationsSection } from "./components/DestinationsSection";
import { TravellerStories } from "./components/TravellerStories";
import { ItineraryModal } from "./components/ItineraryModal";
import { useLocale } from "./hooks/useLocale";
import { useScrollReveal } from "./hooks/useScrollReveal";
import type { ServiceId, SamplePackage } from "./types";

export default function App() {
  const { locale, setLocale } = useLocale();
  useScrollReveal();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [initialService, setInitialService] = useState<ServiceId | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<SamplePackage | null>(null);

  function openEnquiry(service?: ServiceId) {
    setInitialService(service ?? null);
    setDialogOpen(true);
  }

  function openPackageItinerary(pkg: SamplePackage) {
    setSelectedPackage(pkg);
  }

  return (
    <div className={locale === "kn" ? "app font-kannada" : "app"}>
      <a className="skip-link" href="#main">
        {locale === "en" ? "Skip to main content" : "ಮುಖ್ಯ ವಿಷಯಕ್ಕೆ ಹೋಗಿ"}
      </a>
      
      <Header locale={locale} setLocale={setLocale} onEnquire={openEnquiry} />

      <main id="main">
        <Hero locale={locale} onEnquire={openEnquiry} />
        <Affiliations locale={locale} />
        <Services locale={locale} onEnquire={openEnquiry} />
        <PackagesSection
          locale={locale}
          onEnquire={openEnquiry}
          onViewItinerary={openPackageItinerary}
        />
        <DestinationsSection locale={locale} onEnquire={openEnquiry} />
        <CateringFeature locale={locale} onEnquire={openEnquiry} />
        <JourneyProcess locale={locale} />
        <TravellerStories locale={locale} />
        <InvitationBanner locale={locale} onEnquire={openEnquiry} />
      </main>

      <Footer locale={locale} setLocale={setLocale} onEnquire={openEnquiry} />

      <EnquiryDialog
        open={dialogOpen}
        locale={locale}
        initialService={initialService}
        onClose={() => setDialogOpen(false)}
      />

      <ItineraryModal
        pkg={selectedPackage}
        locale={locale}
        onClose={() => setSelectedPackage(null)}
        onPlan={() => openEnquiry("holidays")}
      />
    </div>
  );
}
