import type React from "react"
import { DocsSidebar } from "@/components/docs-sidebar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col md:flex-row">
        <DocsSidebar />
        <main className="flex-1 p-6 md:p-10 bg-gray-50 dark:bg-gray-900">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
