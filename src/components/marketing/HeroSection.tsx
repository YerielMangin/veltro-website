"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;
    if (reducedMotion) return; // content is visible by default

    const ctx = gsap.context(() => {
      // Set initial hidden state via GSAP (not CSS) — progressive enhancement
      gsap.set(".hero-line-1, .hero-line-2, .hero-cta, .hero-sub", { opacity: 0 });
      gsap.set(".hero-line-1", { y: 40 });
      gsap.set(".hero-line-2", { y: 60 });
      gsap.set(".hero-cta", { y: 30 });

      const tl = gsap.timeline({ delay: 0.15 });

      tl.to(".hero-line-1", {
        y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
      })
        .to(
          ".hero-line-2",
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.45"
        )
        .to(
          ".hero-cta",
          { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
          "-=0.3"
        )
        .to(
          ".hero-sub",
          { opacity: 1, duration: 0.4 },
          "-=0.2"
        );

      gsap.to(".hero-scroll", {
        y: 8,
        duration: 1.2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 3,
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-dvh items-end overflow-hidden"
    >
      {/* Background gradient — replace with image when ready */}
      <div className="absolute inset-0 bg-gradient-to-br from-moss-800 via-moss to-moss-400" />
      <div className="absolute inset-0 bg-gradient-to-t from-moss-900/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl p-8 md:p-16 lg:p-24">
        <h1>
          <span className="hero-line-1 block font-heading text-3xl font-bold tracking-tight text-cream md:text-5xl lg:text-6xl">
            Your operation has a
          </span>
          <span className="hero-line-2 mt-2 block font-display text-6xl italic leading-[0.9] tracking-tight text-cream md:text-8xl lg:text-[10rem]">
            Rhythm.
          </span>
        </h1>
        <div className="hero-cta mt-10">
          <MagneticButton href="/demo" variant="clay" size="lg">
            Start Your 14-Day Trial
          </MagneticButton>
        </div>
        <p className="hero-sub mt-4 font-mono text-sm text-cream/70">
          No credit card required
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/40">
        <ChevronDown size={28} strokeWidth={1.5} />
      </div>
    </section>
  );
}
