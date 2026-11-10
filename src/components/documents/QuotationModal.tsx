/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { InquiryRecord, QuotationLineItem, QuotationRecord } from '../../types/inquiry';
import { defaultBankDetails, createNewQuotation } from '../../services/quotationService';
import {
  Printer,
  X,
  Plus,
  Trash2,
  CheckCircle2,
  MessageCircle,
  Mail,
  Send,
  Copy,
  Edit3,
} from 'lucide-react';
import { AmbariElephant } from '../SouthIndianMotifs';
import {
  cleanClientPhone,
  numberToWordsINR,
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
  const [isEditing, setIsEditing] = useState<boolean>(!existingQuotation);
  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

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

  const handleSaveAndFinalize = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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
    setIsEditing(false);
    if (onSaved) onSaved(quote);
  };

  const handlePrint = () => {
    window.print();
  };

  const getEffectiveQuote = (): QuotationRecord => {
    if (savedQuote) return savedQuote;
    return {
      id: existingQuotation?.id || 'quote-draft',
      quotationNumber:
        existingQuotation?.quotationNumber ||
        `QTN-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
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

  const effectiveQuote = getEffectiveQuote();

  const handleSendWhatsApp = () => {
    const text = buildQuotationWhatsAppText(inquiry, effectiveQuote);
    dispatchWhatsApp(inquiry.phone, text);
    setNotification({ text: `WhatsApp opened with formal quotation for ${inquiry.customerName}!`, type: 'success' });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSendEmail = () => {
    const { mailtoUrl } = buildQuotationEmailContent(inquiry, effectiveQuote);
    dispatchEmail(mailtoUrl);
    setNotification({
      text: `Email draft prepared for ${inquiry.customerName} (${inquiry.email || 'No email registered'})!`,
      type: 'success',
    });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleCopyQuote = async () => {
    const text = buildQuotationWhatsAppText(inquiry, effectiveQuote);
    try {
      await navigator.clipboard.writeText(text);
      setNotification({ text: 'Full quotation text copied to clipboard!', type: 'info' });
      setTimeout(() => setNotification(null), 3000);
    } catch {
      setNotification({ text: 'Failed to copy text. Check clipboard permissions.', type: 'info' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      {/* Scoped Strict A4 Portrait Print Stylesheet */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait !important;
            margin: 8mm 10mm !important;
          }
          html,
          body {
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #111111 !important;
            overflow: visible !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          *,
          *::before,
          *::after {
            transform: none !important;
            filter: none !important;
            backdrop-filter: none !important;
            animation: none !important;
            transition: none !important;
          }
          body * {
            visibility: hidden !important;
          }
          #official-quotation-document,
          #official-quotation-document * {
            visibility: visible !important;
          }
          #official-quotation-document {
            display: block !important;
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            margin: 0 !important;
            padding: 16px 20px !important;
            box-shadow: none !important;
            border: 2px solid #162E22 !important;
            border-radius: 8px !important;
            background: #ffffff !important;
            z-index: 999999 !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: avoid !important;
          }
        }
      `}</style>

      <div className="relative w-full max-w-4xl bg-white sm:rounded-3xl shadow-2xl flex flex-col my-auto max-h-[95vh] overflow-hidden border border-[#D4AF37]/40 print:max-w-none print:max-h-none print:border-none print:shadow-none print:rounded-none">
        {/* Top Control Bar (Hidden on print) */}
        <div className="p-4 bg-[#162E22] text-[#F6F3EA] border-b border-[#D4AF37]/30 flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center gap-2.5">
            <AmbariElephant className="w-6 h-6 text-[#F5D77F]" />
            <div>
              <span className="font-bold text-xs uppercase tracking-wider text-[#F5D77F]">
                {savedQuote
                  ? `Official Quotation #${savedQuote.quotationNumber}`
                  : 'Official Tour Quotation Generator'}
              </span>
              <div className="text-[11px] text-white/70">
                Customer: {inquiry.customerName} ({inquiry.referenceNumber})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isEditing ? (
              <button
                type="button"
                onClick={() => handleSaveAndFinalize()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#D4AF37] hover:brightness-105 text-[#162E22] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save & Preview Quote</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Particulars</span>
                </button>
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm transition-all active:scale-95"
                  title="Send Quotation via WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={handleSendEmail}
                  className="px-3.5 py-2 rounded-xl bg-[#263F32] hover:bg-[#345342] text-[#F5D77F] border border-[#D4AF37]/50 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm transition-all active:scale-95"
                  title="Send Quotation via Email"
                >
                  <Mail className="w-4 h-4" />
                  <span className="hidden sm:inline">Email</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#D4AF37] hover:brightness-105 text-[#162E22] font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Quotation</span>
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

        {/* Content Area */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-5 text-[#252923] bg-[#FCFBF8] print:p-0 print:overflow-visible print:bg-white">
          {/* MODE 1: EDIT FORM */}
          {isEditing ? (
            <div className="p-6 rounded-2xl bg-white border border-[#D4AF37]/35 space-y-5 shadow-sm print:hidden">
              <div className="flex items-center justify-between border-b border-[#263F32]/10 pb-3">
                <div>
                  <h3 className="font-bold text-sm text-[#162E22] uppercase tracking-wider">
                    Edit Commercial Quotation Particulars
                  </h3>
                  <p className="text-xs text-[#252923]/60 mt-0.5">
                    Customize destination, guest count, and line items. Prices calculate GST automatically.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-[#9E3D28] tracking-wider block">
                    Calculated Total
                  </span>
                  <div className="text-base font-mono font-bold text-[#162E22]">
                    ₹{totalAmount.toLocaleString('en-IN')}.00
                  </div>
                </div>
              </div>

              {/* Trip Overview Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-[#162E22] mb-1">
                    Destination Circuit *
                  </label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#263F32]/15 text-xs text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#162E22] mb-1">
                    Travel Dates / Window *
                  </label>
                  <input
                    type="text"
                    required
                    value={travelDates}
                    onChange={(e) => setTravelDates(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#263F32]/15 text-xs text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#162E22] mb-1">
                    Passenger / Guest Count *
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#263F32]/15 text-xs text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden font-mono font-bold"
                  />
                </div>
              </div>

              {/* Itemized Table Editor */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#162E22]">
                    Itinerary Line Items
                  </span>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="px-3 py-1.5 rounded-xl bg-[#162E22] hover:bg-[#263F32] text-[#F5D77F] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="border border-[#263F32]/15 rounded-xl overflow-hidden bg-white text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#162E22] text-[#F5D77F] text-[10px] uppercase tracking-wider">
                        <th className="py-2 px-3 font-bold w-10">Sl</th>
                        <th className="py-2 px-3 font-bold">Service Component Description</th>
                        <th className="py-2 px-3 font-bold w-24">Qty / Unit</th>
                        <th className="py-2 px-3 font-bold text-right w-28">Rate (₹)</th>
                        <th className="py-2 px-3 font-bold text-right w-28">Total (₹)</th>
                        <th className="py-2 px-2 text-center w-12">Del</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#162E22]/10">
                      {items.map((item, idx) => (
                        <tr key={item.id} className="hover:bg-[#FCFBF8]">
                          <td className="py-2 px-3 font-mono text-[11px] text-[#252923]/60">{idx + 1}</td>
                          <td className="py-2 px-3">
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                              className="w-full px-2 py-1 rounded border border-[#263F32]/15 text-xs text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                            />
                          </td>
                          <td className="py-2 px-3">
                            <input
                              type="text"
                              value={item.unit}
                              onChange={(e) => handleUpdateItem(item.id, 'unit', e.target.value)}
                              className="w-full px-2 py-1 rounded border border-[#263F32]/15 text-xs text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                            />
                          </td>
                          <td className="py-2 px-3 text-right">
                            <input
                              type="number"
                              min={0}
                              value={item.unitRate}
                              onChange={(e) => handleUpdateItem(item.id, 'unitRate', Number(e.target.value))}
                              className="w-full px-2 py-1 rounded border border-[#263F32]/15 text-xs text-right font-mono text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                            />
                          </td>
                          <td className="py-2 px-3 text-right font-mono font-bold text-[#162E22]">
                            ₹{item.amount.toLocaleString('en-IN')}
                          </td>
                          <td className="py-2 px-2 text-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(item.id)}
                              disabled={items.length <= 1}
                              className="p-1 text-red-600 hover:bg-red-50 rounded cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-[#FBF8F1] border-t border-[#162E22]/15">
                      <tr>
                        <td colSpan={4} className="py-2 px-3 text-right font-semibold text-[11px] text-[#162E22]">
                          Subtotal Amount:
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-[#162E22]">
                          ₹{subtotal.toLocaleString('en-IN')}.00
                        </td>
                        <td />
                      </tr>
                      <tr>
                        <td colSpan={4} className="py-1.5 px-3 text-right font-semibold text-[11px] text-[#162E22]">
                          Tour Operator GST (5%):
                        </td>
                        <td className="py-1.5 px-3 text-right font-mono font-bold text-[#162E22]">
                          ₹{gstAmount.toLocaleString('en-IN')}.00
                        </td>
                        <td />
                      </tr>
                      <tr className="bg-[#162E22] text-[#F5D77F] font-bold">
                        <td colSpan={4} className="py-2.5 px-3 text-right text-xs uppercase tracking-wider">
                          Grand Total Investment:
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono text-sm">
                          ₹{totalAmount.toLocaleString('en-IN')}.00
                        </td>
                        <td />
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Special Notes & Payment Terms */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                <div>
                  <label className="block text-[11px] font-semibold text-[#162E22] mb-1">
                    Customary Payment Terms
                  </label>
                  <textarea
                    rows={2}
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#263F32]/15 text-xs text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#162E22] mb-1">
                    Special Service Notes & Assurances
                  </label>
                  <textarea
                    rows={2}
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#263F32]/15 text-xs text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#263F32]/10">
                {savedQuote && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-xl border border-[#263F32]/15 text-xs font-semibold text-[#252923]/70 hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel Editing
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleSaveAndFinalize()}
                  className="px-5 py-2.5 rounded-xl bg-[#162E22] hover:bg-[#263F32] text-[#F5D77F] font-bold text-xs uppercase tracking-wider cursor-pointer shadow-sm transition-all"
                >
                  Save & Preview Formal Quotation
                </button>
              </div>
            </div>
          ) : (
            /* =========================================================================
               MODE 2: GENUINE SINGLE-PAGE A4 PORTRAIT OFFICIAL COMMERCIAL QUOTATION
               Strictly isolated for printing, fits on 1 page with official seals & terms
               ========================================================================= */
            <>
              {/* Staff Toast Feedback (Hidden on print) */}
              {notification && (
                <div
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-top-2 print:hidden ${
                    notification.type === 'success'
                      ? 'bg-[#162E22] border-[#D4AF37] text-[#F5D77F]'
                      : 'bg-[#162E22] border-emerald-500/50 text-emerald-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{notification.text}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNotification(null)}
                    className="p-1 text-white/60 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Direct Client Dispatch Banner (Hidden on print) */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#162E22] via-[#1E3A2B] to-[#162E22] border border-[#D4AF37]/40 text-[#F6F3EA] flex flex-wrap items-center justify-between gap-3 shadow-md print:hidden">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#F5D77F] shrink-0">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[#F5D77F] tracking-wide block">
                      Direct Dispatch to Client
                    </span>
                    <span className="text-[11px] text-white/70">
                      Send Quotation #{effectiveQuote.quotationNumber} (₹{effectiveQuote.totalAmount.toLocaleString('en-IN')}) to {inquiry.customerName} ({cleanClientPhone(inquiry.phone)})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Send via WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSendEmail}
                    className="px-3.5 py-1.5 rounded-xl bg-[#D4AF37] hover:bg-[#C5A028] text-[#162E22] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send via Email</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyQuote}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#F5D77F] border border-white/20 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                    title="Copy formatted quotation text"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </button>
                </div>
              </div>

              {/* =========================================================================
                 OFFICIAL COMMERCIAL TOUR QUOTATION DOCUMENT
                 Single-page A4 Portrait layout formatted like the official receipt
                 ========================================================================= */}
              <div
                id="official-quotation-document"
                className="border-2 border-[#162E22] rounded-2xl p-6 sm:p-7 bg-white shadow-md space-y-4 text-[#162E22]"
              >
                {/* Quotation Header */}
                <div className="border-b-2 border-[#162E22] pb-3.5 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#162E22] border border-[#D4AF37] flex items-center justify-center text-[#F5D77F] shrink-0 shadow-xs">
                      <AmbariElephant className="w-7 h-7 text-[#F5D77F]" />
                    </div>
                    <div>
                      <h1 className="text-xl font-serif font-bold text-[#162E22] tracking-tight leading-none">
                        INCHARA HOLIDAYS
                      </h1>
                      <p className="text-[11px] font-semibold text-[#9E3D28] mt-1">
                        Premier South Indian Travel & Cultural Hospitality
                      </p>
                      <p className="text-[10px] text-[#252923]/70">
                        Reg: <strong>KA-TO-2024-88419</strong> · GSTIN: <strong>29AABCU9603R1ZM</strong> · PAN: <strong>AABCU9603R</strong>
                      </p>
                      <p className="text-[10px] text-[#252923]/60">
                        Sayyaji Rao Road, Near Mysuru Palace, Mysuru – 570001, Karnataka · +91 99000 00000 · hello@incharaholidays.com
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="inline-block px-3 py-1 rounded-md bg-[#162E22] text-[#F5D77F] font-bold text-[10px] uppercase tracking-wider mb-1">
                      Tour Quotation
                    </div>
                    <div className="font-mono font-bold text-base text-[#162E22]">
                      #{effectiveQuote.quotationNumber}
                    </div>
                    <div className="text-[10px] text-[#252923]/70">
                      Date: <strong>{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</strong>
                    </div>
                    <div className="text-[10px] text-[#9E3D28] font-bold">
                      Validity: <strong>14 Days from issuance</strong>
                    </div>
                    <div className="text-[9px] text-emerald-800 font-bold uppercase tracking-wider flex items-center justify-end gap-1 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
                      <span>Verified Proposal</span>
                    </div>
                  </div>
                </div>

                {/* Guest & Journey Particulars */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-[#FBF8F1] p-3.5 rounded-xl border border-[#D4AF37]/30">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#9E3D28] tracking-wider block mb-0.5">
                      Quotation Prepared For:
                    </span>
                    <div className="font-bold text-sm text-[#162E22]">{inquiry.customerName}</div>
                    <div className="font-mono text-[11px] text-[#252923]/80">Phone: {inquiry.phone}</div>
                    {inquiry.email && <div className="text-[11px] text-[#252923]/80">Email: {inquiry.email}</div>}
                    <div className="font-mono text-[10px] text-[#252923]/70 mt-0.5">
                      Booking Ref: <strong>{inquiry.referenceNumber}</strong>
                    </div>
                  </div>

                  <div className="text-right sm:text-left sm:pl-4 sm:border-l sm:border-[#D4AF37]/20">
                    <span className="text-[9px] uppercase font-bold text-[#9E3D28] tracking-wider block mb-0.5">
                      Itinerary & Logistics Scope:
                    </span>
                    <div className="font-bold text-sm text-[#162E22]">{destination}</div>
                    <div className="text-[11px] text-[#252923]/80">
                      Travel Window: <strong>{travelDates}</strong>
                    </div>
                    <div className="text-[11px] text-[#252923]/80">
                      Travelers: <strong>{guestCount} Members</strong>
                    </div>
                    <div className="text-[11px] text-[#252923]/80 capitalize">
                      Category: <strong>{inquiry.serviceCategory} Tour</strong>
                    </div>
                  </div>
                </div>

                {/* Itemized Investment Breakdown Table */}
                <div className="border border-[#162E22]/20 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#162E22] text-[#F5D77F] text-[10px] uppercase tracking-wider">
                        <th className="py-2 px-3 font-bold w-10">Sl</th>
                        <th className="py-2 px-3 font-bold">Service Component Description</th>
                        <th className="py-2 px-3 font-bold text-center w-28">Qty / Scope</th>
                        <th className="py-2 px-3 font-bold text-right w-28">Rate (₹)</th>
                        <th className="py-2 px-3 font-bold text-right w-32">Amount (INR)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#162E22]/10 bg-white">
                      {items.map((item, idx) => (
                        <tr key={item.id}>
                          <td className="py-2 px-3 font-mono text-[11px] text-[#252923]/70">{String(idx + 1).padStart(2, '0')}</td>
                          <td className="py-2 px-3">
                            <strong className="text-[#162E22]">{item.description}</strong>
                          </td>
                          <td className="py-2 px-3 text-center font-medium text-[#252923]/80">
                            {item.quantity} {item.unit}
                          </td>
                          <td className="py-2 px-3 text-right font-mono text-[#252923]/80">
                            ₹{Number(item.unitRate).toLocaleString('en-IN')}
                          </td>
                          <td className="py-2 px-3 font-mono font-bold text-right text-xs text-[#162E22]">
                            ₹{item.amount.toLocaleString('en-IN')}.00
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-[#F6F3EA] border-t-2 border-[#162E22]/20">
                        <td colSpan={4} className="py-1.5 px-3 text-right text-[11px] font-bold text-[#162E22]">
                          Subtotal Amount:
                        </td>
                        <td className="py-1.5 px-3 text-right font-mono font-bold text-xs text-[#162E22]">
                          ₹{subtotal.toLocaleString('en-IN')}.00
                        </td>
                      </tr>
                      <tr className="bg-[#F6F3EA]">
                        <td colSpan={4} className="py-1.5 px-3 text-right text-[11px] font-bold text-[#162E22]">
                          Taxes (GST @ {gstRate}% Tour Operator):
                        </td>
                        <td className="py-1.5 px-3 text-right font-mono font-bold text-xs text-[#162E22]">
                          ₹{gstAmount.toLocaleString('en-IN')}.00
                        </td>
                      </tr>
                      <tr className="bg-[#162E22] text-[#F5D77F] border-t-2 border-[#162E22]">
                        <td colSpan={4} className="py-2 px-3 text-right text-[11px] font-bold uppercase tracking-wide">
                          Total Quoted Tour Investment:
                        </td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-base text-[#F5D77F]">
                          ₹{totalAmount.toLocaleString('en-IN')}.00
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Amount In Words & Pure Veg Strip */}
                <div className="p-2.5 rounded-lg bg-[#FBF8F1] border border-[#D4AF37]/30 text-xs flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-bold text-[#9E3D28] uppercase tracking-wider block">
                      Amount in Words:
                    </span>
                    <span className="font-semibold text-xs text-[#162E22] italic">
                      {numberToWordsINR(totalAmount)}
                    </span>
                  </div>
                  <div className="font-mono text-[11px] font-bold text-[#162E22] bg-white px-2.5 py-1 rounded border border-[#162E22]/15">
                    100% PURE VEG GUARANTEE
                  </div>
                </div>

                {/* Conditions & Bank Particulars Grid */}
                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div className="p-3 rounded-xl bg-[#F6F3EA] border border-[#263F32]/15 space-y-1">
                    <span className="font-bold text-[#9E3D28] uppercase tracking-wider text-[9px] block">
                      Payment Schedule & Conditions:
                    </span>
                    <div className="text-[#252923]/80 leading-relaxed text-[10px]">
                      {paymentTerms}
                    </div>
                    <div className="text-[9px] text-[#162E22]/70 pt-0.5">
                      • Sanitized chauffeur-driven vehicle with dedicated ground coordinator.
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F6F3EA] border border-[#263F32]/15 space-y-1 font-mono text-[10px]">
                    <span className="font-sans font-bold text-[#9E3D28] uppercase tracking-wider text-[9px] block">
                      Bank Settlement Details (Canara Bank):
                    </span>
                    <div className="text-[#162E22]">
                      A/C Name: <strong>{defaultBankDetails.accountName}</strong>
                    </div>
                    <div className="text-[#162E22]">
                      A/C No: <strong>{defaultBankDetails.accountNumber}</strong> · IFSC: <strong>{defaultBankDetails.ifscCode}</strong>
                    </div>
                    <div className="text-[#252923]/70 truncate">
                      Branch: {defaultBankDetails.branch}
                    </div>
                    <div className="font-sans text-[10px] text-[#162E22]">
                      UPI VPA: <strong className="font-mono text-[#9E3D28]">{defaultBankDetails.upiId}</strong>
                    </div>
                  </div>
                </div>

                {/* Quotation Acceptance & Signatures Footer */}
                <div className="pt-2 border-t border-[#162E22]/15 flex items-end justify-between text-[10px] text-[#252923]/70">
                  <div className="max-w-xs space-y-0.5">
                    <div className="font-semibold text-[#162E22]">Guest Acceptance Confirmation:</div>
                    <div className="text-[9px]">I confirm acceptance of the quoted itinerary and settlement terms.</div>
                    <div className="pt-2 text-[9px] font-mono text-[#252923]/60">
                      Signature: _________________________  Date: ___________
                    </div>
                  </div>

                  {/* Stamp & Authorized Signature */}
                  <div className="flex items-center gap-6 text-center">
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#162E22] text-[#162E22] flex flex-col items-center justify-center p-1 select-none">
                      <span className="text-[7px] font-bold uppercase tracking-widest leading-none">INCHARA</span>
                      <span className="text-[6px] uppercase tracking-tighter text-[#9E3D28] font-bold">MYSURU</span>
                      <span className="text-[7px] font-bold uppercase tracking-widest leading-none mt-0.5">ADVISORY</span>
                    </div>

                    <div className="space-y-1">
                      <div className="w-28 border-b-2 border-[#162E22] pb-1 text-[#9E3D28] font-serif italic text-xs font-bold">
                        Tour Director
                      </div>
                      <span className="text-[9px] font-bold text-[#162E22] uppercase tracking-wider block">
                        Authorized Signatory
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
