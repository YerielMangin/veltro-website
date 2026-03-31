"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        ".hero-line-1",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          ".hero-line-2",
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, ease: "power3.out" },
          "-=0.65"
        )
        .fromTo(
          ".hero-cta",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.3"
        );

      gsap.to(".hero-scroll", {
        y: 8,
        duration: 1.2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

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
        <p className="hero-line-1 font-heading text-3xl font-bold tracking-tight text-cream opacity-0 md:text-5xl lg:text-6xl">
          Your operation has a
        </p>
        <p className="hero-line-2 mt-2 font-display text-6xl italic leading-[0.9] tracking-tight text-cream opacity-0 md:text-8xl lg:text-[10rem]">
          Rhythm.
        </p>
        <div className="hero-cta mt-10 opacity-0">
          <MagneticButton href="/demo" variant="clay" size="lg">
            Start Your 14-Day Trial
          </MagneticButton>
        </div>
        <p className="hero-sub mt-4 font-mono text-sm text-cream/50 opacity-0">
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
