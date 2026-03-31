"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { VeltroLogo } from "@/components/brand/VeltroLogo";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { mainNav } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const isAnimatingRef = useRef(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => {
    if (isAnimatingRef.current) return;
    setMobileOpen(true);
    setMenuVisible(true);

    if (reducedMotion) return;

    isAnimatingRef.current = true;
    requestAnimationFrame(() => {
      const tl = gsap.timeline({
        onComplete: () => { isAnimatingRef.current = false; },
      });

      // Backdrop fade in
      if (backdropRef.current) {
        gsap.set(backdropRef.current, { opacity: 0 });
        tl.to(backdropRef.current, { opacity: 1, duration: 0.25, ease: "power3.out" }, 0);
      }

      // Panel scale from top-right
      if (menuRef.current) {
        gsap.set(menuRef.current, { scale: 0.95, opacity: 0, transformOrigin: "top right" });
        tl.to(menuRef.current, { scale: 1, opacity: 1, duration: 0.25, ease: "power3.out" }, 0);
      }

      // Stagger menu items
      if (menuRef.current) {
        const items = menuRef.current.querySelectorAll(".mobile-menu-item");
        gsap.set(items, { opacity: 0, y: 8 });
        tl.to(items, { opacity: 1, y: 0, stagger: 0.04, duration: 0.25, ease: "power3.out" }, 0.05);
      }
    });
  };

  const closeMenu = () => {
    if (isAnimatingRef.current) return;

    if (reducedMotion) {
      setMobileOpen(false);
      setMenuVisible(false);
      return;
    }

    isAnimatingRef.current = true;
    const tl = gsap.timeline({
      onComplete: () => {
        setMobileOpen(false);
        setMenuVisible(false);
        isAnimatingRef.current = false;
        hamburgerRef.current?.focus();
      },
    });

    // Fade out items fast
    if (menuRef.current) {
      const items = menuRef.current.querySelectorAll(".mobile-menu-item");
      tl.to(items, { opacity: 0, duration: 0.1 }, 0);
    }

    // Scale down panel
    if (menuRef.current) {
      tl.to(menuRef.current, { scale: 0.95, opacity: 0, duration: 0.2, ease: "power2.inOut" }, 0.05);
    }

    // Fade out backdrop
    if (backdropRef.current) {
      tl.to(backdropRef.current, { opacity: 0, duration: 0.2, ease: "power2.inOut" }, 0.05);
    }
  };

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
    document.body.style.overflow = menuVisible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuVisible]);

  // Focus trap + Escape key for mobile menu
  useEffect(() => {
    if (!menuVisible || !menuRef.current) return;

    const menuEl = menuRef.current;

    // Focus first link after animation settles
    const focusTimer = setTimeout(() => {
      const firstLink = menuEl.querySelector<HTMLElement>("a, button");
      firstLink?.focus();
    }, reducedMotion ? 0 : 300);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }

      if (e.key !== "Tab") return;

      const focusable = menuEl.querySelectorAll<HTMLElement>("a, button");
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuVisible, reducedMotion]);

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
        <div className="hidden items-center gap-5 md:flex">
          {mainNav.map((item) => {
            const isActive = item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "link-lift relative pb-1 font-body text-sm transition-opacity hover:opacity-100",
                  isActive
                    ? "font-semibold opacity-100"
                    : "font-medium opacity-70"
                )}
              >
                {item.title}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-clay" />
                )}
              </Link>
            );
          })}
          <Link
            href="https://app.getveltro.com/#/login"
            className="link-lift font-body text-sm font-medium opacity-70 transition-opacity hover:opacity-100"
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
          ref={hamburgerRef}
          className="flex items-center justify-center min-h-[44px] min-w-[44px] md:hidden"
          onClick={() => (mobileOpen ? closeMenu() : openMenu())}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile backdrop */}
      {menuVisible && (
        <div
          ref={backdropRef}
          className="fixed inset-0 z-40 bg-charcoal/50 backdrop-blur-sm md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu */}
      {menuVisible && (
        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed left-4 right-4 top-16 z-40 flex flex-col gap-4 rounded-[2rem] border border-cream-300 bg-cream/95 p-6 shadow-xl backdrop-blur-xl md:hidden"
        >
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="mobile-menu-item border-b border-cream-300 py-3 font-body text-base font-medium text-charcoal last:border-0"
            >
              {link.title}
            </Link>
          ))}
          <Link
            href="https://app.getveltro.com/#/login"
            onClick={closeMenu}
            className="mobile-menu-item border-b border-cream-300 py-3 font-body text-base font-medium text-charcoal"
          >
            Login
          </Link>
          <MagneticButton
            href="/demo"
            variant="clay"
            size="md"
            className="mobile-menu-item mt-2 w-full"
          >
            Start Trial
          </MagneticButton>
        </div>
      )}
    </>
  );
}
