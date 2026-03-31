import Link from "next/link";
import { VeltroLogo } from "@/components/brand/VeltroLogo";
import { footerNav } from "@/config/navigation";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="mt-12 rounded-t-[4rem] bg-charcoal px-6 pb-8 pt-20 text-cream/70 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-6 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <VeltroLogo size={28} className="text-cream" />
              <span className="font-heading text-2xl font-bold text-cream">
                Veltro
              </span>
            </div>
            <span className="mt-1 block font-display text-sm italic text-cream/50">
              Velocity + Control
            </span>
            <p className="mt-4 max-w-xs font-body text-sm text-cream/60">
              Manage operations with speed, clarity, and control.
            </p>
          </div>

          {/* Link columns */}
          <nav aria-label="Footer navigation" className="contents">
            {footerNav.map((group) => (
              <div key={group.title} className="md:col-span-1">
                <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-cream/70">
                  {group.title}
                </h4>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="link-lift font-body text-sm text-cream/60 transition-colors hover:text-cream"
                        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {item.title}
                        {item.badge && (
                          <span className="ml-2 rounded-full bg-clay/20 px-1.5 py-0.5 text-[10px] font-medium text-clay-200">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Newsletter */}
        <div className="mt-16 rounded-2xl border border-cream/10 bg-charcoal-200 p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-heading text-base font-semibold text-cream">
                Stay updated
              </h3>
              <p className="mt-1 font-body text-sm text-cream/60">
                Product updates, maintenance insights, and engineering tips.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-6 md:flex-row">
          <span className="font-mono text-xs text-cream/50">
            &copy; {year} Veltro, Inc.
          </span>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse-slow rounded-full bg-green-500" />
            <span className="font-mono text-xs text-cream/50">
              System Operational
            </span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="font-mono text-xs py-1 tracking-wider text-cream/50 transition-colors hover:text-cream">
              Privacy
            </Link>
            <Link href="/terms" className="font-mono text-xs py-1 tracking-wider text-cream/50 transition-colors hover:text-cream">
              Terms
            </Link>
            <Link href="/cookies" className="font-mono text-xs py-1 tracking-wider text-cream/50 transition-colors hover:text-cream">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
