import createMiddleware from "next-intl/middleware";
import { defineRouting } from "next-intl/routing";

const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "pt"],

  // Used when no locale matches
  defaultLocale: "pt",

  // Always include the locale in the URL, even for the default locale
  localePrefix: "always",
});

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
