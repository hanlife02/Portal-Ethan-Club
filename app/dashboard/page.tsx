"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { ServiceGrid } from "@/components/service-grid"
import { Footer } from "@/components/footer"
import { useAuth } from "@/hooks/use-auth"
import { motion } from "framer-motion"
import { UserProfile } from "@/components/user-profile"

export default function DashboardPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login?error=unauthorized")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 to-purple-100 dark:from-navy-900 dark:to-purple-950">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-navy-700"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 dark:from-navy-900 dark:to-purple-950">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <UserProfile />
        <ServiceGrid isAdmin={true} />
      </motion.div>
      <Footer />
    </main>
  )
}
