"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useAuth } from "@/hooks/use-auth"

export function Hero() {
  const { isAuthenticated } = useAuth()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-pink-100 to-purple-100 dark:from-navy-900 dark:to-purple-950">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="flex-1 text-center md:text-left">
            <motion.h1 className="text-4xl md:text-6xl font-bold text-navy-800 dark:text-pink-200 mb-6" variants={item}>
              Welcome to
              <br />
              <span className="text-pink-600 dark:text-pink-400">Ethan Club</span>
            </motion.h1>

            <motion.div variants={item}>
              {!isAuthenticated ? (
                <Button asChild size="lg" className="bg-navy-700 hover:bg-navy-800 text-white">
                  <Link href="/login">Get Started</Link>
                </Button>
              ) : (
                <Button asChild size="lg" className="bg-navy-700 hover:bg-navy-800 text-white">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              )}
            </motion.div>
          </div>

          <motion.div
            className="flex-1 flex justify-center md:justify-end"
            variants={item}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <Image
                src="/logo.png"
                alt="Ethan Club"
                fill
                className="object-contain rounded-full shadow-lg"
                priority
                onLoadingComplete={(img) => {
                  // Optional: Add animation when image loads
                  img.classList.add("transition-opacity", "duration-700", "opacity-100")
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
