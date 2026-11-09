import React, { useState, Suspense } from "react";
import { EnquiryDialog } from "./components/EnquiryDialog";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import {
  Affiliations,
  Hero,
  InvitationBanner,
  JourneyProcess,
  Services,
} from "./components/HomeSections";
import { AboutIntroduction } from "./components/AboutIntroduction";
import { DestinationDiscovery } from "./components/DestinationDiscovery";
import { PackagesSection } from "./components/PackagesSection";
import { InstitutionalCorporateHighlight } from "./components/InstitutionalCorporateHighlight";
import { TravelLogisticsAssistance } from "./components/TravelLogisticsAssistance";
import { CateringShowcase } from "./components/CateringShowcase";
import { WhyUs } from "./components/WhyUs";
import { TravellerStories } from "./components/TravellerStories";
import { FloatingActions } from "./components/FloatingActions";
import { CustomCursor } from "./components/CustomCursor";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import { useLocale } from "./hooks/useLocale";
import { useScrollReveal } from "./hooks/useScrollReveal";
import type { ServiceId, SamplePackage, Destination } from "./types";

const ItineraryModal = React.lazy(() =>
  import("./components/ItineraryModal").then((m) => ({ default: m.ItineraryModal }))
);
const DestinationModal = React.lazy(() =>
  import("./components/DestinationModal").then((m) => ({ default: m.DestinationModal }))
);
const AdminDashboard = React.lazy(() =>
  import("./components/admin/AdminDashboard").then((m) => ({ default: m.AdminDashboard }))
);
const SchoolTripModal = React.lazy(() =>
  import("./components/SchoolTripModal").then((m) => ({ default: m.SchoolTripModal }))
);
const CorporateEventModal = React.lazy(() =>
  import("./components/CorporateEventModal").then((m) => ({ default: m.CorporateEventModal }))
);
const CateringModal = React.lazy(() =>
  import("./components/CateringModal").then((m) => ({ default: m.CateringModal }))
);

