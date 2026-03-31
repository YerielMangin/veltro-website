"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function SecondaryHero({ 
  line1, 
  line2, 
  description,
  variant = "charcoal" 
}: { 
  line1: string; 
  line2?: string; 
  description?: string;
  variant?: "charcoal" | "moss" 
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo(
        ".sh-line-1",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
      if (line2) {
        tl.fromTo(
          ".sh-line-2",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.4"
        );
      }
      if (description) {
        tl.fromTo(
          ".sh-sub",
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.2"
        );
      }
    }, sectionRef.current);
    return () => ctx.revert();
  }, [line1, line2]);

  return (
    <section
      ref={sectionRef}
      className={`relative flex h-[50vh] min-h-[400px] items-end overflow-hidden ${
        variant === "moss" ? "bg-moss" : "bg-charcoal"
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${
        variant === "moss" ? "from-moss via-moss-500 to-clay-900/40" : "from-charcoal via-charcoal-200 to-moss-900/40"
      }`} />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />

      <div className="relative z-10 max-w-4xl p-8 md:p-16 lg:p-24">
        <p className="sh-line-1 font-heading text-2xl font-bold tracking-tight text-cream opacity-0 md:text-4xl lg:text-5xl">
          {line1}
        </p>
        {line2 && (
          <p className="sh-line-2 mt-2 font-display text-4xl italic leading-[0.9] text-cream opacity-0 md:text-6xl lg:text-7xl">
            {line2}
          </p>
        )}
        {description && (
          <p className="sh-sub mt-4 max-w-lg font-body text-base text-cream/60 opacity-0">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
