"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "zh" | "en"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.dashboard": "Dashboard",
    "nav.docs": "Docs",

    // Docs Sidebar
    "docs.sidebar.search": "Search documentation...",
    "docs.sidebar.introduction": "Introduction",
    "docs.sidebar.services": "Services",
    "docs.sidebar.lobechat": "LobeChat",
    "docs.sidebar.newapi": "NewAPI",

    // Common
    "language.switch": "中文",
    "language.current": "English",
  },
  zh: {
    // 导航
    "nav.home": "首页",
    "nav.dashboard": "仪表盘",
    "nav.docs": "文档",

    // 文档侧边栏
    "docs.sidebar.search": "搜索文档...",
    "docs.sidebar.introduction": "介绍",
    "docs.sidebar.services": "服务",
    "docs.sidebar.lobechat": "LobeChat",
    "docs.sidebar.newapi": "NewAPI",

    // 通用
    "language.switch": "English",
    "language.current": "中文",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  // 从本地存储加载语言设置
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "zh")) {
      setLanguageState(savedLanguage)
    } else {
      // 根据浏览器语言自动设置
      const browserLanguage = navigator.language.startsWith("zh") ? "zh" : "en"
      setLanguageState(browserLanguage)
    }
  }, [])

  // 保存语言设置到本地存储
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  // 翻译函数
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
