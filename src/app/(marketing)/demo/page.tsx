import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Start Free Trial",
  description: "Try Veltro free for 14 days. No credit card required.",
};

const benefits = [
  "14-day free trial — no credit card",
  "Full access to all Professional features",
  "Import your existing data",
  "Dedicated onboarding support",
  "Cancel anytime",
];

export default function DemoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        {/* Left — value prop */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Start your free trial
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            See how Veltro can transform your maintenance operations in minutes.
          </p>
          <ul className="mt-8 space-y-4">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 text-muted-foreground">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — signup form */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
          <h2 className="text-xl font-semibold text-foreground">Create your account</h2>
          <form className="mt-6 space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-foreground">Full name</label>
              <input id="fullName" type="text" className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="workEmail" className="block text-sm font-medium text-foreground">Work email</label>
              <input id="workEmail" type="email" className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-foreground">Company name</label>
              <input id="companyName" type="text" className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="teamSize" className="block text-sm font-medium text-foreground">Team size</label>
              <select id="teamSize" className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
                <option>1-5</option>
                <option>6-25</option>
                <option>26-100</option>
                <option>100+</option>
              </select>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground">Password</label>
              <input id="password" type="password" className="mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Start free trial
            </button>
            <p className="text-center text-xs text-muted-foreground">
              By signing up, you agree to our{" "}
              <a href="/terms" className="text-primary hover:underline">Terms</a> and{" "}
              <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
