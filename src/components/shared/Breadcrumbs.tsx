import Link from "next/link";
import { absoluteUrl } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <span className="font-mono text-[10px] uppercase tracking-widest text-charcoal/30">
                  /
                </span>
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="font-mono text-[10px] uppercase tracking-widest text-charcoal/40 transition-colors hover:text-charcoal"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`font-mono text-[10px] uppercase tracking-widest ${
                    isLast ? "max-w-[200px] truncate text-charcoal/60" : "text-charcoal/40"
                  }`}
                  {...(isLast ? { "aria-current": "page" as const } : {})}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
