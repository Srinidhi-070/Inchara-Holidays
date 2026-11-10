import React, { useState } from 'react';
import { InquiryRecord, PaymentRecord } from '../../types/inquiry';
import {
  getPaymentsForInquiry,
  recordNewPayment,
  getPaymentSummary,
} from '../../services/quotationService';
import { Printer, X, Plus, CheckCircle2, ShieldCheck } from 'lucide-react';
import { AmbariElephant, LotusIcon } from '../SouthIndianMotifs';

interface PaymentReceiptModalProps {
  inquiry: InquiryRecord;
  totalQuotedAmount?: number;
  onClose: () => void;
  onPaymentRecorded?: (payment: PaymentRecord) => void;
}

/**
 * Converts Indian Rupee number to standard formal words
 */
function numberToWordsINR(num: number): string {
  const a = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  if (num === 0) return 'Zero';

  function convertTwoDigits(n: number): string {
    if (n < 20) return a[n];
    return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
  }

  function convertThreeDigits(n: number): string {
    let str = '';
    if (Math.floor(n / 100) > 0) {
      str += a[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    if (n > 0) {
      str += convertTwoDigits(n);
    }
    return str.trim();
  }

  let words = '';
  const crore = Math.floor(num / 10000000);
  num %= 10000000;
  const lakh = Math.floor(num / 100000);
  num %= 100000;
  const thousand = Math.floor(num / 1000);
  num %= 1000;

  if (crore > 0) words += convertTwoDigits(crore) + ' Crore ';
  if (lakh > 0) words += convertTwoDigits(lakh) + ' Lakh ';
  if (thousand > 0) words += convertTwoDigits(thousand) + ' Thousand ';
  if (num > 0) words += convertThreeDigits(num);

  return 'Rupees ' + words.trim() + ' Only';
}

export const PaymentReceiptModal: React.FC<PaymentReceiptModalProps> = ({
  inquiry,
  totalQuotedAmount = 50200,
  onClose,
  onPaymentRecorded,
}) => {
  const [summary, setSummary] = useState(() => getPaymentSummary(inquiry.id, totalQuotedAmount));
  const [isAdding, setIsAdding] = useState(summary.paymentsCount === 0);

  // New payment form fields
  const [amount, setAmount] = useState<number>(15000);
  const [paymentType, setPaymentType] = useState<PaymentRecord['paymentType']>('advance_token');
  const [paymentMode, setPaymentMode] = useState<PaymentRecord['paymentMode']>('upi');
  const [transactionRef, setTransactionRef] = useState<string>('UPI/532918841029');
  const [paymentDate, setPaymentDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [notes, setNotes] = useState<string>('Advance booking token for tour reservation');

  // Currently viewed receipt
  const [activeReceipt, setActiveReceipt] = useState<PaymentRecord | null>(
    summary.payments[0] || null
  );

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;

    const recorded = recordNewPayment({
      inquiryId: inquiry.id,
      customerName: inquiry.customerName,
      amount: Number(amount),
      paymentType,
      paymentMode,
      transactionRef,
      paymentDate,
      verifiedBy: 'Inchara Accounts Desk',
      notes,
    });

    const updatedSummary = getPaymentSummary(inquiry.id, totalQuotedAmount);
    setSummary(updatedSummary);
    setActiveReceipt(recorded);
    setIsAdding(false);

    if (onPaymentRecorded) onPaymentRecorded(recorded);
  };

  const handlePrint = () => {
    window.print();
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
          body {
            background: #ffffff !important;
            color: #111111 !important;
            visibility: hidden !important;
          }
          #official-payment-receipt,
          #official-payment-receipt * {
            visibility: visible !important;
          }
          #official-payment-receipt {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 16px 20px !important;
            box-shadow: none !important;
            border: 1.5px solid #162E22 !important;
            border-radius: 8px !important;
            background: #ffffff !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: avoid !important;
          }
        }
      `}</style>

      <div className="relative w-full max-w-3xl bg-white sm:rounded-3xl shadow-2xl flex flex-col my-auto max-h-[95vh] overflow-hidden border border-[#D4AF37]/40 print:max-w-none print:max-h-none print:border-none print:shadow-none print:rounded-none">
        {/* Top Control Bar (Hidden on print) */}
        <div className="p-4 bg-[#162E22] text-[#F6F3EA] border-b border-[#D4AF37]/30 flex items-center justify-between shrink-0 print:hidden">
          <div className="flex items-center gap-2.5">
            <AmbariElephant className="w-6 h-6 text-[#F5D77F]" />
            <div>
              <span className="font-bold text-xs uppercase tracking-wider text-[#F5D77F]">
                Payment Ledger & Receipt Management
              </span>
              <div className="text-[11px] text-white/70">
                Customer: {inquiry.customerName} ({inquiry.referenceNumber})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isAdding && activeReceipt && (
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#D4AF37] hover:brightness-105 text-[#162E22] font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt (A4 Portrait)</span>
              </button>
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
          {/* Summary Balance Strip (Hidden on print) */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[#162E22] text-[#F6F3EA] shadow-xs print:hidden">
            <div>
              <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider">Total Quoted</span>
              <div className="text-base sm:text-lg font-mono font-bold text-white">
                ₹{summary.totalQuotedAmount.toLocaleString('en-IN')}
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#F5D77F] tracking-wider">Total Paid</span>
              <div className="text-base sm:text-lg font-mono font-bold text-emerald-400">
                ₹{summary.totalPaid.toLocaleString('en-IN')}
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider">Balance Due</span>
              <div className="text-base sm:text-lg font-mono font-bold text-[#F5D77F]">
                ₹{summary.balanceDue.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {/* Action Tabs for Staff: "New Payment" vs "View Receipt" (Hidden on print) */}
          <div className="flex items-center justify-between border-b border-[#263F32]/10 pb-3 print:hidden">
            <div className="flex items-center gap-2 flex-wrap">
              {summary.payments.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setActiveReceipt(p);
                    setIsAdding(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                    !isAdding && activeReceipt?.id === p.id
                      ? 'bg-[#162E22] text-[#F5D77F] border-[#D4AF37]'
                      : 'bg-white text-[#252923]/70 border-[#263F32]/10 hover:border-[#D4AF37]'
                  }`}
                >
                  Receipt #{p.receiptNumber} (₹{p.amount.toLocaleString('en-IN')})
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="px-3 py-1.5 rounded-xl bg-[#D4AF37] hover:bg-[#C5A028] text-[#162E22] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record New Payment</span>
            </button>
          </div>

          {/* MODE 1: Record New Payment Form */}
          {isAdding ? (
            <form onSubmit={handleRecordPayment} className="p-5 rounded-2xl bg-white border border-[#D4AF37]/35 space-y-4 shadow-sm print:hidden">
              <h3 className="font-bold text-sm text-[#162E22] uppercase tracking-wider">
                Record Inward Payment Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-[#162E22] mb-1">
                    Amount Received (₹) *
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#263F32]/15 text-xs text-[#162E22] font-mono font-bold focus:border-[#D4AF37] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#162E22] mb-1">
                    Payment Category *
                  </label>
                  <select
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-[#263F32]/15 text-xs text-[#162E22] bg-white focus:outline-hidden"
                  >
                    <option value="advance_token">Advance Booking Token</option>
                    <option value="part_payment">Part Installment</option>
                    <option value="final_settlement">Final Tour Settlement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#162E22] mb-1">
                    Payment Mode *
                  </label>
                  <select
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-[#263F32]/15 text-xs text-[#162E22] bg-white focus:outline-hidden uppercase"
                  >
                    <option value="upi">UPI (GPay / PhonePe / Paytm)</option>
                    <option value="neft">NEFT Bank Transfer</option>
                    <option value="rtgs">RTGS Real-Time Transfer</option>
                    <option value="imps">IMPS Instant Transfer</option>
                    <option value="cheque">Bank Cheque / Draft</option>
                    <option value="cash">Direct Office Cash Deposit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#162E22] mb-1">
                    Transaction Reference / UTR Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    placeholder="e.g. UTR / Bank Reference Number"
                    className="w-full px-3 py-2 rounded-xl border border-[#263F32]/15 text-xs text-[#162E22] font-mono focus:border-[#D4AF37] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#162E22] mb-1">
                    Payment Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#263F32]/15 text-xs text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#162E22] mb-1">
                    Staff Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#263F32]/15 text-xs text-[#162E22] focus:border-[#D4AF37] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                {summary.paymentsCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="px-3 py-2 rounded-xl border border-[#263F32]/15 text-xs font-semibold text-[#252923]/70 hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#162E22] hover:bg-[#263F32] text-[#F5D77F] font-bold text-xs uppercase tracking-wider cursor-pointer shadow-sm"
                >
                  Save & Issue Official Receipt
                </button>
              </div>
            </form>
          ) : activeReceipt ? (
            /* =========================================================================
               MODE 2: GENUINE SINGLE-PAGE A4 PORTRAIT OFFICIAL PAYMENT RECEIPT
               Strictly isolated for printing, fits on 1 page with official seals & ledger
               ========================================================================= */
            <div
              id="official-payment-receipt"
              className="border-2 border-[#162E22] rounded-2xl p-6 sm:p-7 bg-white shadow-md space-y-4 text-[#162E22]"
            >
              {/* Receipt Header */}
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
                      Sayyaji Rao Road, Near Mysuru Palace, Mysuru – 570001, Karnataka · +91 99000 00000
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="inline-block px-3 py-1 rounded-md bg-[#162E22] text-[#F5D77F] font-bold text-[10px] uppercase tracking-wider mb-1">
                    Payment Receipt
                  </div>
                  <div className="font-mono font-bold text-base text-[#162E22]">
                    #{activeReceipt.receiptNumber}
                  </div>
                  <div className="text-[10px] text-[#252923]/70">
                    Date: <strong>{new Date(activeReceipt.paymentDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</strong>
                  </div>
                  <div className="text-[9px] text-emerald-800 font-bold uppercase tracking-wider flex items-center justify-end gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
                    <span>Inward Verified</span>
                  </div>
                </div>
              </div>

              {/* Guest & Booking Particulars */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-[#FBF8F1] p-3.5 rounded-xl border border-[#D4AF37]/30">
                <div>
                  <span className="text-[9px] uppercase font-bold text-[#9E3D28] tracking-wider block mb-0.5">
                    Received With Thanks From:
                  </span>
                  <div className="font-bold text-sm text-[#162E22]">{inquiry.customerName}</div>
                  <div className="font-mono text-[11px] text-[#252923]/80">Phone: {inquiry.phone}</div>
                  {inquiry.email && <div className="text-[11px] text-[#252923]/80">Email: {inquiry.email}</div>}
                </div>

                <div className="text-right sm:text-left sm:pl-4 sm:border-l sm:border-[#D4AF37]/20">
                  <span className="text-[9px] uppercase font-bold text-[#9E3D28] tracking-wider block mb-0.5">
                    Tour & Booking Reference:
                  </span>
                  <div className="font-mono font-bold text-sm text-[#162E22]">
                    {inquiry.referenceNumber}
                  </div>
                  <div className="text-[11px] text-[#252923]/80 capitalize">
                    Category: <strong>{inquiry.serviceCategory} Tour</strong>
                  </div>
                  <div className="text-[11px] text-[#252923]/80">
                    Destination: <strong>{(inquiry.servicePayload?.destination as string) || inquiry.serviceType || 'South Indian Circuit'}</strong>
                  </div>
                </div>
              </div>

              {/* Transaction Breakdown Table */}
              <div className="border border-[#162E22]/20 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#162E22] text-[#F5D77F] text-[10px] uppercase tracking-wider">
                      <th className="py-2 px-3 font-bold">Sl</th>
                      <th className="py-2 px-3 font-bold">Payment Description</th>
                      <th className="py-2 px-3 font-bold">Mode & Ref / UTR</th>
                      <th className="py-2 px-3 font-bold text-right">Amount (INR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#162E22]/10 bg-white">
                    <tr>
                      <td className="py-2.5 px-3 font-mono">01</td>
                      <td className="py-2.5 px-3">
                        <strong className="text-[#162E22] capitalize">
                          {activeReceipt.paymentType.replace('_', ' ')}
                        </strong>
                        <div className="text-[10px] text-[#252923]/70">{activeReceipt.notes || 'Tour confirmation deposit'}</div>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px]">
                        <span className="uppercase font-bold text-[#162E22]">{activeReceipt.paymentMode}</span>
                        <div className="text-[10px] text-[#252923]/70">{activeReceipt.transactionRef}</div>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-right text-sm text-[#162E22]">
                        ₹{activeReceipt.amount.toLocaleString('en-IN')}.00
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="bg-[#F6F3EA] border-t-2 border-[#162E22]">
                      <td colSpan={3} className="py-2 px-3 text-[11px] font-bold text-[#162E22] uppercase tracking-wide">
                        Total Amount Received
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-base text-[#162E22]">
                        ₹{activeReceipt.amount.toLocaleString('en-IN')}.00
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Amount In Words Strip */}
              <div className="p-2.5 rounded-lg bg-[#FBF8F1] border border-[#D4AF37]/30 text-xs flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-bold text-[#9E3D28] uppercase tracking-wider block">
                    Amount in Words:
                  </span>
                  <span className="font-semibold text-xs text-[#162E22] italic">
                    {numberToWordsINR(activeReceipt.amount)}
                  </span>
                </div>
                <div className="font-mono text-[11px] font-bold text-[#162E22] bg-white px-2.5 py-1 rounded border border-[#162E22]/15">
                  100% PURE VEG GUARANTEE
                </div>
              </div>

              {/* Current Ledger Balance Summary */}
              <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-[#162E22] text-[#F6F3EA] text-center text-xs">
                <div>
                  <span className="text-[9px] uppercase font-semibold text-white/60 block">Total Quoted Tour Value</span>
                  <span className="font-mono font-bold text-sm text-white">
                    ₹{summary.totalQuotedAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="border-x border-white/15">
                  <span className="text-[9px] uppercase font-semibold text-emerald-400 block">Total Settled to Date</span>
                  <span className="font-mono font-bold text-sm text-emerald-400">
                    ₹{summary.totalPaid.toLocaleString('en-IN')}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-semibold text-[#F5D77F] block">Balance Outstanding</span>
                  <span className="font-mono font-bold text-sm text-[#F5D77F]">
                    ₹{summary.balanceDue.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Receipt Terms & Signatures (Clean Single Page Layout) */}
              <div className="pt-2 border-t border-[#162E22]/15 flex items-end justify-between text-[10px] text-[#252923]/70">
                <div className="max-w-xs space-y-0.5">
                  <div className="font-semibold text-[#162E22]">Terms & Notes:</div>
                  <div>1. Valid proof of inward advance settlement for tour confirmation.</div>
                  <div>2. Verified by: <strong>{activeReceipt.verifiedBy}</strong></div>
                  <div>3. All bookings governed by Inchara customary advisory terms.</div>
                </div>

                {/* Stamp & Authorized Signature */}
                <div className="flex items-center gap-6 text-center">
                  {/* Circular Stamp Graphic */}
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#162E22] text-[#162E22] flex flex-col items-center justify-center p-1 select-none">
                    <span className="text-[7px] font-bold uppercase tracking-widest leading-none">INCHARA</span>
                    <span className="text-[6px] uppercase tracking-tighter text-[#9E3D28] font-bold">MYSURU</span>
                    <span className="text-[7px] font-bold uppercase tracking-widest leading-none mt-0.5">ACCOUNTS</span>
                  </div>

                  <div className="space-y-1">
                    <div className="w-28 border-b-2 border-[#162E22] pb-1 text-[#9E3D28] font-serif italic text-xs font-bold">
                      Accounts Desk
                    </div>
                    <span className="text-[9px] font-bold text-[#162E22] uppercase tracking-wider block">
                      Authorized Signatory
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-[#252923]/60">
              No payments recorded yet for this inquiry.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
