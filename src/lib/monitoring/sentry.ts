import * as Sentry from "@sentry/nextjs";

export function initSentry() {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
    if (process.env.NODE_ENV === "production") {
      console.warn("NEXT_PUBLIC_SENTRY_DSN not configured, skipping Sentry initialization");
    }
    return;
  }

  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV || "development",
    release: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
    
    // Performance monitoring
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
    
    // Session replay
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
    
    // Error filtering
    beforeSend(event, hint) {
      const error = hint.originalException;
      if (error instanceof Error) {
        // Ignore hydration errors in development
        if (error.message.includes("Hydration failed") || error.message.includes("hydration")) {
          return null;
        }
        // Ignore React maximum update depth
        if (error.message.includes("Maximum update depth exceeded")) {
          return null;
        }
        // Ignore resize observer loop
        if (error.message.includes("ResizeObserver loop")) {
          return null;
        }
      }
      return event;
    },
    
    // Context enrichment
    initialScope: {
      tags: {
        service: "aarogya-frontend",
        component: "web",
      },
    },
  });

  console.log("Sentry initialized for frontend", process.env.NODE_ENV);
}

export { Sentry };