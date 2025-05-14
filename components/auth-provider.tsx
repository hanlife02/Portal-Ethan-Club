"use client"

import type React from "react"

import { createContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

type User = {
  id: string
  name: string
  email: string
  avatar: string
  roles: string[]
}

type AuthContextType = {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  login: () => void
  logout: () => void
  handleCallback: (code: string, state: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  login: () => {},
  logout: () => {},
  handleCallback: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token")

      if (token) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4567"}/api/auth/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (response.ok) {
            const userData = await response.json()
            setUser(userData)
            setIsAuthenticated(true)
          } else {
            // Token is invalid or expired
            localStorage.removeItem("access_token")
            setIsAuthenticated(false)
            setUser(null)
          }
        } catch (error) {
          console.error("Auth check error:", error)
          setIsAuthenticated(false)
          setUser(null)
        }
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = () => {
    try {
      // 清除之前的授权码记录
      sessionStorage.removeItem("processed_auth_code")

      const state = generateRandomString()
      localStorage.setItem("auth_state", state)

      // 使用前端应用的回调URL
      const callbackUrl = `${window.location.origin}/auth/callback`

      // 确保我们有必要的环境变量
      if (!process.env.NEXT_PUBLIC_CASDOOR_CLIENT_ID || !process.env.NEXT_PUBLIC_CASDOOR_ISSUER) {
        console.error("Missing required environment variables for authentication")
        toast({
          title: "配置错误",
          description: "认证所需的环境变量缺失",
          variant: "destructive",
        })
        return
      }

      const authUrl = `${process.env.NEXT_PUBLIC_CASDOOR_ISSUER}/login/oauth/authorize?client_id=${
        process.env.NEXT_PUBLIC_CASDOOR_CLIENT_ID
      }&response_type=code&redirect_uri=${encodeURIComponent(callbackUrl)}&scope=read&state=${state}`

      window.location.href = authUrl
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "登录错误",
        description: "启动登录流程时出错",
        variant: "destructive",
      })
    }
  }

  const logout = () => {
    localStorage.removeItem("access_token")
    sessionStorage.removeItem("processed_auth_code")
    localStorage.removeItem("auth_state")
    setIsAuthenticated(false)
    setUser(null)
    router.push("/")
    toast({
      title: "已退出登录",
      description: "您已成功退出登录",
    })
  }

  const handleCallback = async (code: string, state: string) => {
    const savedState = localStorage.getItem("auth_state")

    if (state !== savedState) {
      console.error("State mismatch in auth callback")
      throw new Error("安全验证失败，请重试")
    }

    try {
      setIsLoading(true)

      // 使用前端应用的回调URL
      const callbackUrl = `${window.location.origin}/auth/callback`

      // 使用后端API处理授权码
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4567"}/api/auth/callback?code=${code}`,
      )

      if (!response.ok) {
        const errorData = await response.text()
        console.error("Auth callback error response:", errorData)
        throw new Error(`认证回调失败: ${response.status}`)
      }

      const data = await response.json()

      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token)

        // 获取用户信息
        const userResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4567"}/api/auth/user`,
          {
            headers: {
              Authorization: `Bearer ${data.access_token}`,
            },
          },
        )

        if (userResponse.ok) {
          const userData = await userResponse.json()
          // 清除认证状态，防止循环
          localStorage.removeItem("auth_state")
          // 设置用户信息和认证状态
          setUser(userData)
          setIsAuthenticated(true)
          // 使用 replace 而不是 push 来避免在历史记录中堆积
          router.replace("/dashboard")
        } else {
          throw new Error(`获取用户信息失败: ${userResponse.status}`)
        }
      } else {
        throw new Error("获取访问令牌失败")
      }
    } catch (error) {
      console.error("Authentication error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        logout,
        handleCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function generateRandomString(length = 32) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
