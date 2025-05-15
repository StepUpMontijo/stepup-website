import { getRequestConfig } from "next-intl/server";

// Configuration of locales
export const locales = ["pt", "en"];
export const defaultLocale = "pt";

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is never undefined
  const resolvedLocale = locale || defaultLocale;

  return {
    locale: resolvedLocale,
    messages: (await import(`./messages/${resolvedLocale}.json`)).default,
  };
});

export function getLocale(locale: string) {
  return locales.includes(locale) ? locale : "pt";
}
