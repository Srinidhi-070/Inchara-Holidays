/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Language, Destination } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesDiscoverySection } from './components/ServicesDiscoverySection';
import { DestinationDiscovery } from './components/DestinationDiscovery';
import { DestinationModal } from './components/DestinationModal';
import { ExperiencesSection } from './components/ExperiencesSection';
import { HowItWorks } from './components/HowItWorks';
import { SignatureJourney } from './components/SignatureJourney';
import { WhyUs } from './components/WhyUs';
import { TravellerStories } from './components/TravellerStories';
import { OurStory } from './components/OurStory';
import { CtaInvitation } from './components/CtaInvitation';
import { Footer } from './components/Footer';
import { TripPlannerModal } from './components/TripPlannerModal';
import { CorporateEventModal } from './components/CorporateEventModal';
import { CateringModal } from './components/CateringModal';
import { SchoolTripModal } from './components/SchoolTripModal';
import { ContactModal } from './components/ContactModal';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { FloatingActions } from './components/FloatingActions';

export default function App() {
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
    <div className="min-h-screen bg-[#F6F3EA] text-[#252923] flex flex-col font-sans selection:bg-[#9E3D28]/20 selection:text-[#263F32]">
      {/* Scroll Progress Bar at the top of the viewport */}
      <ScrollProgressBar />

      {/* Dynamic Spring Custom Cursor (Active only on mouse/trackpad pointer devices) */}
      <CustomCursor />

      {/* Floating Action Button for Back to Top & Quick Planning */}
      <FloatingActions
        language={language}
        onOpenPlanner={() => handleOpenPlanner()}
      />

      {/* Top Navigation */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        onOpenPlanner={() => handleOpenPlanner()}
        onOpenContact={() => setContactOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-1">
        {/* Cinematic Hero */}
        <Hero
          language={language}
          onOpenPlanner={() => handleOpenPlanner()}
          onExploreDestinations={() => handleNavigateSection('services')}
        />

        {/* Flagship Services Discovery Section: Journeys, Corporate, Catering, School */}
        <ServicesDiscoverySection
          language={language}
          onOpenPlanner={(dest, exp) => handleOpenPlanner(dest, exp)}
          onOpenCorporateModal={() => setCorporateOpen(true)}
          onOpenCateringModal={() => setCateringOpen(true)}
          onOpenSchoolModal={() => setSchoolOpen(true)}
        />

        {/* Destination Discovery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <DestinationDiscovery
            language={language}
            onSelectDestination={setSelectedDestination}
            onOpenPlannerWithDest={(destName) => handleOpenPlanner(destName)}
          />
        </motion.div>

        {/* Travel Experiences */}
        <ExperiencesSection
          language={language}
          onOpenPlannerWithExperience={(expTitle) => handleOpenPlanner('', expTitle)}
        />

        {/* How Inchara Works */}
        <HowItWorks
          language={language}
          onOpenPlanner={() => handleOpenPlanner()}
        />

        {/* Signature Journey Showcase */}
        <SignatureJourney
          language={language}
          onPlanSignatureJourney={() =>
            handleOpenPlanner(
              language === 'kn'
                ? 'ಗೋಕರ್ಣ ಮತ್ತು ಮಲೆನಾಡು'
                : 'Gokarna & Malnad Haven'
            )
          }
        />

        {/* Why Travel With Us */}
        <WhyUs language={language} />

        {/* Traveller Reflections & Stories */}
        <TravellerStories language={language} />

        {/* Our Story */}
        <OurStory
          language={language}
          onOpenPlanner={() => handleOpenPlanner()}
        />

        {/* Final Emotional Invitation */}
        <CtaInvitation
          language={language}
          onOpenPlanner={() => handleOpenPlanner()}
          onOpenContact={() => setContactOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onLanguageChange={setLanguage}
        onNavigateSection={handleNavigateSection}
        onOpenPlanner={() => handleOpenPlanner()}
        onOpenContact={() => setContactOpen(true)}
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

      {/* Catering & Hospitality Request Modal */}
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
