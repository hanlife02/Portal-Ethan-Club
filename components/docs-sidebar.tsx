"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronRight, FileText, Folder, Home, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

// Documentation structure
const docsNavigation = [
  {
    title: "Introduction",
    href: "/docs",
    icon: Home,
  },
  {
    title: "Getting Started",
    icon: Folder,
    children: [
      {
        title: "Installation",
        href: "/docs/getting-started/installation",
        icon: FileText,
      },
      {
        title: "Configuration",
        href: "/docs/getting-started/configuration",
        icon: FileText,
      },
    ],
  },
  {
    title: "Services",
    icon: Folder,
    children: [
      {
        title: "LobeChat",
        href: "/docs/services/lobechat",
        icon: FileText,
      },
      {
        title: "NewAPI",
        href: "/docs/services/newapi",
        icon: FileText,
      },
    ],
  },
  {
    title: "API Reference",
    icon: Folder,
    children: [
      {
        title: "Authentication",
        href: "/docs/api/authentication",
        icon: FileText,
      },
      {
        title: "Endpoints",
        href: "/docs/api/endpoints",
        icon: FileText,
      },
    ],
  },
]

export function DocsSidebar() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "Getting Started": true,
    Services: true,
    "API Reference": false,
  })

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  // Filter navigation items based on search query
  const filteredNavigation = searchQuery
    ? docsNavigation.flatMap((section) => {
        if (section.children) {
          const filteredChildren = section.children.filter((child) =>
            child.title.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          return filteredChildren.length > 0
            ? [{ ...section, children: filteredChildren }]
            : section.title.toLowerCase().includes(searchQuery.toLowerCase())
              ? [section]
              : []
        }
        return section.title.toLowerCase().includes(searchQuery.toLowerCase()) ? [section] : []
      })
    : docsNavigation

  return (
    <div className="w-full md:w-64 lg:w-72 shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-navy-950 h-[calc(100vh-4rem)] md:h-auto overflow-y-auto">
      <div className="p-4 sticky top-0 bg-white dark:bg-navy-950 z-10 border-b border-gray-200 dark:border-gray-800">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search documentation..."
            className="w-full pl-9 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="p-4">
        <nav className="space-y-1">
          {filteredNavigation.map((item) => {
            if (!item.children) {
              return (
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
              )
            }

            const isExpanded = expandedSections[item.title]
            const hasActiveChild = item.children?.some((child) => pathname === child.href)

            return (
              <div key={item.title} className="space-y-1">
                <button
                  onClick={() => toggleSection(item.title)}
                  className={cn(
                    "flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors",
                    hasActiveChild
                      ? "bg-gray-100 dark:bg-gray-800 text-navy-800 dark:text-pink-200 font-medium"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </div>
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-4 pl-2 border-l border-gray-200 dark:border-gray-700 space-y-1"
                  >
                    {item.children?.map((child) => (
                      <Link
                        key={child.title}
                        href={child.href}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
                          pathname === child.href
                            ? "bg-gray-100 dark:bg-gray-800 text-navy-800 dark:text-pink-200 font-medium"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                        )}
                      >
                        <child.icon className="h-4 w-4" />
                        <span>{child.title}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
