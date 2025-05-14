"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { handleCallback } = useAuth()
  const { toast } = useToast()
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(true)

  useEffect(() => {
    const code = searchParams.get("code")
    const state = searchParams.get("state")

    if (!code || !state) {
      setError("缺少必要的认证参数")
      toast({
        title: "认证错误",
        description: "缺少必要的认证参数",
        variant: "destructive",
      })
      setTimeout(() => router.push("/login"), 2000)
      return
    }

    const processCallback = async () => {
      try {
        // 处理认证回调，成功后会重定向到仪表板
        await handleCallback(code, state)
        setProcessing(false)
      } catch (error) {
        console.error("认证回调处理错误:", error)
        setError("处理登录信息时出错")
        toast({
          title: "认证失败",
          description: "处理登录信息时出错，请重试",
          variant: "destructive",
        })
        setTimeout(() => router.push("/login"), 2000)
      }
    }

    // 使用会话存储来防止重复处理同一个授权码
    const processedCode = sessionStorage.getItem("processed_auth_code")
    if (processedCode === code) {
      // 已经处理过这个授权码，直接重定向到仪表板
      router.replace("/dashboard")
      return
    }

    // 存储当前处理的授权码
    sessionStorage.setItem("processed_auth_code", code)
    processCallback()
  }, [searchParams, handleCallback, router, toast])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 to-purple-100 dark:from-navy-900 dark:to-purple-950">
      <div className="text-center">
        {error ? (
          <>
            <div className="text-red-500 text-xl mb-4">❌ {error}</div>
            <p className="text-navy-600 dark:text-pink-100">正在返回登录页面...</p>
          </>
        ) : (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy-700 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-navy-800 dark:text-pink-200">正在处理登录...</h2>
            <p className="text-navy-600 dark:text-pink-100">请稍候，正在验证您的身份</p>
          </>
        )}
      </div>
    </div>
  )
}
