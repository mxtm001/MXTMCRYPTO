"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Settings, Globe, Bell, Lock, Check } from "lucide-react"

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "pt", name: "Português (Portuguese)", flag: "🇵🇹" },
  { code: "es", name: "Español (Spanish)", flag: "🇪🇸" },
  { code: "fr", name: "Français (French)", flag: "🇫🇷" },
  { code: "it", name: "Italiano (Italian)", flag: "🇮🇹" },
  { code: "ru", name: "Русский (Russian)", flag: "🇷🇺" },
  { code: "zh", name: "中文 (Chinese)", flag: "🇨🇳" },
  { code: "ja", name: "日本語 (Japanese)", flag: "🇯🇵" },
  { code: "ar", name: "العربية (Arabic)", flag: "🇸🇦" },
]

export default function SettingsPage() {
  const router = useRouter()
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [notifications, setNotifications] = useState(true)
  const [twoFactor, setTwoFactor] = useState(false)
  const [saving, setSaving] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("language")
    const language = savedLanguage === "en" ? "en" : "en"
    localStorage.setItem("language", language)
    setSelectedLanguage(language)
  }, [])

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode)
    localStorage.setItem("language", languageCode)
  }

  const handleSaveSettings = async () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      alert("Settings saved successfully!")
    }, 800)
  }

  if (!mounted) return null

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Settings className="h-8 w-8 text-[#f9a826]" />
          <h1 className="text-2xl font-medium text-gray-900">Settings</h1>
        </div>
        <p className="text-gray-600">Manage your account preferences and settings</p>
      </div>

      {/* Language Settings */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6 overflow-hidden hover:shadow-md transition-shadow">
        <div className="border-b bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-medium text-gray-900">Language Preferences</h2>
          </div>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">Select your preferred language for the application</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all text-left ${
                  selectedLanguage === lang.code
                    ? "border-[#f9a826] bg-amber-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{lang.name}</p>
                  <p className="text-xs text-gray-500">Code: {lang.code}</p>
                </div>
                {selectedLanguage === lang.code && (
                  <div className="w-5 h-5 rounded-full bg-[#f9a826] flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6 overflow-hidden hover:shadow-md transition-shadow">
        <div className="border-b bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-purple-600" />
            <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive updates about your account</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                notifications ? "bg-[#f9a826]" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  notifications ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6 overflow-hidden hover:shadow-md transition-shadow">
        <div className="border-b bg-gradient-to-r from-red-50 to-orange-50 px-6 py-4">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-red-600" />
            <h2 className="text-lg font-medium text-gray-900">Security</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Add extra security to your account</p>
              </div>
              <button
                onClick={() => setTwoFactor(!twoFactor)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  twoFactor ? "bg-[#f9a826]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    twoFactor ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 hover:bg-gray-50 font-medium transition-colors text-sm bg-transparent">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-3 justify-end">
        <button
          onClick={() => router.push("/dashboard")}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-900 hover:bg-gray-50 font-medium transition-colors bg-transparent"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveSettings}
          disabled={saving}
          className="px-6 py-2 bg-[#f9a826] hover:bg-[#f9a826]/90 disabled:opacity-50 text-black font-medium rounded-lg transition-colors"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  )
}
