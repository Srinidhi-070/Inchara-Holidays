const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  const results = {
    headerNav: false,
    mobileNav: false,
    langSwitch: false,
    packageFiltering: false,
    itineraryModal: false,
    destinationModal: false,
    serviceJourneys: {},
    formValidation: false,
    submissionSuccess: false,
    whatsappUrlFormat: '',
    localStoragePersisted: false,
    footerLinks: false
  };

  try {
    await page.goto('http://localhost:5180');
    console.log('1. Page loaded');

    // Header nav
    const serviceLinks = await page.locator('.desktop-nav a').count();
    results.headerNav = serviceLinks >= 6;
    console.log('Header links count:', serviceLinks);

    // Mobile nav test
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('button.menu-button').click();
    await page.waitForTimeout(200);
    const mobileMenuOpen = await page.locator('#mobile-menu.is-open').isVisible();
    await page.locator('button.menu-button').click();
    await page.waitForTimeout(200);
    const mobileMenuClosed = !(await page.locator('#mobile-menu.is-open').isVisible());
    results.mobileNav = mobileMenuOpen && mobileMenuClosed;
    console.log('Mobile nav works:', results.mobileNav);

    // Reset viewport to desktop
    await page.setViewportSize({ width: 1440, height: 900 });

    // Language switch
    await page.locator('header .header-actions .language-toggle').click();
    const isKannada = await page.evaluate(() => document.documentElement.lang === 'kn');
    await page.locator('header .header-actions .language-toggle').click();
    const isEn = await page.evaluate(() => document.documentElement.lang === 'en');
    results.langSwitch = isKannada && isEn;
    console.log('Language switch works:', results.langSwitch);

    // Package filtering
    const allCount = await page.locator('#packages .package-card').count();
    await page.locator('#packages button').filter({ hasText: 'Karnataka' }).first().click();
    const karnatakaCount = await page.locator('#packages .package-card').count();
    await page.locator('#packages button').filter({ hasText: 'Pan-India' }).first().click();
    const panIndiaCount = await page.locator('#packages .package-card').count();
    await page.locator('#packages button').filter({ hasText: 'All Packages' }).first().click();
    results.packageFiltering = allCount > karnatakaCount && panIndiaCount > 0;
    console.log('Package filtering works:', results.packageFiltering, { allCount, karnatakaCount, panIndiaCount });

    // Itinerary modal
    await page.locator('#packages .package-card:first-child button:has-text("View Itinerary")').click();
    const itineraryOpen = await page.locator('.itinerary-dialog').isVisible();
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    const itineraryClosed = !(await page.locator('.itinerary-dialog').isVisible());
    results.itineraryModal = itineraryOpen && itineraryClosed;
    console.log('Itinerary modal works:', results.itineraryModal);

    // Destination modal
    await page.locator('.destinations-grid .destination-card:first-child').click();
    await page.waitForTimeout(300);
    const destOpen = await page.locator('.max-w-4xl').isVisible();
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    const destClosed = !(await page.locator('.max-w-4xl').isVisible());
    results.destinationModal = destOpen && destClosed;
    console.log('Destination modal works:', results.destinationModal);

    // Test 6 service enquiry journeys
    const services = ['holidays', 'education', 'corporate', 'transport', 'visa', 'catering'];
    for (const s of services) {
      await page.locator(`#${s} button.text-link`).click();
      await page.waitForTimeout(200);
      const isSelected = await page.locator(`.choice-card[aria-checked="true"]`).isVisible();
      const currentServiceTitle = await page.locator(`.choice-card.is-selected h5`).innerText().catch(() => '');
      await page.locator('button.dialog-close').click();
      await page.waitForTimeout(200);
      results.serviceJourneys[s] = { opened: isSelected, title: currentServiceTitle };
    }
    console.log('Service journeys:', results.serviceJourneys);

    // Form validation
    await page.locator('button.header-cta').click();
    await page.waitForTimeout(200);
    // Click Continue without selecting service
    await page.locator('footer.dialog-footer button.gold-button').click();
    const step0Error = await page.locator('.field-error').isVisible();
    
    // Select service 0
    await page.locator('.choice-card:first-child').click();
    await page.locator('footer.dialog-footer button.gold-button').click(); // to step 1
    await page.waitForTimeout(200);

    // In step 1, try clicking Continue without filling required fields
    await page.locator('footer.dialog-footer button.gold-button').click();
    const step1Errors = await page.locator('.field-error').count();
    results.formValidation = step0Error && step1Errors > 0;
    console.log('Form validation works:', results.formValidation, { step0Error, step1Errors });

    // Fill Step 1
    await page.locator('select').first().selectOption('domestic');
    await page.locator('input[placeholder*="Coorg"]').fill('Coorg & Chikmagalur');
    await page.locator('input[type="date"]').fill('2026-12-15');
    await page.locator('input[type="number"]').fill('4');
    await page.locator('footer.dialog-footer button.gold-button').click(); // to step 2
    await page.waitForTimeout(200);

    // Step 2 Contact
    await page.locator('input').nth(0).fill('Srinidhi Test');
    await page.locator('input[type="tel"]').fill('+91 98450 11223');
    await page.locator('input[type="email"]').fill('test@example.com');
    await page.locator('select').first().selectOption('phone');
    await page.locator('.consent-checkbox input').check();
    await page.locator('footer.dialog-footer button.gold-button').click(); // to step 3 Review
    await page.waitForTimeout(200);

    // Step 3 Review -> Submit
    await page.locator('footer.dialog-footer button.gold-button').click();
    await page.waitForTimeout(1000);

    const successVisible = await page.locator('.success-state').isVisible();
    const refText = await page.locator('.success-state span.font-mono').innerText().catch(() => '');
    const waLink = await page.locator('.success-state a.gold-button').getAttribute('href');
    results.submissionSuccess = successVisible;
    results.generatedRef = refText;
    results.whatsappUrlFormat = waLink;
    console.log('Submission success:', { successVisible, refText, waLink });

    // Verify localStorage
    const storedInquiries = await page.evaluate(() => localStorage.getItem('inchara_inquiries_db_v1'));
    results.localStoragePersisted = Boolean(storedInquiries && storedInquiries.includes(refText));
    console.log('LocalStorage persistence verified:', results.localStoragePersisted);

    // Footer links
    const footerNavLinks = await page.locator('footer.footer nav a').count();
    results.footerLinks = footerNavLinks >= 6;
    console.log('Footer links count:', footerNavLinks);

    console.log('\nFINAL AUDIT RESULTS SUMMARY:', JSON.stringify(results, null, 2));

  } catch (err) {
    console.error('Test error:', err);
  } finally {
    await browser.close();
  }
})();
