import React, { useState } from 'react';
import { InquiryRecord, PaymentRecord } from '../../types/inquiry';
import {
  getPaymentsForInquiry,
  recordNewPayment,
  getPaymentSummary,
} from '../../services/quotationService';
import { Printer, X, Check, Plus, Receipt, ShieldCheck } from 'lucide-react';
import { AmbariElephant } from '../SouthIndianMotifs';

interface PaymentReceiptModalProps {
  inquiry: InquiryRecord;
  totalQuotedAmount?: number;
  onClose: () => void;
  onPaymentRecorded?: (payment: PaymentRecord) => void;
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
                className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#C5A028] text-[#162E22] font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save Receipt</span>
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
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#252923] bg-[#FCFBF8] print:p-0 print:overflow-visible print:bg-white">
          {/* Summary Balance Strip (Hidden on print) */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#162E22] text-[#F6F3EA] shadow-xs print:hidden">
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
            <div className="flex items-center gap-2">
              {summary.payments.map((p, idx) => (
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
            /* MODE 2: Official Printable Payment Receipt */
            <div className="border border-[#263F32]/15 rounded-3xl p-6 sm:p-8 bg-white shadow-sm space-y-6 print:border-none print:shadow-none print:p-0">
              {/* Receipt Header */}
              <div className="border-b-2 border-[#162E22] pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#162E22] border border-[#D4AF37] flex items-center justify-center text-[#F5D77F] shrink-0">
                    <AmbariElephant className="w-7 h-7 text-[#F5D77F]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-serif font-bold text-[#162E22] leading-none">
                      INCHARA HOLIDAYS
                    </h2>
                    <p className="text-[11px] text-[#9E3D28] font-semibold mt-0.5">
                      Reg: KA-TO-2024-88419 · Sayyaji Rao Road, Mysuru
                    </p>
                    <p className="text-[10px] text-[#252923]/60">
                      Official Payment Acknowledgment & E-Receipt
                    </p>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <div className="font-mono font-bold text-sm text-[#162E22]">
                    Receipt #{activeReceipt.receiptNumber}
                  </div>
                  <div className="text-[11px] text-[#252923]/60">
                    Date: {new Date(activeReceipt.paymentDate).toLocaleDateString('en-IN')}
                  </div>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                    Payment Verified
                  </span>
                </div>
              </div>

              {/* Receipt Particulars Table */}
              <div className="grid grid-cols-2 gap-4 text-xs bg-[#FBF8F1] p-4 rounded-2xl border border-[#263F32]/8">
                <div>
                  <span className="text-[10px] text-[#252923]/50 uppercase font-semibold">Received From:</span>
                  <div className="font-bold text-sm text-[#162E22]">{inquiry.customerName}</div>
                  <div className="font-mono text-[11px] text-[#252923]/70">{inquiry.phone}</div>
                </div>
                <div>
                  <span className="text-[10px] text-[#252923]/50 uppercase font-semibold">Booking Reference:</span>
                  <div className="font-mono font-bold text-sm text-[#9E3D28]">{inquiry.referenceNumber}</div>
                  <div className="text-[11px] text-[#252923]/70 capitalize">{inquiry.serviceCategory} Tour</div>
                </div>
              </div>

              {/* Amount In Words & Figures */}
              <div className="p-4 rounded-2xl bg-[#162E22] text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#F5D77F] uppercase tracking-wider font-bold">Amount Received</span>
                  <div className="text-xs text-white/80 capitalize font-medium">
                    {activeReceipt.paymentType.replace('_', ' ')} · via {activeReceipt.paymentMode.toUpperCase()}
                  </div>
                  <div className="text-[11px] font-mono text-white/60 mt-0.5">
                    Ref / UTR: {activeReceipt.transactionRef}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-[#F5D77F]">
                    ₹{activeReceipt.amount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Ledger Summary */}
              <div className="border border-[#263F32]/10 rounded-xl p-3 text-xs flex items-center justify-between bg-white">
                <div>
                  <span className="text-[#252923]/60">Total Quoted Tour Value:</span>{' '}
                  <strong className="font-mono">₹{summary.totalQuotedAmount.toLocaleString('en-IN')}</strong>
                </div>
                <div>
                  <span className="text-[#252923]/60">Total Settled:</span>{' '}
                  <strong className="font-mono text-emerald-700">₹{summary.totalPaid.toLocaleString('en-IN')}</strong>
                </div>
                <div>
                  <span className="text-[#252923]/60">Balance Outstanding:</span>{' '}
                  <strong className="font-mono text-[#9E3D28]">₹{summary.balanceDue.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              {/* Receipt Footer */}
              <div className="pt-4 border-t border-[#263F32]/10 flex items-end justify-between text-xs">
                <div className="text-[11px] text-[#252923]/60 space-y-0.5">
                  <div>Verified by: <strong>{activeReceipt.verifiedBy}</strong></div>
                  <div>Thank you for choosing Inchara Holidays. Safe travels!</div>
                </div>
                <div className="text-center space-y-1">
                  <div className="w-24 h-8 border-b border-[#162E22] mx-auto text-[#9E3D28] font-serif italic text-xs flex items-end justify-center pb-0.5">
                    Accounts Desk
                  </div>
                  <span className="text-[10px] font-bold text-[#162E22] uppercase">Official Seal</span>
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
