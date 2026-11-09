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
import { useLocale } from "./hooks/useLocale";
import { useScrollReveal } from "./hooks/useScrollReveal";
import type { ServiceId } from "./types";

export default function App() {
  const { locale, setLocale } = useLocale();
  useScrollReveal();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [initialService, setInitialService] = useState<ServiceId | null>(null);

  function openEnquiry(service?: ServiceId) {
    setInitialService(service ?? null);
    setDialogOpen(true);
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
        <CateringFeature locale={locale} onEnquire={openEnquiry} />
        <JourneyProcess locale={locale} />
        <InvitationBanner locale={locale} onEnquire={openEnquiry} />
      </main>
      <Footer locale={locale} setLocale={setLocale} onEnquire={openEnquiry} />
      <EnquiryDialog
        open={dialogOpen}
        locale={locale}
        initialService={initialService}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
}
