"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getLanguageByCountry, getTranslations, type Language } from "@/lib/languages"

interface LanguageContextType {
  language: Language
  translations: any
  setLanguage: (lang: Language) => void
  setCountry: (country: string) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [translations, setTranslations] = useState(getTranslations("en"))

  useEffect(() => {
    // Keep the customer-facing interface in English by default.
    setLanguage("en")
    setTranslations(getTranslations("en"))
    localStorage.setItem("preferredLanguage", "en")
  }, [])

  const handleSetLanguage = (_lang: Language) => {
    setLanguage("en")
    setTranslations(getTranslations("en"))
    localStorage.setItem("preferredLanguage", "en")
  }

  const handleSetCountry = (_countryCode: string) => {
    handleSetLanguage("en")
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        translations,
        setLanguage: handleSetLanguage,
        setCountry: handleSetCountry,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
