"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function FeaturesHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(
        ".fh-line-1",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      ).fromTo(
        ".fh-line-2",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: "power3.out" },
        "-=0.65"
      ).fromTo(
        ".fh-sub",
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.3"
      );
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[70vh] min-h-[500px] items-end overflow-hidden bg-charcoal"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-200 to-moss-800" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent" />

      <div className="relative z-10 max-w-4xl p-8 md:p-16 lg:p-24">
        <p className="fh-line-1 font-heading text-3xl font-bold tracking-tight text-cream opacity-0 md:text-5xl">
          Built for teams who
        </p>
        <p className="fh-line-2 mt-2 font-display text-5xl italic leading-[0.9] text-cream opacity-0 md:text-7xl lg:text-8xl">
          demand more.
        </p>
        <p className="fh-sub mt-6 max-w-lg font-body text-lg text-cream/60 opacity-0">
          Every tool your maintenance team needs, designed to work together seamlessly.
        </p>
      </div>
    </section>
  );
}
