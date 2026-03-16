import type { Metadata } from "next";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Veltro team — sales, support, or partnerships.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Get in touch
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Have questions about Veltro? We'd love to hear from you.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl gap-8 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 text-center">
          <Mail className="mx-auto h-8 w-8 text-primary" />
          <h3 className="mt-4 font-semibold text-foreground">Sales</h3>
          <p className="mt-2 text-sm text-muted-foreground">Talk to our sales team about plans and pricing.</p>
          <a href={`mailto:${siteConfig.support.sales}`} className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
            {siteConfig.support.sales}
          </a>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 text-center">
          <MessageSquare className="mx-auto h-8 w-8 text-primary" />
          <h3 className="mt-4 font-semibold text-foreground">Support</h3>
          <p className="mt-2 text-sm text-muted-foreground">Need help? Our support team is here for you.</p>
          <a href={`mailto:${siteConfig.support.email}`} className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
            {siteConfig.support.email}
          </a>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 text-center">
          <Phone className="mx-auto h-8 w-8 text-primary" />
          <h3 className="mt-4 font-semibold text-foreground">Demo</h3>
          <p className="mt-2 text-sm text-muted-foreground">Schedule a live demo with our team.</p>
          <a href="/demo" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
            Book a demo
          </a>
        </div>
      </div>

      {/* Contact form placeholder */}
      <div className="mx-auto mt-16 max-w-xl">
        <form className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-foreground">First name</label>
              <input id="firstName" type="text" className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-foreground">Last name</label>
              <input id="lastName" type="text" className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground">Work email</label>
            <input id="email" type="email" className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-foreground">Company</label>
            <input id="company" type="text" className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-foreground">Message</label>
            <textarea id="message" rows={4} className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Send message
          </button>
        </form>
      </div>
    </div>
  );
}
