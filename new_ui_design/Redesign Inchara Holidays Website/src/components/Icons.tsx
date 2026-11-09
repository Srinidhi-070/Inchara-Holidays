import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m7 10 5 5 5-5" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export function ServiceIcon({ id, ...props }: IconProps & { id: string }) {
  const paths: Record<string, React.ReactNode> = {
    holidays: (
      <>
        <path d="M4 17 9 6l3 7 2-4 6 8" />
        <path d="M3 19h18" />
      </>
    ),
    education: (
      <>
        <path d="m3 9 9-5 9 5-9 5-9-5Z" />
        <path d="M7 12v4c3 2 7 2 10 0v-4M21 9v6" />
      </>
    ),
    corporate: (
      <>
        <rect x="4" y="7" width="16" height="12" rx="2" />
        <path d="M9 7V5h6v2M4 12h16M10 12v2h4v-2" />
      </>
    ),
    transport: (
      <>
        <rect x="3" y="5" width="18" height="13" rx="3" />
        <path d="M7 18v2M17 18v2M6 14h.01M18 14h.01M3 10h18" />
      </>
    ),
    visa: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <circle cx="12" cy="11" r="3" />
        <path d="M9 17h6" />
      </>
    ),
    catering: (
      <>
        <path d="M4 11h16M6 11a6 6 0 0 1 12 0M3 17h18M12 5V3" />
      </>
    ),
  };
  return (
    <svg {...base} {...props}>
      {paths[id]}
    </svg>
  );
}
