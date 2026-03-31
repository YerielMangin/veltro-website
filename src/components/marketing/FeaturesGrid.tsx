"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wrench, BarChart3, ClipboardCheck, Zap, Package, Shield, Smartphone, Webhook } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { id: "work-orders", icon: Wrench, label: "work-orders", title: "Work Order Management", description: "Create, assign, and track work orders in real-time. Set priorities, attach photos, and monitor completion across your entire team." },
  { id: "assets", icon: Package, label: "assets", title: "Asset Lifecycle Tracking", description: "Track every asset from acquisition to retirement. Maintenance history, warranties, and documentation in one place." },
  { id: "inspections", icon: ClipboardCheck, label: "inspections", title: "Digital Inspections", description: "Build custom checklists with photo capture and geolocation. Automate compliance and catch issues before they escalate." },
  { id: "pm", icon: Zap, label: "preventive", title: "Preventive Maintenance", description: "Schedule recurring maintenance based on time, meter readings, or condition. Reduce unplanned downtime by up to 45%." },
  { id: "reports", icon: BarChart3, label: "analytics", title: "Reports & Analytics", description: "Real-time dashboards and exportable reports. Track KPIs like MTTR, MTBF, and SLA compliance at a glance." },
  { id: "mobile", icon: Smartphone, label: "mobile", title: "Mobile-First Experience", description: "Full-featured mobile app for field technicians. Scan barcodes, capture photos, update work orders — all offline-capable." },
  { id: "api", icon: Webhook, label: "integrations", title: "API & Integrations", description: "RESTful API with webhooks. Connect to ERPs, accounting software, IoT sensors, and your existing tool stack." },
  { id: "security", icon: Shield, label: "security", title: "Enterprise Security", description: "SOC 2 Type II compliant. SSO/SAML, role-based access, audit logs, and data encryption at rest and in transit." },
];

export function FeaturesGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fg-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
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
    <section ref={sectionRef} className="bg-cream px-6 py-24 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <span className="mb-3 block font-mono text-xs text-charcoal/40">
          // toolkit
        </span>
        <h2 className="mb-16 font-heading text-3xl font-bold tracking-tight md:text-4xl">
          Everything you need
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                id={feature.id}
                className="fg-card rounded-[2rem] border border-cream-300 bg-cream-50 p-8 shadow-sm transition-shadow duration-500 hover:shadow-[var(--shadow-card-hover)]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-moss/10">
                  <Icon size={20} className="text-moss" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-charcoal/30">
                  // {feature.label}
                </span>
                <h3 className="mt-2 font-heading text-lg font-bold">
                  {feature.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-charcoal/60">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
