"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { FileText, Home, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"

export function DocsSidebar() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const { t, language } = useLanguage()

  // 文档导航结构 - 简化版本
  const getDocsNavigation = () => {
    if (language === "en") {
      return [
        {
          title: "Introduction",
          href: "/docs",
          icon: Home,
          translationKey: "docs.sidebar.introduction",
        },
        {
          title: "LobeChat",
          href: "/docs/services/lobechat",
          icon: FileText,
          translationKey: "docs.sidebar.lobechat",
        },
        {
          title: "NewAPI",
          href: "/docs/services/newapi",
          icon: FileText,
          translationKey: "docs.sidebar.newapi",
        },
      ]
    } else {
      return [
        {
          title: "介绍",
          href: "/docs",
          icon: Home,
          translationKey: "docs.sidebar.introduction",
        },
        {
          title: "LobeChat",
          href: "/docs/services/lobechat",
          icon: FileText,
          translationKey: "docs.sidebar.lobechat",
        },
        {
          title: "NewAPI",
          href: "/docs/services/newapi",
          icon: FileText,
          translationKey: "docs.sidebar.newapi",
        },
      ]
    }
  }

  const docsNavigation = getDocsNavigation()

  // 根据搜索查询过滤导航项
  const filteredNavigation = searchQuery
    ? docsNavigation.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : docsNavigation

  return (
    <div className="w-full md:w-64 lg:w-72 shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-navy-950 h-[calc(100vh-4rem)] md:h-auto overflow-y-auto">
      <div className="p-4 sticky top-0 bg-white dark:bg-navy-950 z-10 border-b border-gray-200 dark:border-gray-800">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder={t("docs.sidebar.search")}
            className="w-full pl-9 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="p-4">
        <nav className="space-y-1">
          {filteredNavigation.map((item) => (
            <Link
              key={item.title}
              href={item.href || "#"}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
                pathname === item.href
                  ? "bg-gray-100 dark:bg-gray-800 text-navy-800 dark:text-pink-200 font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
