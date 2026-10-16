import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Globe2 } from "lucide-react";
import { languages, messages } from "./messages.js";

const LocaleContext = createContext(null);
const preferenceKey = "hikari-portfolio-language-v1";

function localeFromPath(pathname) {
  if (/^\/es(?:\/|$)/i.test(pathname)) return "es";
  if (/^\/pt-br(?:\/|$)/i.test(pathname)) return "pt-BR";
  return null;
}

function pathForLocale(pathname, locale) {
  const cleanPath = pathname.replace(/^\/(?:es|pt-br)(?=\/|$)/i, "") || "/";
  const suffix = cleanPath === "/" ? "/" : cleanPath;
  return locale === "en" ? suffix : `/${locale === "es" ? "es" : "pt-br"}${suffix}`;
}

export function localizedHref(pathname, locale) {
  if (!pathname?.startsWith("/") || pathname.startsWith("//")) return pathname;
  if (!(pathname === "/" || pathname.startsWith("/projects/") || pathname.startsWith("/build-notes") || pathname.startsWith("/ugc-for-ai-startups"))) return pathname;
  return pathForLocale(pathname, locale);
}

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    const routeLocale = typeof window === "undefined" ? null : localeFromPath(window.location.pathname);
    if (globalThis.__PORTFOLIO_LOCALE && languages.some((language) => language.code === globalThis.__PORTFOLIO_LOCALE)) return globalThis.__PORTFOLIO_LOCALE;
    if (routeLocale) return routeLocale;
    if (typeof window === "undefined") return "en";
    try {
      return languages.some((language) => language.code === localStorage.getItem(preferenceKey))
        ? localStorage.getItem(preferenceKey)
        : "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    const routeLocale = localeFromPath(window.location.pathname);
    if (routeLocale && routeLocale !== locale) setLocale(routeLocale);
    document.documentElement.lang = locale === "pt-BR" ? "pt-BR" : locale;
    try { localStorage.setItem(preferenceKey, locale); } catch { /* Storage can be disabled. */ }

    // A returning visitor who opens the English root keeps their saved choice.
    if (!routeLocale && window.location.pathname === "/" && locale !== "en") {
      window.location.replace(pathForLocale("/", locale) + window.location.search + window.location.hash);
    }
  }, [locale]);

  const changeLanguage = useCallback((nextLocale) => {
    if (!languages.some((language) => language.code === nextLocale)) return;
    try { localStorage.setItem(preferenceKey, nextLocale); } catch { /* Storage can be disabled. */ }
    const nextPath = pathForLocale(window.location.pathname, nextLocale);
    const nextUrl = nextPath + window.location.search + window.location.hash;
    window.location.assign(nextUrl);
  }, []);

  const value = useMemo(() => ({
    locale,
    languages,
    changeLanguage,
    t: (key) => messages[locale]?.[key] ?? key,
  }), [locale, changeLanguage]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}

export function localizedText(value) {
  if (typeof value !== "string") return value;
  const locale = globalThis.__PORTFOLIO_LOCALE
    || (typeof window !== "undefined" && (localeFromPath(window.location.pathname) || (() => {
      try { return localStorage.getItem(preferenceKey); } catch { return null; }
    })()))
    || "en";
  const normalized = value.trim().replace(/\s+/g, " ");
  const translated = messages[locale]?.[normalized] ?? normalized;
  const leading = value.match(/^\s*/)?.[0] ?? "";
  const trailing = value.match(/\s*$/)?.[0] ?? "";
  return `${leading}${translated}${trailing}`;
}

export function LocalizedText({ children }) {
  if (Array.isArray(children)) return children.map((child, index) => <LocalizedText key={index}>{child}</LocalizedText>);
  if (typeof children === "string") return localizedText(children);
  return children;
}

export function LanguageSwitcher({ className = "", compact = false, iconOnly = false }) {
  const { locale, languages: availableLanguages, changeLanguage, t } = useLanguage();
  return <label className={`language-switcher ${className} ${iconOnly ? "icon-only" : ""}`}>
    <span className="language-switcher-label">{t("Choose language")}</span>
    {iconOnly && <Globe2 className="language-switcher-icon" size={20} aria-hidden="true" />}
    <select aria-label={t("Choose language")} value={locale} onChange={(event) => changeLanguage(event.target.value)}>
      {availableLanguages.map(({ code, shortName, nativeName }) => <option key={code} value={code}>{compact ? (code === "pt-BR" ? "PT-BR" : shortName) : `${shortName} · ${nativeName}`}</option>)}
    </select>
  </label>;
}
