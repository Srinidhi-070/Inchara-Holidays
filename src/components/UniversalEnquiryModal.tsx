/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../types';
import { ServiceCategoryId, CreateInquiryRequest, InquiryRecord } from '../types/inquiry';
import { serviceCategories, getCategoryById } from '../data/servicesData';
import { submitInquiry } from '../services/inquiryService';
import {
  X,
  Compass,
  GraduationCap,
  Briefcase,
  Bus,
  FileCheck,
  Utensils,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Phone,
  Mail,
  ArrowRight,
  ArrowUpRight,
  ShieldAlert,
  Loader2,
  Calendar,
  Users,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';
import { AmbariElephant, LotusIcon, SikkuKolamMandala } from './SouthIndianMotifs';

interface UniversalEnquiryModalProps {
  isOpen: boolean;
  language: Language;
  initialCategory?: ServiceCategoryId;
  initialServiceType?: string;
  initialPayload?: Record<string, any>;
  onClose: () => void;
}

export const UniversalEnquiryModal: React.FC<UniversalEnquiryModalProps> = ({
  isOpen,
  language,
  initialCategory = 'holidays',
  initialServiceType = '',
  initialPayload = {},
  onClose,
}) => {
  const kn = language === 'kn';

  // Active category & sub-service
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategoryId>(initialCategory);
  const [selectedSubService, setSelectedSubService] = useState<string>(initialServiceType);

  // Common customer fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'phone' | 'email'>('whatsapp');
  const [notes, setNotes] = useState('');
  const [city, setCity] = useState('');
  const [honeypot, setHoneypot] = useState('');

  // Category specific state
  // 1. Holidays
  const [holidayDest, setHolidayDest] = useState(initialPayload.destination || '');
  const [holidayScope, setHolidayScope] = useState<'domestic' | 'international' | 'both'>('domestic');
  const [holidayDeparture, setHolidayDeparture] = useState('Bengaluru');
  const [holidayDates, setHolidayDates] = useState('');
  const [holidayTravellers, setHolidayTravellers] = useState('2');
  const [holidayBudget, setHolidayBudget] = useState<'comfort' | 'premium' | 'curated_luxury'>('premium');

  // 2. Educational
  const [institutionName, setInstitutionName] = useState(initialPayload.institutionName || '');
  const [coordinatorRole, setCoordinatorRole] = useState('');
  const [studentCount, setStudentCount] = useState('45');
  const [gradeLevels, setGradeLevels] = useState('');
  const [eduDest, setEduDest] = useState('');
  const [eduDates, setEduDates] = useState('');
  const [eduPurpose, setEduPurpose] = useState('');

  // 3. Corporate
  const [orgName, setOrgName] = useState(initialPayload.organizationName || '');
  const [corpEventType, setCorpEventType] = useState('retreat');
  const [attendeeCount, setAttendeeCount] = useState('30');
  const [corpDest, setCorpDest] = useState('');
  const [corpDates, setCorpDates] = useState('');
  const [corpNeedsTransport, setCorpNeedsTransport] = useState(true);
  const [corpNeedsCatering, setCorpNeedsCatering] = useState(true);

  // 4. Transport
  const [vehicleType, setVehicleType] = useState('tempo_traveller');
  const [pickupCity, setPickupCity] = useState('Bengaluru');
  const [dropCity, setDropCity] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengerCount, setPassengerCount] = useState('12');

  // 5. Visa/Passport
  const [visaCountry, setVisaCountry] = useState('');
  const [visaType, setVisaType] = useState<'tourist' | 'business' | 'passport_fresh' | 'passport_renewal'>('tourist');
  const [applicantCount, setApplicantCount] = useState('1');

  // 6. Catering
  const [cateringOccasion, setCateringOccasion] = useState('family_function');
  const [cateringGuests, setCateringGuests] = useState('100');
  const [cateringDate, setCateringDate] = useState('');
  const [cateringVenue, setCateringVenue] = useState('Mysore');
  const [servingStyle, setServingStyle] = useState<'banana_leaf_pankti' | 'buffet'>('banana_leaf_pankti');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedInquiry, setSubmittedInquiry] = useState<InquiryRecord | null>(null);
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState('');

  // Sync props when modal re-opens
  useEffect(() => {
    if (isOpen) {
      setSelectedCategory(initialCategory);
      const cat = getCategoryById(initialCategory);
      setSelectedSubService(initialServiceType || cat?.services[0]?.id || '');
      setSubmitError(null);
      setSubmittedInquiry(null);

      if (initialPayload.destination) setHolidayDest(initialPayload.destination);
      if (initialPayload.organizationName) setOrgName(initialPayload.organizationName);
      if (initialPayload.institutionName) setInstitutionName(initialPayload.institutionName);
    }
  }, [isOpen, initialCategory, initialServiceType]);

  // Handle category change
  const handleCategorySelect = (catId: ServiceCategoryId) => {
    setSelectedCategory(catId);
    const cat = getCategoryById(catId);
    setSelectedSubService(cat?.services[0]?.id || '');
  };

  // Close with ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const activeCategoryDef = getCategoryById(selectedCategory);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Validation
    if (!fullName.trim()) {
      setSubmitError(kn ? 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.' : 'Please enter your full name.');
      return;
    }
    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    if (cleanPhone.length < 10) {
      setSubmitError(kn ? 'ದಯವಿಟ್ಟು ಕನಿಷ್ಠ ೧೦ ಅಂಕಿಗಳ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.' : 'Please enter a valid 10-digit mobile number.');
      return;
    }

    // Assemble category specific payload
    let servicePayload: Record<string, any> = {};

    switch (selectedCategory) {
      case 'holidays':
        servicePayload = {
          destination: holidayDest || 'General Itinerary Request',
          scope: holidayScope,
          departureCity: holidayDeparture,
          travelDates: holidayDates || 'Flexible / To be finalized',
          travellerCount: parseInt(holidayTravellers, 10) || 2,
          budgetTier: holidayBudget,
        };
        break;
      case 'educational':
        servicePayload = {
          institutionName: institutionName || 'School / College',
          contactPersonDesignation: coordinatorRole,
          studentCount: parseInt(studentCount, 10) || 45,
          gradeLevels,
          destination: eduDest || 'Recommended Study Circuit',
          visitPurpose: eduPurpose,
          preferredDates: eduDates,
        };
        break;
      case 'corporate':
        servicePayload = {
          organizationName: orgName || 'Corporate Entity',
          eventType: corpEventType,
          attendeeCount: parseInt(attendeeCount, 10) || 30,
          destinationPreference: corpDest || 'Resort near Bengaluru / Mysore',
          preferredDates: corpDates,
          transportRequired: corpNeedsTransport,
          cateringRequired: corpNeedsCatering,
        };
        break;
      case 'transport':
        servicePayload = {
          vehicleType,
          originCity: pickupCity,
          destinationCity: dropCity,
          journeyDate: travelDate,
          returnDate: returnDate || undefined,
          passengerCount: parseInt(passengerCount, 10) || 12,
        };
        break;
      case 'visa_passport':
        servicePayload = {
          destinationCountry: visaCountry || 'International Destination',
          assistanceType: visaType,
          applicantCount: parseInt(applicantCount, 10) || 1,
          noticeAcknowledged: true,
        };
        break;
      case 'catering':
        servicePayload = {
          occasionType: cateringOccasion,
          guestCount: parseInt(cateringGuests, 10) || 100,
          eventDate: cateringDate,
          venueLocation: cateringVenue,
          servingStyle,
          isPureVegetarian: true,
        };
        break;
    }

    const payload: CreateInquiryRequest = {
      customer: {
        fullName: fullName.trim(),
        phone: cleanPhone,
        email: email.trim() || undefined,
        city: city.trim() || undefined,
        preferredLanguage: language,
        preferredContactMethod: preferredContact,
        additionalRequirements: notes.trim() || undefined,
      },
      serviceCategory: selectedCategory,
      serviceType: selectedSubService || selectedCategory,
      servicePayload,
      honeypot,
    };

    setIsSubmitting(true);

    try {
      const response = await submitInquiry(payload);
      setSubmittedInquiry(response.inquiry);
      setWhatsappRedirectUrl(response.whatsappUrl);
    } catch (err: any) {
      setSubmitError(
        kn
          ? 'ವಿಚಾರಣೆ ದಾಖಲಿಸುವಲ್ಲಿ ಸಣ್ಣ ತಾಂತ್ರಿಕ ಅಡಚಣೆಯಾಗಿದೆ. ದಯವಿಟ್ಟು ನಮ್ಮ ವಾಟ್ಸಾಪ್‌ಗೆ ನೇರವಾಗಿ ಸಂದೇಶ ಕಳುಹಿಸಿ.'
          : 'Could not connect to service. Please reach us directly via WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryIcon = (id: ServiceCategoryId) => {
    switch (id) {
      case 'holidays': return <Compass className="w-5 h-5 text-[#D4AF37]" />;
      case 'educational': return <GraduationCap className="w-5 h-5 text-[#D4AF37]" />;
      case 'corporate': return <Briefcase className="w-5 h-5 text-[#D4AF37]" />;
      case 'transport': return <Bus className="w-5 h-5 text-[#D4AF37]" />;
      case 'visa_passport': return <FileCheck className="w-5 h-5 text-[#D4AF37]" />;
      case 'catering': return <Utensils className="w-5 h-5 text-[#D4AF37]" />;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0A1810]/80 backdrop-blur-md z-40"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-50 w-full max-w-3xl bg-[#FBF8F1] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#D4AF37]/35 overflow-hidden max-h-[92dvh] flex flex-col my-auto"
        >
          {/* Top Kasavu Gold Hairline */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent z-10" />

          {/* Modal Header */}
          <div className="p-5 sm:p-7 bg-[#162E22] text-[#F6F3EA] border-b border-[#D4AF37]/25 flex items-start justify-between relative overflow-hidden shrink-0">
            {/* Watermark Motif */}
            <div className="absolute right-12 -top-6 w-32 h-32 opacity-5 pointer-events-none text-[#D4AF37]">
              <SikkuKolamMandala className="w-full h-full" />
            </div>

            <div className="flex items-center gap-3.5 z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#263F32] border border-[#D4AF37]/40 flex items-center justify-center text-[#F5D77F] shadow-md">
                <AmbariElephant className="w-7 h-7 text-[#F5D77F]" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                  <LotusIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{kn ? 'ಇಂಚರ ಪ್ರವಾಸ & ಆತಿಥ್ಯ ಸೇವೆಗಳು' : 'Inchara Travel & Hospitality Services'}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-serif-editorial text-[#F6F3EA] tracking-tight">
                  {submittedInquiry
                    ? kn ? 'ವಿಚಾರಣೆ ದೃಢೀಕರಣ' : 'Inquiry Confirmation'
                    : kn ? 'ಸೇವಾ ವಿಚಾರಣೆ & ಸಮಾಲೋಚನೆ' : 'Service Consultation & Inquiry'}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F6F3EA] transition-colors cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1">
            {submittedInquiry ? (
              /* Success / Acknowledgment View */
              <div className="text-center py-6 sm:py-10 space-y-6">
                <div className="w-20 h-20 rounded-full bg-[#162E22] border-2 border-[#D4AF37] text-[#D4AF37] flex items-center justify-center mx-auto shadow-xl">
                  <CheckCircle2 className="w-10 h-10 text-[#F5D77F]" />
                </div>

                <div className="max-w-md mx-auto space-y-2">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-[#D4AF37]/15 text-[#9E3D28] text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/40">
                    {kn ? 'ವಿಚಾರಣೆ ರೆಫರೆನ್ಸ್ ಸಂಖ್ಯೆ' : 'Official Inquiry Reference'}
                  </span>
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-[#162E22] tracking-wider select-all">
                    {submittedInquiry.referenceNumber}
                  </div>
                  <p className="text-sm text-[#252923]/75 leading-relaxed pt-2">
                    {kn
                      ? `ಧನ್ಯವಾದಗಳು, ${submittedInquiry.customerName}! ನಿಮ್ಮ ವಿವರಗಳನ್ನು ನಾವು ಸ್ವೀಕರಿಸಿದ್ದೇವೆ. ನಮ್ಮ ಹಿರಿಯ ಪ್ರವಾಸ ಸಂಯೋಜಕರು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ ಸೂಕ್ತ ಪ್ರಸ್ತಾವನೆ ಮತ್ತು ದರ ಪಟ್ಟಿಯನ್ನು ಹಂಚಿಕೊಳ್ಳಲಿದ್ದಾರೆ.`
                      : `Thank you, ${submittedInquiry.customerName}! Your inquiry has been saved. Our senior travel coordinator will review your requirements and reach out to you shortly.`}
                  </p>
                </div>

                {/* Summary Card */}
                <div className="p-5 rounded-2xl bg-white border border-[#263F32]/15 text-left max-w-lg mx-auto shadow-sm space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#252923]/60 border-b border-[#263F32]/8 pb-2">
                    <span>{kn ? 'ಆಯ್ಕೆ ಮಾಡಿದ ಸೇವೆ' : 'Requested Service'}</span>
                    <span className="font-bold text-[#162E22] uppercase tracking-wide">
                      {submittedInquiry.serviceCategory} ({submittedInquiry.serviceType})
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#252923]/60 border-b border-[#263F32]/8 pb-2">
                    <span>{kn ? 'ಸಂಪರ್ಕ ದೂರವಾಣಿ' : 'Contact Phone'}</span>
                    <span className="font-semibold text-[#162E22] font-mono">{submittedInquiry.phone}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#252923]/60">
                    <span>{kn ? 'ನಿರೀಕ್ಷಿತ ಸ್ಪಂದನೆ ಸಮಯ' : 'Expected Response Window'}</span>
                    <span className="font-semibold text-[#9E3D28]">{kn ? '೨ ಗಂಟೆಗಳ ಒಳಗೆ (ಕೆಲಸದ ಅವಧಿ)' : 'Within 2 Hours (Business Hours)'}</span>
                  </div>
                </div>

                {/* Instant WhatsApp Connect Button */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
                  {whatsappRedirectUrl && (
                    <a
                      href={whatsappRedirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-white" />
                      <span>{kn ? 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಚರ್ಚಿಸಿ' : 'Discuss on WhatsApp Now'}</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#162E22] text-[#F5D77F] hover:bg-[#263F32] text-xs sm:text-sm font-semibold tracking-wide transition-all active:scale-95 cursor-pointer"
                  >
                    <span>{kn ? 'ಮುಕ್ತಾಯಗೊಳಿಸಿ' : 'Close'}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Active Form View */
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Category Selector Pills */}
                <div>
                  <label className="block text-xs font-bold text-[#162E22] uppercase tracking-wider mb-2.5">
                    {kn ? '೧. ಸೇವಾ ವಿಭಾಗ ಆಯ್ಕೆಮಾಡಿ' : '1. Select Service Category'} *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {serviceCategories.map((cat) => {
                      const isSelected = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleCategorySelect(cat.id)}
                          className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#162E22] text-[#F6F3EA] border-[#D4AF37] shadow-md'
                              : 'bg-white text-[#252923] border-[#263F32]/15 hover:border-[#D4AF37]/50'
                          }`}
                        >
                          <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? 'bg-white/10' : 'bg-[#F6F3EA]'}`}>
                            {getCategoryIcon(cat.id)}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm font-bold truncate">
                              {kn ? cat.titleKn.split(' ')[0] : cat.titleEn.split(' ')[0]}
                            </div>
                            <div className={`text-[10px] truncate ${isSelected ? 'text-[#D4AF37]' : 'text-[#252923]/60'}`}>
                              {kn ? cat.badgeKn : cat.badgeEn}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Specific Sub-Service Radio Selector */}
                {activeCategoryDef && activeCategoryDef.services.length > 0 && (
                  <div className="p-4 rounded-2xl bg-white border border-[#263F32]/12 space-y-2">
                    <label className="block text-xs font-bold text-[#162E22] uppercase tracking-wider mb-2">
                      {kn ? 'ನಿರ್ದಿಷ್ಟ ಸೇವಾ ಮಾದರಿ' : 'Specific Service Type'}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {activeCategoryDef.services.map((sub) => {
                        const isSubActive = selectedSubService === sub.id;
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => setSelectedSubService(sub.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                              isSubActive
                                ? 'bg-[#9E3D28] text-white border-[#9E3D28] shadow-xs'
                                : 'bg-[#F6F3EA] text-[#252923]/80 border-transparent hover:border-[#263F32]/20'
                            }`}
                          >
                            {kn ? sub.titleKn : sub.titleEn}
                          </button>
                        );
                      })}
                    </div>

                    {/* Assistance notice if applicable */}
                    {activeCategoryDef.services.find((s) => s.id === selectedSubService)?.inquiryNoticeEn && (
                      <div className="p-2.5 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs text-[#162E22] flex items-start gap-2 mt-2">
                        <AlertCircle className="w-4 h-4 text-[#9E3D28] shrink-0 mt-0.5" />
                        <span>
                          {kn
                            ? activeCategoryDef.services.find((s) => s.id === selectedSubService)?.inquiryNoticeKn
                            : activeCategoryDef.services.find((s) => s.id === selectedSubService)?.inquiryNoticeEn}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Dynamic Service-Specific Fields */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D4AF37]/35 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#9E3D28] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{kn ? '೨. ಸೇವೆಗೆ ಸಂಬಂಧಿಸಿದ ವಿವರಗಳು' : '2. Service Requirements & Preferences'}</span>
                  </div>

                  {/* HOLIDAYS SPECIFIC */}
                  {selectedCategory === 'holidays' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-[#162E22] mb-1">
                          {kn ? 'ಗಮ್ಯಸ್ಥಾನ / ಪ್ರವಾಸ ತಾಣ' : 'Destination / Circuit'} *
                        </label>
                        <input
                          type="text"
                          value={holidayDest}
                          onChange={(e) => setHolidayDest(e.target.value)}
                          placeholder={kn ? 'ಉದಾ: ಹಂಪಿ, ಬಾದಾಮಿ, ಕೂರ್ಗ್, ದುಬೈ' : 'e.g. Hampi, Coorg, Munnar, Bali'}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 bg-[#FBF8F1] text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#162E22] mb-1">
                          {kn ? 'ಪ್ರಯಾಣ ಆರಂಭಿಸುವ ಊರು' : 'Departure City'}
                        </label>
                        <input
                          type="text"
                          value={holidayDeparture}
                          onChange={(e) => setHolidayDeparture(e.target.value)}
                          placeholder="Bengaluru / Mysore"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 bg-[#FBF8F1] text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#162E22] mb-1">
                          {kn ? 'ಉದ್ದೇಶಿತ ದಿನಾಂಕಗಳು / ತಿಂಗಳು' : 'Proposed Dates / Month'}
                        </label>
                        <input
                          type="text"
                          value={holidayDates}
                          onChange={(e) => setHolidayDates(e.target.value)}
                          placeholder={kn ? 'ಉದಾ: ನವೆಂಬರ್ ೨೦-೨೪' : 'e.g. Nov 20-25 or Mid-December'}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 bg-[#FBF8F1] text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#162E22] mb-1">
                          {kn ? 'ಪ್ರಯಾಣಿಕರ ಸಂಖ್ಯೆ' : 'Traveller Count'}
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="200"
                          value={holidayTravellers}
                          onChange={(e) => setHolidayTravellers(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 bg-[#FBF8F1] text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                        />
                      </div>
                    </div>
                  )}

                  {/* EDUCATIONAL SPECIFIC */}
                  {selectedCategory === 'educational' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-[#162E22] mb-1">
                          {kn ? 'ಶಾಲೆ / ಕಾಲೇಜು ಸಂಸ್ಥೆಯ ಹೆಸರು' : 'Institution / College Name'} *
                        </label>
                        <input
                          type="text"
                          value={institutionName}
                          onChange={(e) => setInstitutionName(e.target.value)}
                          placeholder={kn ? 'ಉದಾ: ರಾಷ್ಟ್ರೀಯ ವಿದ್ಯಾಲಯ, ಬೆಂಗಳೂರು' : 'e.g. National College, Bangalore'}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 bg-[#FBF8F1] text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#162E22] mb-1">
                          {kn ? 'ಸಂಯೋಜಕರ ಹುದ್ದೆ' : 'Coordinator Role / Department'}
                        </label>
                        <input
                          type="text"
                          value={coordinatorRole}
                          onChange={(e) => setCoordinatorRole(e.target.value)}
                          placeholder="Principal / HOD / Tour In-Charge"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 bg-[#FBF8F1] text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#162E22] mb-1">
                          {kn ? 'ವಿದ್ಯಾರ್ಥಿಗಳ ಸಂಖ್ಯೆ' : 'Estimated Student Count'}
                        </label>
                        <input
                          type="number"
                          value={studentCount}
                          onChange={(e) => setStudentCount(e.target.value)}
                          placeholder="45"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 bg-[#FBF8F1] text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#162E22] mb-1">
                          {kn ? 'ಪ್ರವಾಸದ ಉದ್ದೇಶ / ಕೈಗಾರಿಕಾ ಕ್ಷೇತ್ರ' : 'Purpose / Industry Focus'}
                        </label>
                        <input
                          type="text"
                          value={eduPurpose}
                          onChange={(e) => setEduPurpose(e.target.value)}
                          placeholder={kn ? 'ಉದಾ: ಸೈನ್ಸ್ ಟ್ರಿಪ್, ಮೆಕ್ಯಾನಿಕಲ್ ಫ್ಯಾಕ್ಟರಿ IV' : 'e.g. Heritage, Tech Parks, Agro Industry'}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 bg-[#FBF8F1] text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                        />
                      </div>
                    </div>
                  )}

                  {/* CORPORATE SPECIFIC */}
                  {selectedCategory === 'corporate' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-[#162E22] mb-1">
                          {kn ? 'ಕಂಪನಿ / ಸಂಸ್ಥೆಯ ಹೆಸರು' : 'Company / Organization Name'} *
                        </label>
                        <input
                          type="text"
                          value={orgName}
                          onChange={(e) => setOrgName(e.target.value)}
                          placeholder="e.g. Infosys, Wipro, Startup Team"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 bg-[#FBF8F1] text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#162E22] mb-1">
                          {kn ? 'ಭಾಗವಹಿಸುವವರ ಸಂಖ್ಯೆ' : 'Expected Attendee Count'}
                        </label>
                        <input
                          type="number"
                          value={attendeeCount}
                          onChange={(e) => setAttendeeCount(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 bg-[#FBF8F1] text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#162E22] mb-1">
                          {kn ? 'ಆದ್ಯತೆಯ ಸ್ಥಳ / ರೆಸಾರ್ಟ್' : 'Preferred Destination'}
                        </label>
                        <input
                          type="text"
                          value={corpDest}
                          onChange={(e) => setCorpDest(e.target.value)}
                          placeholder="Chikmagalur / Coorg / Kabini"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 bg-[#FBF8F1] text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#162E22] mb-1">
                          {kn ? 'ಉದ್ದೇಶಿತ ದಿನಾಂಕಗಳು' : 'Proposed Dates'}
                        </label>
                        <input
                          type="text"
                          value={corpDates}
                          onChange={(e) => setCorpDates(e.target.value)}
                          placeholder="Dec 5-7"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 bg-[#FBF8F1] text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                        />
                      </div>
                    </div>
                  )}

                  {/* TRANSPORT SPECIFIC */}
                  {selectedCategory === 'transport' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-[#162E22] mb-1">
                          {kn ? 'ವಾಹನದ ಮಾದರಿ' : 'Vehicle Class'}
                        </label>
                        <select
                          value={vehicleType}
                          onChange={(e) => setVehicleType(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 bg-[#FBF8F1] text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                        >
                          <option value="sedan">{kn ? 'ಸೆಡಾನ್ (Dzire / Etios 4 Seater)' : 'Sedan (4 Seater)'}</option>
                          <option value="suv">{kn ? 'ಇನೋವಾ ಕ್ರಿಸ್ಟಾ (Innova Crysta 6-7 Seater)' : 'Innova Crysta (6-7 Seater)'}</option>
                          <option value="tempo_traveller">{kn ? 'ಟೆಂಪೋ ಟ್ರಾವೆಲರ್ (12-20 Seater)' : 'Tempo Traveller (12-20 Seater)'}</option>
                          <option value="mini_bus">{kn ? 'ಮಿನಿ ಬಸ್ಸು (30-35 Seater)' : 'Mini Bus (30-35 Seater)'}</option>
                          <option value="luxury_coach">{kn ? 'ಐಷಾರಾಮಿ ಕೋಚ್ (45-50 Seater)' : 'Luxury Coach (45-50 Seater)'}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#162E22] mb-1">
                          {kn ? 'ಪ್ರಯಾಣಿಕರ ಸಂಖ್ಯೆ' : 'Passenger Count'}
                        </label>
                        <input
                          type="number"
                          value={passengerCount}
                          onChange={(e) => setPassengerCount(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 bg-[#FBF8F1] text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#162E22] mb-1">
                          {kn ? 'ಆರಂಭದ ಸ್ಥಳ (Pickup)' : 'Pickup Location'} *
                        </label>
                        <input
                          type="text"
                          value={pickupCity}
                          onChange={(e) => setPickupCity(e.target.value)}
                          placeholder="Bengaluru / Mysore"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 bg-[#FBF8F1] text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#162E22] mb-1">
                          {kn ? 'ಗಮ್ಯಸ್ಥಾನ (Drop)' : 'Drop / Tour Destination'} *
                        </label>
                        <input
                          type="text"
                          value={dropCity}
                          onChange={(e) => setDropCity(e.target.value)}
                          placeholder="Coorg / Ooty / Hampi"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 bg-[#FBF8F1] text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* VISA & PASSPORT SPECIFIC */}
                  {selectedCategory === 'visa_passport' && (
                    <div className="space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-semibold text-[#162E22] mb-1">
                            {kn ? 'ಪ್ರವಾಸ ದೇಶ' : 'Destination Country'} *
                          </label>
                          <input
                            type="text"
                            value={visaCountry}
                            onChange={(e) => setVisaCountry(e.target.value)}
                            placeholder="Dubai, Singapore, Bali, Thailand"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 bg-[#FBF8F1] text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#162E22] mb-1">
                            {kn ? 'ಅರ್ಜಿದಾರರ ಸಂಖ್ಯೆ' : 'Number of Applicants'}
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={applicantCount}
                            onChange={(e) => setApplicantCount(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 bg-[#FBF8F1] text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                          />
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-[#F6F3EA] border border-[#263F32]/15 text-xs text-[#252923]/80 flex items-start gap-2.5">
                        <ShieldAlert className="w-5 h-5 text-[#9E3D28] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[#162E22]">
                            {kn ? 'ಗೌಪ್ಯತೆ ಮತ್ತು ಸುರಕ್ಷತಾ ನಿಯಮ: ' : 'Privacy & Security Protocol: '}
                          </span>
                          {kn
                            ? 'ಪಾಸ್‌ಪೋರ್ಟ್ ಸಂಖ್ಯೆ ಅಥವಾ ಗುರುತಿನ ಚೀಟಿಗಳ ಸ್ಕ್ಯಾನ್ ಪ್ರತಿಗಳನ್ನು ಈ ಸಾರ್ವಜನಿಕ ಫಾರ್ಮ್‌ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ. ನಮ್ಮ ಅಧಿಕೃತ ಪ್ರತಿನಿಧಿಗಳು ನೇರವಾಗಿ ಪರಿಶೀಲನೆ ನಡೆಸುತ್ತಾರೆ.'
                            : 'Do not submit passport numbers, national IDs, or document scans via public web forms. Our verified consultants will guide you through secure official submission.'}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CATERING SPECIFIC */}
                  {selectedCategory === 'catering' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-[#162E22] mb-1">
                          {kn ? 'ಸಮಾರಂಭದ ವಿಧ' : 'Occasion Type'}
                        </label>
                        <select
                          value={cateringOccasion}
                          onChange={(e) => setCateringOccasion(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 bg-[#FBF8F1] text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                        >
                          <option value="tour_group">{kn ? 'ಪ್ರವಾಸದ ಮಾರ್ಗಮಧ್ಯೆ ಊಟ' : 'On-Tour Travel Meal'}</option>
                          <option value="family_function">{kn ? 'ಕುಟುಂಬ ಸಮಾರಂಭ / ಗೃಹಪ್ರವೇಶ' : 'Family Function / Milestone'}</option>
                          <option value="corporate_event">{kn ? 'ಕಾರ್ಪೊರೇಟ್ ಸಮ್ಮೇಳನ ಭೋಜನ' : 'Corporate Banquet'}</option>
                          <option value="pankti_seva">{kn ? 'ಸಾಂಪ್ರದಾಯಿಕ ಪಂಕ್ತಿ ಸೇವೆ' : 'Traditional Banana Leaf Pankti Seva'}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#162E22] mb-1">
                          {kn ? 'ಅತಿಥಿಗಳ ಸಂಖ್ಯೆ' : 'Guest Count'} *
                        </label>
                        <input
                          type="number"
                          min="20"
                          value={cateringGuests}
                          onChange={(e) => setCateringGuests(e.target.value)}
                          placeholder="100"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 bg-[#FBF8F1] text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#162E22] mb-1">
                          {kn ? 'ಸಮಾರಂಭದ ದಿನಾಂಕ' : 'Event Date'}
                        </label>
                        <input
                          type="date"
                          value={cateringDate}
                          onChange={(e) => setCateringDate(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 bg-[#FBF8F1] text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#162E22] mb-1">
                          {kn ? 'ಸ್ಥಳ / ನಗರ' : 'Venue / City'} *
                        </label>
                        <input
                          type="text"
                          value={cateringVenue}
                          onChange={(e) => setCateringVenue(e.target.value)}
                          placeholder="Mysore / Bengaluru / Hassan"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 bg-[#FBF8F1] text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Common Customer Contact Details */}
                <div className="space-y-4">
                  <div className="text-xs font-bold text-[#162E22] uppercase tracking-wider">
                    {kn ? '೩. ನಿಮ್ಮ ಸಂಪರ್ಕ ವಿವರಗಳು' : '3. Your Contact Details'} *
                  </div>

                  {/* Honeypot anti-spam trap (invisible to human users) */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#162E22] mb-1">
                        {kn ? 'ಪೂರ್ಣ ಹೆಸರು' : 'Full Name'} *
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={kn ? 'ನಿಮ್ಮ ಹೆಸರು' : 'Your Full Name'}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 bg-white text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#162E22] mb-1">
                        {kn ? 'ಮೊಬೈಲ್ / ವಾಟ್ಸಾಪ್ ಸಂಖ್ಯೆ' : 'Mobile / WhatsApp Number'} *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 94480 00000"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 bg-white text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden font-mono"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#162E22] mb-1">
                        {kn ? 'ಇಮೇಲ್ ವಿಳಾಸ (ಐಚ್ಛಿಕ)' : 'Email Address (Optional)'}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 bg-white text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#162E22] mb-1">
                        {kn ? 'ಸಂಪರ್ಕದ ಆದ್ಯತೆ' : 'Preferred Contact Channel'}
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['whatsapp', 'phone', 'email'] as const).map((method) => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setPreferredContact(method)}
                            className={`py-2 px-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer border ${
                              preferredContact === method
                                ? 'bg-[#162E22] text-[#F5D77F] border-[#D4AF37]'
                                : 'bg-white text-[#252923]/70 border-[#263F32]/15 hover:border-[#D4AF37]/40'
                            }`}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#162E22] mb-1">
                      {kn ? 'ಹೆಚ್ಚುವರಿ ಅಗತ್ಯತೆಗಳು ಅಥವಾ ಟಿಪ್ಪಣಿ' : 'Special Notes / Dietary / Timing Needs'}
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={kn ? 'ಊಟದ ಪದ್ಧತಿ, ಹಿರಿಯರ ಆರೈಕೆ, ವಾಸ್ತವ್ಯದ ಆದ್ಯತೆ ಇತ್ಯಾದಿ...' : 'Specific dietary preferences, senior citizen care, stay choices...'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#263F32]/20 bg-white text-sm text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden resize-none"
                    />
                  </div>
                </div>

                {/* Error Banner */}
                {submitError && (
                  <div className="p-3.5 rounded-xl bg-[#9E3D28]/10 border border-[#9E3D28]/30 text-xs text-[#9E3D28] font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Footer Submit Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#263F32]/10">
                  <div className="text-xs text-[#252923]/60 flex items-center gap-1.5">
                    <LotusIcon className="w-4 h-4 text-[#D4AF37]" />
                    <span>{kn ? 'ಯಾವುದೇ ಮುಂಗಡ ಶುಲ್ಕವಿಲ್ಲ · ನೇರ ಸಮಾಲೋಚನೆ' : 'Zero pressure consultation · Verified local expertise'}</span>
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-1/2 sm:w-auto px-5 py-3 rounded-xl border border-[#263F32]/20 text-xs font-semibold text-[#252923] hover:bg-black/5 transition-colors cursor-pointer"
                    >
                      {kn ? 'ರದ್ದುಮಾಡಿ' : 'Cancel'}
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-1/2 sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#D4AF37] text-[#12261C] border border-[#F5D77F]/60 text-xs font-bold uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#162E22]" />
                          <span className="text-[#12261C] font-bold">{kn ? 'ದಾಖಲಾಗುತ್ತಿದೆ...' : 'Submitting...'}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-[#12261C] font-bold">{kn ? 'ವಿಚಾರಣೆ ಕಳುಹಿಸಿ' : 'Send Inquiry'}</span>
                          <ArrowUpRight className="w-4 h-4 text-[#12261C] stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
