import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface OptionItem {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: OptionItem[];
  placeholder?: string;
  error?: string;
  id?: string;
  name?: string;
  className?: string;
  ariaLabel?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Choose an option",
  error,
  id,
  name,
  className = "",
  ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

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

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Hidden native input for form accessibility if needed */}
      {name && <input type="hidden" name={name} value={value} />}

      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={ariaLabel || placeholder}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full px-4 py-3 rounded-xl bg-white text-sm font-medium text-[#162E22] flex items-center justify-between text-left transition-all duration-200 outline-none shadow-xs cursor-pointer ${
          error
            ? "border-2 border-[#9E3D28] ring-2 ring-[#9E3D28]/15"
            : isOpen
            ? "border-2 border-[#D4AF37] ring-2 ring-[#D4AF37]/20 shadow-md"
            : "border border-[#263F32]/20 hover:border-[#D4AF37]/80"
        }`}
        data-cursor="Select"
      >
        <span className={selectedOption ? "text-[#162E22] font-medium" : "text-[#252923]/40"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 shrink-0 ml-2 ${
            isOpen ? "rotate-180 text-[#D4AF37]" : "text-[#162E22]/60"
          }`}
        />
      </button>

      {/* Dropdown Menu Popup */}
      {isOpen && (
        <div
          role="listbox"
          tabIndex={-1}
          className="absolute z-50 left-0 right-0 mt-1.5 bg-[#FBF8F1] rounded-2xl border border-[#D4AF37]/50 shadow-2xl py-1.5 max-h-60 overflow-y-auto backdrop-blur-md animate-fade-in"
        >
          {/* Default/Placeholder Option to clear selection */}
          <div
            role="option"
            aria-selected={!value}
            onClick={() => handleSelect("")}
            className={`px-3.5 py-2.5 rounded-xl mx-1.5 my-0.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-between ${
              !value
                ? "bg-[#162E22] text-[#F5D77F]"
                : "text-[#252923]/60 hover:bg-[#D4AF37]/15 hover:text-[#162E22]"
            }`}
          >
            <span>{placeholder}</span>
            {!value && <Check className="w-3.5 h-3.5 text-[#D4AF37] stroke-[3]" />}
          </div>

          {/* Divider */}
          <div className="h-px bg-[#263F32]/10 my-1 mx-2" />

          {/* Options List */}
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(opt.value)}
                className={`px-3.5 py-2.5 rounded-xl mx-1.5 my-0.5 text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? "bg-[#162E22] text-[#F5D77F] font-bold shadow-xs border border-[#D4AF37]/40"
                    : "text-[#162E22] hover:bg-[#D4AF37]/15 hover:text-[#162E22] active:scale-[0.99]"
                }`}
                data-cursor="Choose"
              >
                <span>{opt.label}</span>
                {isSelected && <Check className="w-4 h-4 text-[#D4AF37] stroke-[2.5]" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
