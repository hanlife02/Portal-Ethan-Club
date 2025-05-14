"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { motion } from "framer-motion"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  const { login, isAuthenticated, isLoading } = useAuth()
  const { toast } = useToast()

  // 如果已经登录，重定向到仪表板
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (error) {
      let errorMessage = "Authentication failed. Please try again."
      let errorTitle = "Login Error"

      switch (error) {
        case "state_mismatch":
          errorMessage = "Security verification failed. Please try again."
          break
        case "auth_failed":
          errorMessage = "Authentication failed. Please check your credentials and try again."
          break
        case "unauthorized":
          errorMessage = "You need to be logged in to access that page."
          errorTitle = "Access Denied"
          break
        default:
          errorMessage = "An unexpected error occurred. Please try again."
      }

      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      })
    }
  }, [error, toast])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 to-purple-100 dark:from-navy-900 dark:to-purple-950 p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-[350px] shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <Image
                  src="/logo.png"
                  alt="Ethan Club"
                  width={100}
                  height={100}
                  className="rounded-full"
                  onLoad={(img) => {
                    img.currentTarget.classList.add("transition-opacity", "duration-700", "opacity-100")
                  }}
                />
              </motion.div>
            </div>
            <CardTitle className="text-2xl font-bold text-navy-800 dark:text-pink-200">Ethan Club</CardTitle>
            <CardDescription>Sign in to access all services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full bg-navy-700 hover:bg-navy-800 text-white" onClick={login} disabled={isLoading}>
                {isLoading ? "Processing..." : "Sign in with Casdoor"}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            Your gateway to all Ethan Club services
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
