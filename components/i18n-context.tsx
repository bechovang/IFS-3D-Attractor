"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Language, Translation } from "@/types/i18n"
import { translations } from "@/locales/translations"

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translation
  availableLanguages: { code: Language; name: string; flag: string }[]
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const AVAILABLE_LANGUAGES = [
  { code: "en" as Language, name: "English", flag: "🇺🇸" },
  { code: "vi" as Language, name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "zh" as Language, name: "中文", flag: "🇨🇳" },
  { code: "ja" as Language, name: "日本語", flag: "🇯🇵" },
  { code: "ko" as Language, name: "한국어", flag: "🇰🇷" },
  { code: "es" as Language, name: "Español", flag: "🇪🇸" },
  { code: "fr" as Language, name: "Français", flag: "🇫🇷" },
  { code: "de" as Language, name: "Deutsch", flag: "🇩🇪" },
  { code: "ru" as Language, name: "Русский", flag: "🇷🇺" },
]

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("ifs-language") as Language
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage)
    } else {
      // Detect browser language
      const browserLang = navigator.language.split("-")[0] as Language
      if (translations[browserLang]) {
        setLanguageState(browserLang)
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("ifs-language", lang)
  }

  const t = translations[language]

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        t,
        availableLanguages: AVAILABLE_LANGUAGES,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider")
  }
  return context
}
