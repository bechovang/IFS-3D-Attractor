"use client"

import { useI18n } from "./i18n-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe } from "lucide-react"
import { useIFS } from "./ifs-context"

export default function LanguageSelector() {
  const { language, setLanguage, availableLanguages } = useI18n()
  const { darkMode } = useIFS()

  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger
        className={`w-auto h-9 px-3 ${
          darkMode
            ? "bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500 text-gray-200"
            : "bg-white border-gray-200 hover:bg-gray-50"
        } transition-all duration-300`}
      >
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent className={darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"}>
        {availableLanguages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code} className={darkMode ? "text-white hover:bg-gray-600" : ""}>
            <div className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
