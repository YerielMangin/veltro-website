"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white px-6 py-32 md:px-12 md:py-48 lg:px-24"
    >
      <div className="cta-content mx-auto max-w-3xl text-center">
        <p className="font-display text-5xl italic leading-tight text-charcoal md:text-7xl">
          Veltro isn't for everyone. It's for the teams who understand that{" "}
          <span className="text-clay">speed is a byproduct of precision.</span>
        </p>
        <p className="mx-auto mt-6 max-w-lg font-body text-lg text-charcoal/60">
          Join the operations who value flow over friction. Find your rhythm
          today.
        </p>
        <div className="mt-10">
          <MagneticButton href="/demo" variant="clay" size="lg">
            Start Your 14-Day Trial
          </MagneticButton>
        </div>
        <p className="mt-4 font-mono text-xs text-charcoal/40 uppercase tracking-widest">
          NO CREDIT CARD REQUIRED &middot; SETUP IN &lt; 2 MINS
        </p>
      </div>
    </section>
  );
}
