import React, { useState, Suspense } from "react";
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
import { useLocale } from "./hooks/useLocale";
import { useScrollReveal } from "./hooks/useScrollReveal";
import type { ServiceId, SamplePackage, Destination } from "./types";

const ItineraryModal = React.lazy(() =>
  import("./components/ItineraryModal").then((m) => ({ default: m.ItineraryModal }))
);
const DestinationModal = React.lazy(() =>
  import("./components/DestinationModal").then((m) => ({ default: m.DestinationModal }))
);

export default function App() {
  const { locale, setLocale } = useLocale();
  useScrollReveal();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [initialService, setInitialService] = useState<ServiceId | null>(null);
  const [initialDestination, setInitialDestination] = useState<string>("");
  const [selectedPackage, setSelectedPackage] = useState<SamplePackage | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  function openEnquiry(service?: ServiceId, destName?: string) {
    setInitialService(service ?? null);
    setInitialDestination(destName ?? "");
    setDialogOpen(true);
  }

  function openPackageItinerary(pkg: SamplePackage) {
    setSelectedPackage(pkg);
  }

  function openDestinationDetails(dest: Destination) {
    setSelectedDestination(dest);
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
        <DestinationsSection
          locale={locale}
          onEnquire={openEnquiry}
          onSelectDestination={openDestinationDetails}
        />
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
        initialDestination={initialDestination}
        onClose={() => {
          setDialogOpen(false);
          setInitialDestination("");
        }}
      />

      <Suspense fallback={null}>
        {selectedPackage && (
          <ItineraryModal
            pkg={selectedPackage}
            locale={locale}
            onClose={() => setSelectedPackage(null)}
            onPlan={() =>
              openEnquiry(
                "holidays",
                selectedPackage ? (locale === "kn" ? selectedPackage.titleKn : selectedPackage.titleEn) : undefined
              )
            }
          />
        )}
      </Suspense>

      <Suspense fallback={null}>
        {selectedDestination && (
          <DestinationModal
            destination={selectedDestination}
            language={locale}
            onClose={() => setSelectedDestination(null)}
            onPlanTrip={(destName) => {
              setSelectedDestination(null);
              openEnquiry("holidays", destName);
            }}
          />
        )}
      </Suspense>
    </div>
  );
}
