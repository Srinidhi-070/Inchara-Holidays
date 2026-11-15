# INCHARA HOLIDAYS — OWNER VERIFICATION & PRODUCTION LAUNCH CHECKLIST
**Business**: Inchara Holidays (ಇಂಚರ ಹಾಲಿಡೇಸ್)  
**Owner & Lead Curator**: Ravindra S (ರವೀಂದ್ರ ಎಸ್)  
**Document Status**: Pre-Launch Operational Audit & Verification Gate  

---

## 1. Executive Summary & Solo Operator Architecture
Inchara Holidays is engineered specifically as a high-efficiency **Solo Operator Business Operating System**. 
Every operation — from enquiry capture, multi-category tour planning, customer communications, quotation generation, to money receipts and payment ledgers — is managed exclusively by **Ravindra S**.

To ensure legal integrity, financial compliance, and zero misrepresentation, this checklist details every business credential currently operating with verified values vs provisional defaults.

---

## 2. Official Business Credentials Status

| Parameter | Current Value in Platform | Status | Action Required from Owner |
| :--- | :--- | :--- | :--- |
| **Owner Name** | Ravindra S (ರವೀಂದ್ರ ಎಸ್) | **Verified** | None. Configured across all platform documents and legal footers. |
| **Primary Phone** | `+91 90361 74880` | **Verified** | Primary contact for one-click WhatsApp dispatch & phone hotline. |
| **Official Email** | `incharaholidays@gmail.com` | **Verified** | Primary dispatch address for lead notifications & customer proposals. |
| **Registered Address** | `INCHARA HOLIDAYS, 7/1, 6th Cross Rd, Swimming Pool Extension, HN Layout, Malleshwaram, Bengaluru, Karnataka 560003` | **Verified** | Malleshwaram operating desk. |
| **GSTIN** | *Unregistered* | **Proprietorship** | Inchara Holidays operates as an unregistered proprietorship. No GSTIN is required or charged. |
| **Income Tax PAN** | *Proprietor PAN* | **Proprietorship** | Retained privately on file by proprietor Ravindra S. |
| **Bank Name** | Canara Bank | **Verified** | Registered commercial banking partner for client settlements. |
| **Bank Branch** | Malleshwaram, Bengaluru | **Verified** | Local Malleshwaram branch. |
| **Bank Account No.** | `110023456789` | **Provisional** | Replace with active Canara Bank Current / Savings Account number for RTGS/NEFT receipts. |
| **Bank IFSC Code** | `CNRB0001234` | **Provisional** | Replace with exact Canara Bank Malleshwaram IFSC code (e.g. `CNRB00000...`). |

---

## 3. Production Environment Variables Checklist (Vercel)

Ensure the following variables are configured in the Vercel Production Environment Settings:

```bash
# Brand & Contact Hotline
VITE_CONTACT_PHONE="919036174880"
VITE_CONTACT_PHONE_DISPLAY="+91 90361 74880"
VITE_WHATSAPP_NUMBER="919036174880"
VITE_CONTACT_EMAIL="incharaholidays@gmail.com"
STAFF_NOTIFICATION_EMAIL="incharaholidays@gmail.com"

# Supabase Production Backend
SUPABASE_URL="https://jabqfgbpmlnqecxorjuu.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
VITE_SUPABASE_URL="https://jabqfgbpmlnqecxorjuu.supabase.co"
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6..."

# Automated WhatsApp & Email Dispatch (When Live Credentials Provided)
WHATSAPP_API_TOKEN=""
WHATSAPP_PHONE_NUMBER_ID=""
RESEND_API_KEY=""
RESEND_FROM_EMAIL="Inchara Holidays <onboarding@resend.dev>"
```

---

## 4. Operational Protocols for Ravindra S

1. **Daily Lead Review**:
   - Access the Owner Desk via the footer link **"ಮಾಲೀಕರ ನಿರ್ವಹಣೆ (Owner Portal)"**.
   - Review incoming inquiries under **All Inquiries**.
   - Use the one-click **WhatsApp** button to contact the traveller directly with the pre-composed greeting.

2. **Commercial Proposals & Quotations**:
   - Click **Create Quotation** on any inquiry.
   - Adjust rates, vehicle details, pure veg meal items, and hotel nights.
   - The system formats a single-page A4 portrait document with Canara Bank settlement particulars.
   - Click **Share on WhatsApp** or **Send via Email** to dispatch directly to the client.

3. **Settlement & Payment Receipts**:
   - When the client transfers an advance token (30%), open the inquiry drawer and click **Issue Payment Receipt**.
   - Input the UTR / transaction reference number.
   - Print or dispatch the A4 official payment receipt.
   - The transaction automatically updates the Central Customer Directory and lifetime customer spend.
