/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language, Concept, Destination } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesDiscoverySection } from './components/ServicesDiscoverySection';
import { DestinationDiscovery } from './components/DestinationDiscovery';
import { DestinationModal } from './components/DestinationModal';
import { SignatureJourney } from './components/SignatureJourney';
import { OurStory } from './components/OurStory';
import { PlannerTeaser } from './components/PlannerTeaser';
import { TravellerStories } from './components/TravellerStories';
import { Footer } from './components/Footer';
import { ConceptSwitcher } from './components/ConceptSwitcher';
import { TripPlannerModal } from './components/TripPlannerModal';
import { CorporateEventModal } from './components/CorporateEventModal';
import { CateringModal } from './components/CateringModal';
import { SchoolTripModal } from './components/SchoolTripModal';
import { ContactModal } from './components/ContactModal';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { FloatingActions } from './components/FloatingActions';

export default function App() {
  const [concept, setConcept] = useState<Concept>('A');
  const [language, setLanguage] = useState<Language>('kn');
  const [plannerOpen, setPlannerOpen] = useState<boolean>(false);
  const [contactOpen, setContactOpen] = useState<boolean>(false);
  const [corporateOpen, setCorporateOpen] = useState<boolean>(false);
  const [cateringOpen, setCateringOpen] = useState<boolean>(false);
  const [schoolOpen, setSchoolOpen] = useState<boolean>(false);

  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [plannerInitialDest, setPlannerInitialDest] = useState<string>('');
  const [plannerInitialExp, setPlannerInitialExp] = useState<string>('');

  const handleOpenPlanner = (initialDest = '', initialExp = '') => {
    setPlannerInitialDest(initialDest);
    setPlannerInitialExp(initialExp);
    setPlannerOpen(true);
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
        onOpenPlanner={() => handleOpenPlanner()}
      />

      {/* Top Hero Section with Integrated Header */}
      <Hero
        concept={concept}
        language={language}
        onOpenPlanner={() => handleOpenPlanner()}
        onExploreDestinations={() => handleNavigateSection('destinations')}
        headerSlot={
          <Header
            concept={concept}
            language={language}
            onLanguageChange={setLanguage}
            onOpenPlanner={() => handleOpenPlanner()}
            onOpenContact={() => setContactOpen(true)}
            onNavigateSection={handleNavigateSection}
          />
        }
      />

      <main>
        {/* Asymmetrical 5-Tile Editorial Destination Discovery Grid */}
        <DestinationDiscovery
          language={language}
          onSelectDestination={setSelectedDestination}
          onOpenPlannerWithDest={(destName) => handleOpenPlanner(destName)}
        />

        {/* 4 Flagship Hospitality Modules: Curated Holidays, Corporate, 100% Pure Veg Catering, School Trips */}
        <ServicesDiscoverySection
          language={language}
          onOpenPlanner={(dest, exp) => handleOpenPlanner(dest, exp)}
          onOpenCorporateModal={() => setCorporateOpen(true)}
          onOpenCateringModal={() => setCateringOpen(true)}
          onOpenSchoolModal={() => setSchoolOpen(true)}
        />

        {/* Signature Journeys with Interactive Hover Thumbnails */}
        <SignatureJourney
          language={language}
          onPlanSignatureJourney={(journeyName) =>
            handleOpenPlanner(
              journeyName ||
                (language === 'kn'
                  ? 'ಗೋಕರ್ಣ ಮತ್ತು ಮಲೆನಾಡು'
                  : 'Gokarna & Malnad Haven')
            )
          }
        />

        {/* The Inchara Difference: Philosophy & Principles */}
        <OurStory
          language={language}
          onOpenPlanner={() => handleOpenPlanner()}
        />

        {/* Inline Step 01 Trip Planner Teaser Card */}
        <PlannerTeaser
          language={language}
          onOpenPlanner={(selectedRegion) => handleOpenPlanner(selectedRegion)}
        />

        {/* Traveller Reflections & Stories */}
        <TravellerStories language={language} />
      </main>

      {/* Full-bleed Invitation & 3-Column Directory Footer */}
      <Footer
        language={language}
        onLanguageChange={setLanguage}
        onNavigateSection={handleNavigateSection}
        onOpenPlanner={() => handleOpenPlanner()}
        onOpenContact={() => setContactOpen(true)}
        onOpenCorporate={() => setCorporateOpen(true)}
        onOpenCatering={() => setCateringOpen(true)}
        onOpenSchool={() => setSchoolOpen(true)}
      />

      {/* Destination Detail Modal */}
      <DestinationModal
        destination={selectedDestination}
        language={language}
        onClose={() => setSelectedDestination(null)}
        onPlanTrip={(destName) => handleOpenPlanner(destName)}
      />

      {/* Multi-Step Conversational Trip Planner Modal */}
      <TripPlannerModal
        isOpen={plannerOpen}
        language={language}
        initialDestination={plannerInitialDest}
        initialExperience={plannerInitialExp}
        onClose={() => setPlannerOpen(false)}
      />

      {/* Corporate Event & Team Outing Modal */}
      <CorporateEventModal
        isOpen={corporateOpen}
        language={language}
        onClose={() => setCorporateOpen(false)}
      />

      {/* 100% Pure Vegetarian Catering & Hospitality Request Modal */}
      <CateringModal
        isOpen={cateringOpen}
        language={language}
        onClose={() => setCateringOpen(false)}
      />

      {/* School Trips & Educational Expeditions Modal */}
      <SchoolTripModal
        isOpen={schoolOpen}
        language={language}
        onClose={() => setSchoolOpen(false)}
      />

      {/* General Contact & Enquiry Modal */}
      <ContactModal
        isOpen={contactOpen}
        language={language}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}
