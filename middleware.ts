import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n";

// Middleware to intercept requests and redirect to the correct locale
export default createMiddleware({
  // List of supported locales
  locales: locales,

  // Default locale
  defaultLocale: defaultLocale,

  // Always include the locale in the URL, even for the default locale
  localePrefix: "always",
});

// Configuration of routes that the middleware should intercept
export const config = {
  matcher: [
    // Intercept only routes that don't have:
    // - File extensions (like .png, .jpg, .css, etc.)
    // - API routes
    // - Next.js internal routes
    // - Files in the public folder
    "/((?!api|_next|public|favicon.ico|apple-icon.png|manifest.json|.*\\.[^/]+).*)",
  ],
};
