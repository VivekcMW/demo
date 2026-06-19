export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { initSentry } = require("./lib/monitoring/sentry");
    initSentry();
  }
}