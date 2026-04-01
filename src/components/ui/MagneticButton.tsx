"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  clay: {
    base: "bg-clay text-cream",
    hover: "bg-clay-600",
    btnClass: "",
  },
  moss: {
    base: "bg-moss text-cream",
    hover: "bg-moss-600",
    btnClass: "",
  },
  outline: {
    base: "bg-transparent border-2 border-charcoal text-charcoal",
    hover: "bg-charcoal",
    btnClass: "btn-outline",
  },
  "outline-cream": {
    base: "bg-transparent border-2 border-cream/30 text-cream",
    hover: "bg-cream/20",
    btnClass: "btn-outline-cream",
  },
} as const;

const sizes = {
  md: "px-6 py-3 text-sm rounded-full",
  lg: "px-8 py-4 text-base rounded-full",
} as const;

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function MagneticButton({
  children,
  href,
  variant = "clay",
  size = "md",
  className = "",
  onClick,
  type = "button",
}: MagneticButtonProps) {
  const v = variants[variant];
  const s = sizes[size];
  const classes = cn("btn-magnetic", v.btnClass, v.base, s, className);

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          <span className={cn("btn-bg", v.hover)} />
          <span className="btn-label">{children}</span>
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        <span className={cn("btn-bg", v.hover)} />
        <span className="btn-label">{children}</span>
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} type={type}>
      <span className={cn("btn-bg", v.hover)} />
      <span className="btn-label">{children}</span>
    </button>
  );
}
