"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled ? "bg-white/80 dark:bg-navy-950/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <motion.div whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Image src="/logo.png" alt="Ethan Club" width={40} height={40} className="rounded-full" />
            </motion.div>
            <span className="font-bold text-xl text-navy-800 dark:text-pink-200">Ethan Club</span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden ml-4 p-2 text-navy-600 hover:text-navy-800 dark:text-pink-100 dark:hover:text-pink-200"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <motion.div initial={{ rotate: 0 }} animate={{ rotate: 90 }} transition={{ duration: 0.2 }}>
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div initial={{ rotate: 90 }} animate={{ rotate: 0 }} transition={{ duration: 0.2 }}>
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center ml-8 space-x-6">
            <NavLink href="/" active={pathname === "/"}>
              Home
            </NavLink>
            <NavLink href="/dashboard" active={pathname === "/dashboard"}>
              Dashboard
            </NavLink>
            <NavLink href="/docs" active={pathname.startsWith("/docs")}>
              Docs
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage
                      src={user?.avatar || "/placeholder.svg?height=40&width=40&query=user"}
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback className="bg-navy-200 text-navy-800">
                      {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="bg-navy-700 hover:bg-navy-800 text-white">
              <Link href="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
      {/* Mobile menu dropdown */}
      <motion.div
        className={`md:hidden w-full absolute top-16 left-0 z-50 bg-white dark:bg-navy-950 shadow-md`}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
          height: mobileMenuOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
      >
        <div className="px-4 py-3 space-y-1 border-t border-gray-200 dark:border-gray-800">
          <MobileNavLink href="/" active={pathname === "/"}>
            Home
          </MobileNavLink>
          <MobileNavLink href="/dashboard" active={pathname === "/dashboard"}>
            Dashboard
          </MobileNavLink>
          <MobileNavLink href="/docs" active={pathname.startsWith("/docs")}>
            Docs
          </MobileNavLink>
        </div>
      </motion.div>
    </motion.header>
  )
}

// Helper component for navigation links
function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`relative px-1 py-2 text-sm font-medium transition-colors ${
        active
          ? "text-navy-800 dark:text-pink-200"
          : "text-navy-600 hover:text-navy-800 dark:text-pink-100 dark:hover:text-pink-200"
      }`}
    >
      {children}
      {active && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 w-full bg-pink-500 dark:bg-pink-400"
          layoutId="navbar-indicator"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  )
}

// Helper component for mobile navigation links
function MobileNavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`block py-2 px-3 rounded-md ${
        active
          ? "bg-navy-100 text-navy-800 dark:bg-navy-800 dark:text-pink-200"
          : "text-navy-600 hover:bg-navy-50 dark:text-pink-100 dark:hover:bg-navy-900"
      }`}
    >
      {children}
    </Link>
  )
}
