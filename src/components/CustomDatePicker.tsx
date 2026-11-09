import React, { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Locale } from "../types";

interface CustomDatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
  placeholder?: string;
  minDate?: string; // YYYY-MM-DD
  locale?: Locale;
  error?: string;
  id?: string;
  name?: string;
  className?: string;
  ariaLabel?: string;
}

const MONTH_NAMES = {
  en: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ],
  kn: [
    "ಜನವರಿ", "ಫೆಬ್ರವರಿ", "ಮಾರ್ಚ್", "ಏಪ್ರಿಲ್", "ಮೇ", "ಜೂನ್",
    "ಜುಲೈ", "ಆಗಸ್ಟ್", "ಸೆಪ್ಟೆಂಬರ್", "ಅಕ್ಟೋಬರ್", "ನವೆಂಬರ್", "ಡಿಸೆಂಬರ್"
  ]
};

const WEEKDAY_NAMES = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  kn: ["ರವಿ", "ಸೋಮ", "ಮಂಗಳ", "ಬುಧ", "ಗುರು", "ಶುಕ್ರ", "ಶನಿ"]
};

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  placeholder = "Select travel date",
  minDate,
  locale = "en",
  error,
  id,
  name,
  className = "",
  ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize view month/year based on value or today
  const initialDate = value ? new Date(value + "T00:00:00") : new Date();
  const [viewYear, setViewYear] = useState(
    isNaN(initialDate.getFullYear()) ? new Date().getFullYear() : initialDate.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(
    isNaN(initialDate.getMonth()) ? new Date().getMonth() : initialDate.getMonth()
  );

  // Sync view when value changes
  useEffect(() => {
    if (value) {
      const parsed = new Date(value + "T00:00:00");
      if (!isNaN(parsed.getTime())) {
        setViewYear(parsed.getFullYear());
        setViewMonth(parsed.getMonth());
      }
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  // Format date helper: YYYY-MM-DD
  const formatDateKey = (year: number, month: number, day: number) => {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
  };

  // Friendly display label
  const getDisplayValue = () => {
    if (!value) return "";
    const [y, m, d] = value.split("-").map(Number);
    if (!y || !m || !d) return value;
    const monthName = MONTH_NAMES[locale]?.[m - 1] || MONTH_NAMES.en[m - 1];
    return locale === "kn"
      ? `${d} ${monthName} ${y}`
      : `${monthName.slice(0, 3)} ${d}, ${y}`;
  };

  // Calendar matrix calculation
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay(); // 0 = Sun
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  // Today reference
  const today = new Date();
  const todayKey = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  const handleSelectDay = (day: number) => {
    const selectedKey = formatDateKey(viewYear, viewMonth, day);
    onChange(selectedKey);
    setIsOpen(false);
  };

  const handleSelectToday = () => {
    onChange(todayKey);
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange("");
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {name && <input type="hidden" name={name} value={value} />}

      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={ariaLabel || placeholder}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full px-4 py-3 rounded-xl bg-white text-sm font-medium text-[#162E22] flex items-center justify-between text-left transition-all duration-200 outline-none shadow-xs cursor-pointer ${
          error
            ? "border-2 border-[#9E3D28] ring-2 ring-[#9E3D28]/15"
            : isOpen
            ? "border-2 border-[#D4AF37] ring-2 ring-[#D4AF37]/20 shadow-md"
            : "border border-[#263F32]/20 hover:border-[#D4AF37]/80"
        }`}
        data-cursor="Date"
      >
        <span className={value ? "text-[#162E22] font-semibold" : "text-[#252923]/40"}>
          {value ? getDisplayValue() : placeholder}
        </span>
        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {value && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              className="p-1 rounded-full hover:bg-[#9E3D28]/10 text-[#9E3D28] transition-colors cursor-pointer"
              title="Clear date"
            >
              <X className="w-3.5 h-3.5" />
            </span>
          )}
          <CalendarIcon
            className={`w-4 h-4 transition-colors ${
              isOpen ? "text-[#D4AF37]" : "text-[#162E22]/70"
            }`}
          />
        </div>
      </button>

      {/* Calendar Popover */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Calendar date picker"
          className="absolute z-50 left-0 sm:left-auto sm:right-0 mt-1.5 w-72 sm:w-80 bg-[#FBF8F1] rounded-2xl border border-[#D4AF37]/60 shadow-2xl p-4 backdrop-blur-md animate-fade-in"
        >
          {/* Header: Month / Year + Prev/Next Controls */}
          <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-[#263F32]/10">
            <h4 className="font-serif-editorial font-bold text-base text-[#162E22] tracking-tight">
              {MONTH_NAMES[locale]?.[viewMonth] || MONTH_NAMES.en[viewMonth]} {viewYear}
            </h4>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prevMonth}
                aria-label="Previous month"
                className="w-7 h-7 rounded-lg bg-white border border-[#263F32]/15 text-[#162E22] hover:bg-[#162E22] hover:text-[#F5D77F] hover:border-[#D4AF37] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextMonth}
                aria-label="Next month"
                className="w-7 h-7 rounded-lg bg-white border border-[#263F32]/15 text-[#162E22] hover:bg-[#162E22] hover:text-[#F5D77F] hover:border-[#D4AF37] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {WEEKDAY_NAMES[locale]?.map((day) => (
              <span
                key={day}
                className="text-[10.5px] font-bold text-[#9E3D28] uppercase tracking-wider py-1"
              >
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Days from previous month */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => {
              const dayNum = daysInPrevMonth - firstDayOfWeek + i + 1;
              return (
                <div
                  key={`prev-${i}`}
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-xs text-[#252923]/25 select-none mx-auto"
                >
                  {dayNum}
                </div>
              );
            })}

            {/* Days of current month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateKey = formatDateKey(viewYear, viewMonth, dayNum);
              const isSelected = value === dateKey;
              const isToday = todayKey === dateKey;
              const isPast = minDate && dateKey < minDate;

              return (
                <button
                  key={`cur-${dayNum}`}
                  type="button"
                  disabled={Boolean(isPast)}
                  onClick={() => handleSelectDay(dayNum)}
                  className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-all mx-auto cursor-pointer ${
                    isSelected
                      ? "bg-[#162E22] text-[#F5D77F] ring-2 ring-[#D4AF37] font-bold shadow-xs scale-105"
                      : isToday
                      ? "border border-[#D4AF37] font-bold text-[#162E22] hover:bg-[#D4AF37]/20"
                      : isPast
                      ? "text-[#252923]/25 cursor-not-allowed"
                      : "text-[#162E22] hover:bg-[#D4AF37]/20 hover:text-[#162E22]"
                  }`}
                  data-cursor={isPast ? undefined : "Pick"}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>

          {/* Footer Actions: Today & Clear */}
          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#263F32]/10 text-xs">
            <button
              type="button"
              onClick={handleClear}
              className="font-bold text-[#9E3D28] hover:text-[#9E3D28]/80 transition-colors uppercase tracking-wider text-[11px] cursor-pointer"
            >
              {locale === "kn" ? "ರದ್ದುಮಾಡಿ" : "Clear"}
            </button>
            <button
              type="button"
              onClick={handleSelectToday}
              className="font-bold text-[#162E22] hover:text-[#D4AF37] transition-colors uppercase tracking-wider text-[11px] cursor-pointer"
            >
              {locale === "kn" ? "ಇಂದು" : "Today"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
