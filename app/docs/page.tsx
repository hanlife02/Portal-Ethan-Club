"use client"

import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

export default function DocsPage() {
  const { language } = useLanguage()

  const services = [
    {
      title: "LobeChat",
      description:
        language === "en"
          ? "AI assistant that helps you with everyday tasks through natural conversation"
          : "通过自然对话帮助您完成日常任务的 AI 助手",
      href: "/docs/services/lobechat",
    },
    {
      title: "NewAPI",
      description:
        language === "en"
          ? "Powerful tool that helps you access and process information from various sources"
          : "帮助您访问和处理来自各种来源信息的强大工具",
      href: "/docs/services/newapi",
    },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-navy-800 dark:text-pink-200">
        {language === "en" ? "Ethan Club Services" : "Ethan Club 服务"}
      </h1>

      <div className="prose prose-gray dark:prose-invert max-w-none mb-8">
        {language === "en" ? (
          <p className="lead">
            Welcome to Ethan Club services documentation. Here you'll find information about the services available to
            you as an Ethan Club member.
          </p>
        ) : (
          <p className="lead">欢迎来到 Ethan Club 服务文档。在这里，您将找到作为 Ethan Club 会员可以使用的服务信息。</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {services.map((service) => (
          <Card key={service.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href={service.href}
                className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                <FileText className="mr-1 h-4 w-4" />
                {language === "en" ? "Learn more" : "了解更多"}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-navy-800 dark:text-pink-200">
          {language === "en" ? "Need Help?" : "需要帮助？"}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          {language === "en"
            ? "If you need assistance with any of our services, please contact our support team at:"
            : "如果您需要任何服务的帮助，请联系我们的支持团队："}
        </p>
        <a
          href="mailto:ethan@hanlife02.com"
          className="mt-2 inline-block text-blue-600 dark:text-blue-400 hover:underline"
        >
          ethan@hanlife02.com
        </a>
      </div>
    </div>
  )
}
