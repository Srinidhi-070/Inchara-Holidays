# INCHARA HOLIDAYS — OWNER VERIFICATION & PRODUCTION LAUNCH CHECKLIST
**Business**: Inchara Holidays (ಇಂಚರ ಹಾಲಿಡೇಸ್)  
**Owner & Principal Operator**: Srinidhi N S  
**Document Status**: Pre-Launch Operational Audit & Verification Gate  

---

## 1. Executive Summary & Solo Operator Architecture
Inchara Holidays is engineered specifically as a high-efficiency **Solo Operator Business Operating System**. 
Every operation — from enquiry capture, multi-category tour planning, customer communications, quotation generation, to money receipts and payment ledgers — is managed exclusively by **Srinidhi N S**.

To ensure legal integrity, financial compliance, and zero misrepresentation, this checklist details every business credential currently operating with verified values vs provisional defaults.

---

## 2. Official Business Credentials Status

| Parameter | Current Value in Platform | Status | Action Required from Owner |
| :--- | :--- | :--- | :--- |
| **Owner Name** | Srinidhi N S (ಶ್ರೀನಿಧಿ ಎನ್ ಎಸ್) | **Verified** | None. Configured across all platform documents and legal footers. |
| **Primary Phone** | `+91 80736 92802` / `+91 94480 00000` | **Verified** | Primary contact for one-click WhatsApp dispatch & phone hotline. |
| **Official Email** | `nssrinidhi72884@gmail.com` | **Verified** | Primary dispatch address for lead notifications & customer proposals. |
| **Registered Address** | `#42, Sayyaji Rao Road, Near Devaraja Market, Mysuru, Karnataka 570001` | **Provisional** | Confirm exact municipal door number and commercial lease/premise address in Mysuru. |
| **Tourism Registration**| `KA-TO-2024-88419` (Karnataka Tourism Forum) | **Provisional** | Verify official KTF / Karnataka Tourism Department registration certificate number. |
| **GSTIN** | `29AABCU9603R1ZM` | **Provisional** | Replace with official 15-digit GSTIN issued under State Code 29 (Karnataka) before collecting tax. |
| **Income Tax PAN** | `AABCU9603R` | **Provisional** | Update with proprietary / business entity PAN card before issuing audited ledger records. |
| **Bank Name** | Canara Bank | **Verified** | Registered commercial banking partner for client settlements. |
| **Bank Branch** | Sayyaji Rao Road, Mysuru | **Verified** | Local Mysuru branch. |
| **Bank Account No.** | `110023456789` | **Provisional** | Replace with active Canara Bank Current / Savings Account number for RTGS/NEFT receipts. |
| **Bank IFSC Code** | `CNRB0001234` | **Provisional** | Replace with exact Canara Bank Sayyaji Rao Road IFSC code (e.g. `CNRB00000...`). |

---

## 3. Production Environment Variables Checklist (Vercel)

Ensure the following variables are configured in the Vercel Production Environment Settings:

```bash
# Brand & Contact Hotline
VITE_CONTACT_PHONE="+918073692802"
VITE_CONTACT_PHONE_DISPLAY="+91 80736 92802"
VITE_WHATSAPP_NUMBER="918073692802"
VITE_CONTACT_EMAIL="nssrinidhi72884@gmail.com"
STAFF_NOTIFICATION_EMAIL="nssrinidhi72884@gmail.com"

# Supabase Production Backend (When live activation is authorized)
SUPABASE_URL="https://your-project-id.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6..."

# Automated Email Dispatch (Resend API)
RESEND_API_KEY="re_..."
```

---

## 4. Operational Protocols for Srinidhi N S

1. **Daily Lead Review**:
   - Access the Owner Desk via the footer link **"ಮಾಲೀಕರ ನಿರ್ವಹಣೆ (Owner Portal)"**.
   - Review incoming inquiries under **All Inquiries**.
   - Use the one-click **WhatsApp** button to contact the traveller directly with the pre-composed greeting.

2. **Commercial Proposals & Quotations**:
   - Click **Create Quotation** on any inquiry.
   - Adjust rates, vehicle details, pure veg meal items, and hotel nights.
   - The system automatically computes 5% Tour Operator GST and formats a single-page A4 portrait document.
   - Click **Share on WhatsApp** or **Send via Email** to dispatch directly to the client.

3. **Settlement & Payment Receipts**:
   - When the client transfers an advance token (30%), open the inquiry drawer and click **Issue Payment Receipt**.
   - Input the UTR / transaction reference number.
   - Print or dispatch the A4 official payment receipt.
   - The transaction automatically updates the Central Customer Directory and lifetime customer spend.
