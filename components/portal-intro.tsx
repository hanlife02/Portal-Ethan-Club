"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Globe, Shield, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function PortalIntro() {
  const features = [
    {
      icon: Globe,
      title: "集中访问",
      description: "通过单一入口访问所有Ethan部署的服务，无需记忆多个网址",
    },
    {
      icon: Shield,
      title: "安全认证",
      description: "统一的身份验证系统，一次登录即可访问所有授权服务",
    },
    {
      icon: Users,
      title: "用户社区",
      description: "连接使用相同服务的用户，分享经验和解决方案",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-purple-100 to-gray-50 dark:from-navy-950 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-navy-800 dark:text-pink-200 mb-4"
          >
            关于 Ethan Club 门户
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-navy-600 dark:text-pink-100 max-w-2xl mx-auto"
          >
            Ethan Club
            门户是一个集中式平台，为用户提供对各种服务的便捷访问。通过统一的界面和认证系统，简化您的数字体验。
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-navy-800 dark:text-pink-200">为什么选择 Ethan Club？</h3>
            <p className="text-navy-600 dark:text-pink-100">
              Ethan Club
              门户旨在简化您访问各种服务的方式。无论是AI聊天工具、API服务还是其他工具，都可以通过这个统一的平台轻松访问。
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 bg-pink-100 dark:bg-navy-800 p-2 rounded-full">
                    <feature.icon className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-navy-800 dark:text-pink-200">{feature.title}</h4>
                    <p className="text-sm text-navy-600 dark:text-pink-100">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-4">
              <Button asChild className="bg-navy-700 hover:bg-navy-800 text-white">
                <Link href="/docs">
                  了解更多 <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-80 md:h-96 w-full rounded-lg overflow-hidden shadow-xl">
              {/* 渐变覆盖层 */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 to-navy-300/30 dark:from-pink-900/20 dark:to-navy-700/20 z-10 pointer-events-none"></div>

              {/* 使用提供的截图 */}
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%88%AA%E5%B1%8F2025-05-14%2016.26.54-7X1X1nGufYvIfj55RjKGXL0vEljWPt.png"
                alt="Ethan Club Dashboard"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-navy-900 p-4 rounded-lg shadow-lg z-20">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <p className="font-medium text-navy-800 dark:text-pink-200">简单易用</p>
                  <p className="text-sm text-navy-600 dark:text-pink-100">快速上手，无需复杂设置</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
