"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ph = usePostHog();

  useEffect(() => {
    if (pathname && ph) {
      let url = window.origin + pathname;
      if (searchParams.toString()) url += `?${searchParams.toString()}`;
      ph.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams, ph]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
    if (initialized.current) return;
    initialized.current = true;

    // posthog-js queues capture() calls made before init(), so the
    // PostHogPageView component's initial pageview is buffered and
    // flushed once init completes.
    const init = () => {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
        person_profiles: "identified_only",
        capture_pageview: false,
      });
    };

    if ("requestIdleCallback" in window) {
      requestIdleCallback(init);
    } else {
      setTimeout(init, 1000);
    }
  }, []);

  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    return <>{children}</>;
  }

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
}
