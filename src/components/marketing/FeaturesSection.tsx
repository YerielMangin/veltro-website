"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DiagnosticShuffler } from "@/components/animations/DiagnosticShuffler";
import { TelemetryTypewriter } from "@/components/animations/TelemetryTypewriter";
import { CursorProtocol } from "@/components/animations/CursorProtocol";

gsap.registerPlugin(ScrollTrigger);

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
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
      id="features"
      ref={sectionRef}
      className="bg-cream px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-6xl">
        <span className="mb-3 block font-mono text-xs text-charcoal/40">
          // capabilities
        </span>
        <h2 className="mb-16 font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          Functional Artifacts
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="feature-card">
            <DiagnosticShuffler />
          </div>
          <div className="feature-card">
            <TelemetryTypewriter />
          </div>
          <div className="feature-card">
            <CursorProtocol />
          </div>
        </div>
      </div>
    </section>
  );
}