export default function App() {
  const { locale, setLocale } = useLocale();
  useScrollReveal();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [initialService, setInitialService] = useState<ServiceId | null>(null);
  const [initialDestination, setInitialDestination] = useState<string>("");
  const [selectedPackage, setSelectedPackage] = useState<SamplePackage | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [schoolTripOpen, setSchoolTripOpen] = useState(false);
  const [corporateModalOpen, setCorporateModalOpen] = useState(false);
  const [cateringModalOpen, setCateringModalOpen] = useState(false);

  function openEnquiry(service?: ServiceId | string, destName?: string) {
    setInitialService((service as ServiceId) ?? null);
    setInitialDestination(destName ?? "");
    setDialogOpen(true);
  }

  function handleServiceAction(serviceId?: ServiceId | string) {
    if (serviceId === "education" || serviceId === "educational") {
      setSchoolTripOpen(true);
    } else if (serviceId === "corporate") {
      setCorporateModalOpen(true);
    } else if (serviceId === "catering") {
      setCateringModalOpen(true);
    } else if (serviceId === "holidays") {
      const el = document.getElementById("packages");
      el?.scrollIntoView({ behavior: "smooth" });
    } else if (serviceId === "transport") {
      const el = document.getElementById("transport");
      el?.scrollIntoView({ behavior: "smooth" });
    } else if (serviceId === "visa") {
      const el = document.getElementById("travel-assistance");
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      openEnquiry(serviceId);
    }
  }

  function openPackageItinerary(pkg: SamplePackage) {
    setSelectedPackage(pkg);
  }

  function openDestinationDetails(dest: Destination) {
    setSelectedDestination(dest);
  }

  return (
    <div className={locale === "kn" ? "app font-kannada" : "app"}>
      {/* Luxury Interactive Elements from Vercel Edition */}
      <ScrollProgressBar />
      <CustomCursor />

      <a className="skip-link" href="#main">
        {locale === "en" ? "Skip to main content" : "ಮುಖ್ಯ ವಿಷಯಕ್ಕೆ ಹೋಗಿ"}
      </a>

      {/* 1. Header with Sticky Navigation & Dual Branding */}
      <Header locale={locale} setLocale={setLocale} onEnquire={openEnquiry} />

      <main id="main">
        {/* 2. Hero Section */}
        <Hero locale={locale} onEnquire={openEnquiry} />

        {/* 3. About Section (Image 5 Reference) */}
        <AboutIntroduction locale={locale} />

        {/* 4. Accreditations & Recognitions (Image 1 Reference) */}
        <Affiliations locale={locale} />

        {/* 5. All 6 Service Categories with Balanced Cards */}
        <Services locale={locale} onEnquire={handleServiceAction} />

        {/* 6. Destination Discovery (Image 4 Reference - 5-Tile Mosaic) */}
        <DestinationDiscovery
          locale={locale}
          onSelectDestination={openDestinationDetails}
          onEnquire={openEnquiry}
        />

        {/* 7. Curated Holiday Packages with Itinerary Modals */}
        <PackagesSection
          locale={locale}
          onEnquire={openEnquiry}
          onViewItinerary={openPackageItinerary}
        />

        {/* 8. Educational Study Tours & Corporate Offsites */}
        <InstitutionalCorporateHighlight
          language={locale}
          onOpenEducational={() => setSchoolTripOpen(true)}
          onOpenCorporate={() => setCorporateModalOpen(true)}
        />

        {/* 9. Audited Vehicle Fleet & Travel Assistance */}
        <TravelLogisticsAssistance
          language={locale}
          onOpenTransport={() => openEnquiry("transport")}
          onOpenVisaPassport={() => openEnquiry("visa")}
        />

        {/* 10. 100% Pure Vegetarian Catering Showcase (User Benchmark Reference) */}
        <CateringShowcase
          language={locale}
          onOpenCatering={() => setCateringModalOpen(true)}
        />

        {/* 11. Why Us / Personal Warmth (Image 3 Reference) */}
        <WhyUs locale={locale} />

        {/* 10. Mindful Planning Process */}
        <JourneyProcess locale={locale} />

        {/* 11. Customer Reflections / Stories */}
        <TravellerStories locale={locale} />

        {/* 12. Final Invitation Banner */}
        <InvitationBanner locale={locale} onEnquire={openEnquiry} />
      </main>

      {/* 13. Comprehensive 4-Column Directory Footer with Mysore Address & Staff Access */}
      <Footer
        locale={locale}
        setLocale={setLocale}
        onEnquire={openEnquiry}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* 14. Floating Scroll-to-Top Dock */}
      <FloatingActions locale={locale} onOpenEnquiry={() => openEnquiry()} />

      {/* 15. Universal Enquiry Dialog (Image 2 Reference - Large Bold Icon Stepper) */}
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

      {/* Specialized Interactive Modals (Preserved from Vercel Edition) */}
      <Suspense fallback={null}>
        {schoolTripOpen && (
          <SchoolTripModal
            isOpen={schoolTripOpen}
            language={locale}
            onClose={() => setSchoolTripOpen(false)}
          />
        )}
      </Suspense>

      <Suspense fallback={null}>
        {corporateModalOpen && (
          <CorporateEventModal
            isOpen={corporateModalOpen}
            language={locale}
            onClose={() => setCorporateModalOpen(false)}
          />
        )}
      </Suspense>

      <Suspense fallback={null}>
        {cateringModalOpen && (
          <CateringModal
            isOpen={cateringModalOpen}
            language={locale}
            onClose={() => setCateringModalOpen(false)}
          />
        )}
      </Suspense>

      {/* Lazy Modals */}
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

      <Suspense fallback={null}>
        {adminOpen && (
          <AdminDashboard
            isOpen={adminOpen}
            onClose={() => setAdminOpen(false)}
          />
        )}
      </Suspense>
    </div>
  );
}
