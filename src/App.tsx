/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense } from 'react';
import { Language, Concept, Destination } from './types';
import { ServiceCategoryId } from './types/inquiry';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutIntroduction } from './components/AboutIntroduction';
import { ServicesDiscoverySection } from './components/ServicesDiscoverySection';
import { DestinationDiscovery } from './components/DestinationDiscovery';
import { PackagesSection } from './components/PackagesSection';
import { InstitutionalCorporateHighlight } from './components/InstitutionalCorporateHighlight';
import { TravelLogisticsAssistance } from './components/TravelLogisticsAssistance';
import { CateringShowcase } from './components/CateringShowcase';
import { WhyUs } from './components/WhyUs';
import { HowItWorks } from './components/HowItWorks';
import { TravellerStories } from './components/TravellerStories';
import { CtaInvitation } from './components/CtaInvitation';
import { Footer } from './components/Footer';
import { ConceptSwitcher } from './components/ConceptSwitcher';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { FloatingActions } from './components/FloatingActions';
import { smoothScrollTo } from './utils/smoothScroll';

// Lazy-loaded Modals for optimal critical path and initial load speed
const UniversalEnquiryModal = React.lazy(() =>
  import('./components/UniversalEnquiryModal').then((m) => ({ default: m.UniversalEnquiryModal }))
);
const AdminDashboard = React.lazy(() =>
  import('./components/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard }))
);
const DestinationModal = React.lazy(() =>
  import('./components/DestinationModal').then((m) => ({ default: m.DestinationModal }))
);
const TripPlannerModal = React.lazy(() =>
  import('./components/TripPlannerModal').then((m) => ({ default: m.TripPlannerModal }))
);
const CorporateEventModal = React.lazy(() =>
  import('./components/CorporateEventModal').then((m) => ({ default: m.CorporateEventModal }))
);
const CateringModal = React.lazy(() =>
  import('./components/CateringModal').then((m) => ({ default: m.CateringModal }))
);
const SchoolTripModal = React.lazy(() =>
  import('./components/SchoolTripModal').then((m) => ({ default: m.SchoolTripModal }))
);
const ContactModal = React.lazy(() =>
  import('./components/ContactModal').then((m) => ({ default: m.ContactModal }))
);

export default function App() {
  const [concept, setConcept] = useState<Concept>('A');
  const [language, setLanguage] = useState<Language>('kn');

  // Universal Enquiry Modal State
  const [enquiryOpen, setEnquiryOpen] = useState<boolean>(false);
  const [enquiryCategory, setEnquiryCategory] = useState<ServiceCategoryId>('holidays');
  const [enquiryServiceType, setEnquiryServiceType] = useState<string>('');
  const [enquiryPayload, setEnquiryPayload] = useState<Record<string, any>>({});

  // Staff Admin Portal State
  const [adminOpen, setAdminOpen] = useState<boolean>(false);

  // Legacy modals state (preserved for backward compatibility and deep links)
  const [plannerOpen, setPlannerOpen] = useState<boolean>(false);
  const [contactOpen, setContactOpen] = useState<boolean>(false);
  const [corporateOpen, setCorporateOpen] = useState<boolean>(false);
  const [cateringOpen, setCateringOpen] = useState<boolean>(false);
  const [schoolOpen, setSchoolOpen] = useState<boolean>(false);

  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [plannerInitialDest, setPlannerInitialDest] = useState<string>('');
  const [plannerInitialExp, setPlannerInitialExp] = useState<string>('');

  const handleOpenEnquiry = (
    category: ServiceCategoryId = 'holidays',
    serviceType: string = '',
    payload: Record<string, any> = {}
  ) => {
    setEnquiryCategory(category);
    setEnquiryServiceType(serviceType);
    setEnquiryPayload(payload);
    setEnquiryOpen(true);
  };

  const handleOpenPlanner = (initialDest = '', initialExp = '') => {
    setPlannerInitialDest(initialDest);
    setPlannerInitialExp(initialExp);
    setPlannerOpen(true);
  };

  const handleNavigateSection = (sectionId: string) => {
    smoothScrollTo(sectionId);
  };

  return (
    <div
      className={`site min-h-screen concept-${concept.toLowerCase()} language-${language}`}
      lang={language === 'kn' ? 'kn' : 'en'}
    >
      {/* Scroll Progress Bar at the top of the viewport */}
      <ScrollProgressBar />

      {/* Dynamic Spring Custom Cursor (Active on non-touch pointer devices) */}
      <CustomCursor />

      {/* Interactive Concept Switcher Dock (Choose between 3 Art Directions: Luxury Edit, Travel Journal, Global Explorer) */}
      <ConceptSwitcher concept={concept} onChange={setConcept} />

      {/* Floating Action Button for Back to Top & Quick Planning */}
      <FloatingActions
        language={language}
        onOpenPlanner={() => handleOpenEnquiry('holidays')}
      />

      {/* 1. Existing brand-led hero with strong travel positioning + integrated Header */}
      <Hero
        concept={concept}
        language={language}
        onOpenPlanner={() => handleOpenEnquiry('holidays')}
        onExploreDestinations={() => handleNavigateSection('destinations')}
        headerSlot={
          <Header
            concept={concept}
            language={language}
            onLanguageChange={setLanguage}
            onOpenPlanner={() => handleOpenEnquiry('holidays')}
            onOpenEnquiry={handleOpenEnquiry}
            onOpenAdmin={() => setAdminOpen(true)}
            onOpenContact={() => setContactOpen(true)}
            onNavigateSection={handleNavigateSection}
          />
        }
      />

      <main>
        {/* 2. Short introduction to Inchara Holidays */}
        <AboutIntroduction
          language={language}
          onOpenPlanner={() => handleOpenEnquiry('holidays')}
          onExploreServices={() => handleNavigateSection('services')}
        />

        {/* 3. Six-category service discovery section */}
        <ServicesDiscoverySection
          language={language}
          onSelectCategory={(categoryId, subServiceId) =>
            handleOpenEnquiry(categoryId, subServiceId || '')
          }
        />

        {/* 4. Destination discovery (Asymmetrical editorial destination cards) */}
        <DestinationDiscovery
          language={language}
          onSelectDestination={setSelectedDestination}
          onOpenPlannerWithDest={(destName) =>
            handleOpenEnquiry('holidays', 'custom', { destinationInterest: destName })
          }
        />

        {/* 5. Packages section (Curated packages with filterable tabs) */}
        <PackagesSection
          language={language}
          onSelectPackage={(packageName) =>
            handleOpenEnquiry('holidays', 'pre_organised', { packageInterest: packageName })
          }
        />

        {/* 6. Institutional and corporate tours highlight */}
        <InstitutionalCorporateHighlight
          language={language}
          onOpenEducational={() => handleOpenEnquiry('educational')}
          onOpenCorporate={() => handleOpenEnquiry('corporate')}
        />

        {/* 7. Transportation and documentation assistance highlight */}
        <TravelLogisticsAssistance
          language={language}
          onOpenTransport={() => handleOpenEnquiry('transport')}
          onOpenVisaPassport={() => handleOpenEnquiry('visa_passport')}
        />

        {/* 8. Pure vegetarian catering showcase (100% Pure Veg Pankti Seva) */}
        <CateringShowcase
          language={language}
          onOpenCatering={() => handleOpenEnquiry('catering')}
        />

        {/* 9. Why Inchara Holidays (Core cultural differentiators) */}
        <WhyUs language={language} />

        {/* 10. How it works (3-step mindful itinerary journey) */}
        <HowItWorks
          language={language}
          onOpenPlanner={() => handleOpenEnquiry('holidays')}
        />

        {/* 11. Customer testimonials / trust markers */}
        <TravellerStories language={language} />

        {/* 12. Final enquiry CTA */}
        <CtaInvitation
          language={language}
          onOpenPlanner={() => handleOpenEnquiry('holidays')}
          onOpenContact={() => setContactOpen(true)}
        />
      </main>

      {/* 13. Comprehensive footer with all service categories linked & staff portal */}
      <Footer
        language={language}
        onLanguageChange={setLanguage}
        onNavigateSection={handleNavigateSection}
        onOpenPlanner={() => handleOpenEnquiry('holidays')}
        onOpenCategoryEnquiry={handleOpenEnquiry}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenContact={() => setContactOpen(true)}
        onOpenCorporate={() => handleOpenEnquiry('corporate')}
        onOpenCatering={() => handleOpenEnquiry('catering')}
        onOpenSchool={() => handleOpenEnquiry('educational')}
      />

      {/* Primary Universal Dynamic Enquiry Modal (All 6 Categories) */}
      <Suspense fallback={null}>
        {enquiryOpen && (
          <UniversalEnquiryModal
            isOpen={enquiryOpen}
            language={language}
            initialCategory={enquiryCategory}
            initialServiceType={enquiryServiceType}
            initialPayload={enquiryPayload}
            onClose={() => setEnquiryOpen(false)}
          />
        )}
      </Suspense>

      {/* Staff Admin Portal (Secured with credentials, metrics, search, filters & export) */}
      <Suspense fallback={null}>
        {adminOpen && (
          <AdminDashboard
            isOpen={adminOpen}
            onClose={() => setAdminOpen(false)}
          />
        )}
      </Suspense>

      {/* Destination Detail Modal */}
      <Suspense fallback={null}>
        {selectedDestination && (
          <DestinationModal
            destination={selectedDestination}
            language={language}
            onClose={() => setSelectedDestination(null)}
            onPlanTrip={(destName) =>
              handleOpenEnquiry('holidays', 'custom', { destinationInterest: destName })
            }
          />
        )}
      </Suspense>

      {/* Conversational Trip Planner Modal (Preserved legacy) */}
      <Suspense fallback={null}>
        {plannerOpen && (
          <TripPlannerModal
            isOpen={plannerOpen}
            language={language}
            initialDestination={plannerInitialDest}
            initialExperience={plannerInitialExp}
            onClose={() => setPlannerOpen(false)}
          />
        )}
      </Suspense>

      {/* Corporate Event & Team Outing Modal (Preserved legacy) */}
      <Suspense fallback={null}>
        {corporateOpen && (
          <CorporateEventModal
            isOpen={corporateOpen}
            language={language}
            onClose={() => setCorporateOpen(false)}
          />
        )}
      </Suspense>

      {/* 100% Pure Vegetarian Catering Modal (Preserved legacy) */}
      <Suspense fallback={null}>
        {cateringOpen && (
          <CateringModal
            isOpen={cateringOpen}
            language={language}
            onClose={() => setCateringOpen(false)}
          />
        )}
      </Suspense>

      {/* School Trips & Educational Expeditions Modal (Preserved legacy) */}
      <Suspense fallback={null}>
        {schoolOpen && (
          <SchoolTripModal
            isOpen={schoolOpen}
            language={language}
            onClose={() => setSchoolOpen(false)}
          />
        )}
      </Suspense>

      {/* General Contact & Direct Enquiry Modal (Preserved legacy) */}
      <Suspense fallback={null}>
        {contactOpen && (
          <ContactModal
            isOpen={contactOpen}
            language={language}
            onClose={() => setContactOpen(false)}
          />
        )}
      </Suspense>
    </div>
  );
}