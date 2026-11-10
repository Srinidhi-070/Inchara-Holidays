import React, { useState } from 'react';
import { InquiryRecord, QuotationLineItem, QuotationRecord } from '../../types/inquiry';
import { defaultBankDetails, createNewQuotation } from '../../services/quotationService';
import { Printer, X, Plus, Trash2, CheckCircle2, ShieldCheck, Download, MessageCircle, Mail, Send, Copy, Check } from 'lucide-react';
import { AmbariElephant } from '../SouthIndianMotifs';
import {
  buildQuotationWhatsAppText,
  buildQuotationEmailContent,
  dispatchWhatsApp,
  dispatchEmail,
} from '../../services/clientDispatchService';

interface QuotationModalProps {
  inquiry: InquiryRecord;
  existingQuotation?: QuotationRecord | null;
  onClose: () => void;
  onSaved?: (quotation: QuotationRecord) => void;
}

export const QuotationModal: React.FC<QuotationModalProps> = ({
  inquiry,
  existingQuotation,
  onClose,
  onSaved,
}) => {
  const [guestCount, setGuestCount] = useState<number>(
    (inquiry.servicePayload?.travellerCount as number) ||
    (inquiry.servicePayload?.studentCount as number) ||
    (inquiry.servicePayload?.guestCount as number) ||
    (inquiry.servicePayload?.attendeeCount as number) ||
    4
  );

  const [destination, setDestination] = useState<string>(
    (inquiry.servicePayload?.destination as string) ||
    (inquiry.servicePayload?.location as string) ||
    'Karnataka Circuit'
  );

  const [travelDates, setTravelDates] = useState<string>(
    (inquiry.servicePayload?.travelDates as string) ||
    (inquiry.servicePayload?.preferredDates as string) ||
    (inquiry.servicePayload?.eventDate as string) ||
    new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0]
  );

  const [items, setItems] = useState<QuotationLineItem[]>(
    existingQuotation?.items || [
      {
        id: 'item-1',
        description: 'Chauffeur-Driven Sanitized Transport (Fuel, Tolls & Driver Bata included)',
        quantity: 1,
        unit: 'Vehicle',
        unitRate: 18500,
        amount: 18500,
      },
      {
        id: 'item-2',
        description: 'Heritage Resort / Hotel Accommodations (Twin-sharing basis)',
        quantity: 3,
        unit: 'Nights',
        unitRate: 4800,
        amount: 14400,
      },
      {
        id: 'item-3',
        description: '100% Pure Vegetarian Meals (Breakfast + Traditional Plantain Leaf Dinners)',
        quantity: 4,
        unit: 'Days',
        unitRate: 3200,
        amount: 12800,
      },
      {
        id: 'item-4',
        description: 'Guided Heritage Sightseeing & Verified Monument Entry Permits',
        quantity: 1,
        unit: 'Package',
        unitRate: 4500,
        amount: 4500,
      },
    ]
  );

  const [specialNotes, setSpecialNotes] = useState<string>(
    existingQuotation?.specialNotes ||
      'Includes 100% Satvic/Jain pure vegetarian dining on request. No hidden commercial stops.'
  );

  const [paymentTerms, setPaymentTerms] = useState<string>(
    existingQuotation?.paymentTerms ||
      '30% advance token upon itinerary confirmation; 50% prior to departure; 20% during check-in.'
  );

  const subtotal = items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const gstRate = 5; // 5% tour operator GST
  const gstAmount = Math.round((subtotal * gstRate) / 100);
  const totalAmount = subtotal + gstAmount;

  const [savedQuote, setSavedQuote] = useState<QuotationRecord | null>(existingQuotation || null);

  const handleUpdateItem = (id: string, field: keyof QuotationLineItem, value: any) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitRate') {
          updated.amount = Number(updated.quantity || 0) * Number(updated.unitRate || 0);
        }
        return updated;
      })
    );
  };

  const handleAddItem = () => {
    const newItem: QuotationLineItem = {
      id: `item-${Date.now()}`,
      description: 'Custom Service / Tour Kitchen / Chaperone',
      quantity: 1,
      unit: 'Service',
      unitRate: 2500,
      amount: 2500,
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter((i) => i.id !== id));
  };

  const handleSaveAndFinalize = () => {
    const quote = createNewQuotation({
      inquiryId: inquiry.id,
      referenceNumber: inquiry.referenceNumber,
      customerName: inquiry.customerName,
      customerPhone: inquiry.phone,
      customerEmail: inquiry.email,
      serviceCategory: inquiry.serviceCategory,
      destination,
      travelDates,
      guestCount,
      items,
      subtotal,
      gstRate,
      gstAmount,
      totalAmount,
      validityDays: 14,
      paymentTerms,
      bankDetails: defaultBankDetails,
      specialNotes,
      status: 'sent',
    });
    setSavedQuote(quote);
    if (onSaved) onSaved(quote);
  };

  const handlePrint = () => {
    window.print();
  };

  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  const getEffectiveQuote = (): QuotationRecord => {
    if (savedQuote) return savedQuote;
    return {
      id: existingQuotation?.id || 'quote-draft',
      quotationNumber: existingQuotation?.quotationNumber || `QTN-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      inquiryId: inquiry.id,
      referenceNumber: inquiry.referenceNumber,
      customerName: inquiry.customerName,
      customerPhone: inquiry.phone,
      customerEmail: inquiry.email,
      serviceCategory: inquiry.serviceCategory,
      destination,
      travelDates,
      guestCount,
      items,
      subtotal,
      gstRate,
      gstAmount,
      totalAmount,
      validityDays: 14,
      paymentTerms,
      bankDetails: defaultBankDetails,
      specialNotes,
      status: 'sent',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  };

  const handleSendWhatsApp = () => {
    const quote = getEffectiveQuote();
    const text = buildQuotationWhatsAppText(inquiry, quote);
    dispatchWhatsApp(inquiry.phone, text);
    setNotification({ text: `WhatsApp opened with formal quote for ${inquiry.customerName}!`, type: 'success' });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSendEmail = () => {
    const quote = getEffectiveQuote();
    const { mailtoUrl } = buildQuotationEmailContent(inquiry, quote);
    dispatchEmail(mailtoUrl);
    setNotification({ text: `Email draft prepared for ${inquiry.customerName} (${inquiry.email || 'No email registered'})!`, type: 'success' });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleCopyQuote = () => {
    const quote = getEffectiveQuote();
    const text = buildQuotationWhatsAppText(inquiry, quote);
    navigator.clipboard.writeText(text);
    setNotification({ text: `Full quotation copied to clipboard!`, type: 'info' });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white sm:rounded-3xl shadow-2xl flex flex-col my-auto max-h-[95vh] overflow-hidden border border-[#D4AF37]/40 print:max-w-none print:max-h-none print:border-none print:shadow-none print:rounded-none">
        {/* Top Header Bar */}
        <div className="p-4 bg-[#162E22] text-[#F6F3EA] border-b border-[#D4AF37]/30 flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center gap-2.5">
            <AmbariElephant className="w-6 h-6 text-[#F5D77F]" />
            <div>
              <span className="font-bold text-xs uppercase tracking-wider text-[#F5D77F]">
                {savedQuote ? `Official Quotation #${savedQuote.quotationNumber}` : 'Formal Itinerary Quotation Generator'}
              </span>
              <div className="text-[11px] text-white/70">
                Customer: {inquiry.customerName} ({inquiry.referenceNumber})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!savedQuote ? (
              <button
                type="button"
                onClick={handleSaveAndFinalize}
                className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#C5A028] text-[#162E22] font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Finalize & Preview Quote</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setSavedQuote(null)}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all cursor-pointer"
                >
                  Edit Items
                </button>
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="px-3 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm transition-all active:scale-95"
                  title="Send Quotation via WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={handleSendEmail}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#F5D77F] border border-[#D4AF37]/40 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm transition-all active:scale-95"
                  title="Send Quotation via Email"
                >
                  <Mail className="w-3.5 h-3.5 text-[#F5D77F]" />
                  <span className="hidden sm:inline">Email</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#C5A028] text-[#162E22] font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save PDF</span>
                </button>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Quotation View */}
        <div id="official-quotation-document" className="p-6 sm:p-10 overflow-y-auto space-y-7 text-[#252923] bg-[#FCFBF8] print:p-0 print:overflow-visible print:bg-white">
          {/* Notification Toast */}
          {notification && (
            <div
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between shadow-md print:hidden animate-fade-in ${
                notification.type === 'success'
                  ? 'bg-emerald-900 text-emerald-100 border border-emerald-500/50'
                  : 'bg-[#162E22] text-[#F5D77F] border border-[#D4AF37]/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{notification.text}</span>
              </div>
              <button
                type="button"
                onClick={() => setNotification(null)}
                className="text-white/60 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Direct Client Communication Strip (Hidden on print) */}
          <div className="p-4 rounded-2xl bg-[#162E22] text-[#F6F3EA] border border-[#D4AF37]/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3.5 print:hidden">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#F5D77F] shrink-0">
                <Send className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#F5D77F] block">
                  Direct Client Dispatch
                </span>
                <p className="text-[11px] text-white/75">
                  Send this formal quotation directly to {inquiry.customerName} via verified WhatsApp (+{inquiry.phone}) or Email ({inquiry.email || 'No email registered'}).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Send WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={handleSendEmail}
                className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#D4AF37] text-[#12261C] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:brightness-105 transition-all active:scale-95 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#12261C]" />
                <span>Send Email</span>
              </button>
              <button
                type="button"
                onClick={handleCopyQuote}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 hover:text-white border border-white/20 transition-all cursor-pointer"
                title="Copy Quotation Text"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          {/* Header */}
          <header className="border-b-2 border-[#162E22] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-[#162E22] border border-[#D4AF37] flex items-center justify-center text-[#F5D77F] shrink-0">
                <AmbariElephant className="w-8 h-8 text-[#F5D77F]" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#162E22] tracking-tight leading-none">
                  INCHARA HOLIDAYS
                </h1>
                <p className="text-xs text-[#9E3D28] font-semibold mt-1">
                  Reg: KA-TO-2024-88419 · Sayyaji Rao Road, Mysuru
                </p>
                <p className="text-[11px] text-[#252923]/70 font-normal">
                  Authentic South Indian Travel & Pure Veg Catering Services
                </p>
              </div>
            </div>

            <div className="text-right text-xs space-y-1">
              <div className="inline-block px-3 py-1 bg-[#162E22] text-[#F5D77F] font-mono font-bold text-xs rounded-lg">
                {savedQuote?.quotationNumber || 'DRAFT-QUOTATION'}
              </div>
              <div className="text-[#252923]/60 text-[11px]">
                Date: {new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}
              </div>
              <div className="text-[#252923]/60 text-[11px]">
                Valid for: 14 Days from issuance
              </div>
            </div>
          </header>

          {/* Customer & Journey Particulars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-white border border-[#263F32]/10 shadow-xs text-xs">
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-[#9E3D28] tracking-wider block">Customer Details</span>
              <div className="font-bold text-sm text-[#162E22]">{inquiry.customerName}</div>
              <div>Phone: <span className="font-mono">{inquiry.phone}</span></div>
              {inquiry.email && <div>Email: {inquiry.email}</div>}
              <div>Reference: <span className="font-mono font-semibold text-[#9E3D28]">{inquiry.referenceNumber}</span></div>
            </div>

            <div className="space-y-1.5 sm:border-l sm:border-[#263F32]/10 sm:pl-4">
              <span className="text-[10px] uppercase font-bold text-[#9E3D28] tracking-wider block">Tour Particulars</span>
              <div>Destination: <strong>{destination}</strong></div>
              <div>Travel Dates: <strong>{travelDates}</strong></div>
              <div>Passenger / Guest Count: <strong>{guestCount} Members</strong></div>
              <div>Category: <strong className="capitalize">{inquiry.serviceCategory}</strong></div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#162E22]">Itemized Quotation Breakdown</h3>
              {!savedQuote && (
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="px-2.5 py-1 rounded-lg bg-[#162E22] text-[#F5D77F] text-xs font-semibold flex items-center gap-1 cursor-pointer print:hidden"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Line Item</span>
                </button>
              )}
            </div>

            <div className="border border-[#263F32]/15 rounded-2xl overflow-hidden bg-white shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#162E22] text-[#F6F3EA] border-b border-[#D4AF37]/30">
                    <th className="py-2.5 px-3 font-semibold">#</th>
                    <th className="py-2.5 px-3 font-semibold">Service Description</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Qty / Unit</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Rate (₹)</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Amount (₹)</th>
                    {!savedQuote && <th className="py-2.5 px-2 text-center print:hidden">Del</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#263F32]/10">
                  {items.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-[#FBF8F1]">
                      <td className="py-2.5 px-3 text-[#252923]/50 font-mono">{idx + 1}</td>
                      <td className="py-2.5 px-3 font-medium text-[#162E22]">
                        {!savedQuote ? (
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                            className="w-full px-2 py-1 rounded-md border border-[#263F32]/15 text-xs text-[#162E22]"
                          />
                        ) : (
                          item.description
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {!savedQuote ? (
                          <div className="flex items-center justify-center gap-1">
                            <input
                              type="number"
                              min={1}
                              value={item.quantity}
                              onChange={(e) => handleUpdateItem(item.id, 'quantity', Number(e.target.value))}
                              className="w-12 px-1 py-1 rounded-md border border-[#263F32]/15 text-xs text-center"
                            />
                            <span className="text-[10px] text-[#252923]/60">{item.unit}</span>
                          </div>
                        ) : (
                          `${item.quantity} ${item.unit}`
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono">
                        {!savedQuote ? (
                          <input
                            type="number"
                            value={item.unitRate}
                            onChange={(e) => handleUpdateItem(item.id, 'unitRate', Number(e.target.value))}
                            className="w-20 px-2 py-1 rounded-md border border-[#263F32]/15 text-xs text-right font-mono"
                          />
                        ) : (
                          `₹${item.unitRate.toLocaleString('en-IN')}`
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-[#162E22]">
                        ₹{item.amount.toLocaleString('en-IN')}
                      </td>
                      {!savedQuote && (
                        <td className="py-2.5 px-2 text-center print:hidden">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-[#F6F3EA] border-t border-[#263F32]/20 font-medium">
                  <tr>
                    <td colSpan={3} className="py-2 px-3 text-right text-xs text-[#252923]/70">Subtotal:</td>
                    <td colSpan={2} className="py-2 px-3 text-right font-mono font-bold text-[#162E22]">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </td>
                    {!savedQuote && <td className="print:hidden" />}
                  </tr>
                  <tr>
                    <td colSpan={3} className="py-1.5 px-3 text-right text-xs text-[#252923]/70">
                      Taxes (GST @ 5% Tour Operator):
                    </td>
                    <td colSpan={2} className="py-1.5 px-3 text-right font-mono text-[#162E22]">
                      ₹{gstAmount.toLocaleString('en-IN')}
                    </td>
                    {!savedQuote && <td className="print:hidden" />}
                  </tr>
                  <tr className="border-t-2 border-[#162E22] bg-[#162E22] text-[#F5D77F] font-bold text-sm">
                    <td colSpan={3} className="py-3 px-3 text-right uppercase tracking-wider">Total Quotation (INR):</td>
                    <td colSpan={2} className="py-3 px-3 text-right font-mono text-base">
                      ₹{totalAmount.toLocaleString('en-IN')}
                    </td>
                    {!savedQuote && <td className="print:hidden" />}
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Payment Terms & Bank Settlement Particulars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-white border border-[#263F32]/10 space-y-2 shadow-xs">
              <span className="font-bold text-[#162E22] uppercase tracking-wider text-[11px] block">
                Payment Schedule & Conditions
              </span>
              <p className="text-[#252923]/80 leading-relaxed font-normal">{paymentTerms}</p>
              <div className="pt-2 text-[11px] text-[#9E3D28] font-semibold">
                * Zero merchant transaction fee on direct bank NEFT/RTGS transfers.
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F3EA] border border-[#D4AF37]/30 space-y-1.5 shadow-xs font-mono text-[11px]">
              <span className="font-sans font-bold text-[#162E22] uppercase tracking-wider text-[11px] block">
                Bank Settlement Particulars
              </span>
              <div>Bank: <strong>{defaultBankDetails.bankName}</strong></div>
              <div>Account: <strong>{defaultBankDetails.accountName}</strong></div>
              <div>A/C Number: <strong>{defaultBankDetails.accountNumber}</strong></div>
              <div>IFSC Code: <strong>{defaultBankDetails.ifscCode}</strong></div>
              <div>Branch: <span>{defaultBankDetails.branch}</span></div>
              <div className="pt-1 text-[#162E22] font-sans font-bold">UPI ID: <span className="font-mono text-[#9E3D28]">{defaultBankDetails.upiId}</span></div>
            </div>
          </div>

          {/* Signature & Seal */}
          <footer className="pt-6 border-t border-[#263F32]/15 flex items-end justify-between">
            <div className="text-[11px] text-[#252923]/60 space-y-0.5">
              <div>Authorized Quote by Inchara Holidays Operations Desk.</div>
              <div>Computer-generated quotation document — valid without physical signature.</div>
            </div>

            <div className="text-center space-y-1">
              <div className="w-24 h-10 border-b border-[#162E22] mx-auto flex items-end justify-center pb-1 text-[#9E3D28] font-serif italic text-xs">
                Inchara Tours
              </div>
              <span className="text-[10px] uppercase font-bold text-[#162E22]">Authorized Signatory</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
