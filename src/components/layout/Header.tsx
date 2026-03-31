"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { VeltroLogo } from "@/components/brand/VeltroLogo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { mainNav } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <div ref={sentinelRef} className="pointer-events-none absolute left-0 top-0 h-1 w-full" />

      <nav
        aria-label="Main navigation"
        className={cn(
          "fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-4 rounded-full px-4 py-3 transition-all duration-500 ease-out md:gap-8 md:px-6",
          scrolled
            ? "border border-cream-300 bg-cream/80 text-charcoal shadow-lg backdrop-blur-xl"
            : "bg-transparent text-cream"
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-lg font-bold tracking-tight"
          aria-label="Veltro home"
        >
          <VeltroLogo size={24} />
          Veltro
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {mainNav.slice(0, 3).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "link-lift font-body text-sm font-medium opacity-80 transition-opacity hover:opacity-100",
                pathname === item.href && "opacity-100"
              )}
            >
              {item.title}
            </Link>
          ))}
          <Link
            href="https://app.getveltro.com/#/login"
            className="link-lift font-body text-sm font-medium opacity-80 transition-opacity hover:opacity-100"
          >
            Login
          </Link>
        </div>

        <MagneticButton
          href="/demo"
          variant={scrolled ? "clay" : "outline-cream"}
          size="md"
          className="hidden md:inline-flex"
        >
          Start Trial
        </MagneticButton>

        {/* Mobile hamburger */}
        <button
          className="flex items-center justify-center min-h-[44px] min-w-[44px] md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div id="mobile-menu" className="fixed left-4 right-4 top-16 z-40 flex flex-col gap-4 rounded-[2rem] border border-cream-300 bg-cream/95 p-6 shadow-xl backdrop-blur-xl md:hidden">
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="border-b border-cream-300 py-3 font-body text-base font-medium text-charcoal last:border-0"
            >
              {link.title}
            </Link>
          ))}
          <Link
            href="https://app.getveltro.com/#/login"
            onClick={() => setMobileOpen(false)}
            className="border-b border-cream-300 py-3 font-body text-base font-medium text-charcoal"
          >
            Login
          </Link>
          <MagneticButton
            href="/demo"
            variant="clay"
            size="md"
            className="mt-2 w-full"
          >
            Start Trial
          </MagneticButton>
        </div>
      )}
    </>
  );
}
