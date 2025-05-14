"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Mail, Activity } from "lucide-react"

export function Footer() {
  return (
    <motion.footer
      className="bg-white dark:bg-navy-950 border-t border-gray-200 dark:border-navy-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-navy-800 dark:text-pink-200">Ethan Club</h3>
            <p className="text-navy-600 dark:text-pink-100 text-sm">
              We are very honored that you have joined Ethan Club.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-navy-800 dark:text-pink-200">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://hanlife02.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy-600 hover:text-navy-800 dark:text-pink-100 dark:hover:text-pink-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/hanlife02"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy-600 hover:text-navy-800 dark:text-pink-100 dark:hover:text-pink-300"
                >
                  GitHub
                </a>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-navy-600 hover:text-navy-800 dark:text-pink-100 dark:hover:text-pink-300"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <a
                  href="https://hanlife02.com/about-me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy-600 hover:text-navy-800 dark:text-pink-100 dark:hover:text-pink-300"
                >
                  About Me
                </a>
              </li>
              <li>
                <a
                  href="https://status.ethan02.com/status/all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy-600 hover:text-navy-800 dark:text-pink-100 dark:hover:text-pink-300 flex items-center"
                >
                  <Activity className="h-3.5 w-3.5 mr-1" />
                  Monitor
                </a>
              </li>
              <li>
                <a
                  href="mailto:ethan@hanlife02.com"
                  className="text-navy-600 hover:text-navy-800 dark:text-pink-100 dark:hover:text-pink-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-navy-800 dark:text-pink-200">Contact</h3>
            <div className="text-sm text-navy-600 dark:text-pink-100">
              <a
                href="mailto:ethan@hanlife02.com"
                className="flex items-center hover:text-navy-800 dark:hover:text-pink-300"
              >
                <Mail className="h-4 w-4 mr-2" />
                ethan@hanlife02.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-navy-800 mt-8 pt-6 text-center text-sm text-navy-600 dark:text-pink-100">
          <p>&copy; {new Date().getFullYear()} Ethan Club. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  )
}
