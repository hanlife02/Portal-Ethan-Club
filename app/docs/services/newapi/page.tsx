"use client"

import { useLanguage } from "@/contexts/language-context"

export default function NewAPIPage() {
  const { language } = useLanguage()

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-navy-800 dark:text-pink-200">NewAPI</h1>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        {language === "en" ? (
          // English content - simplified
          <>
            <p className="lead">
              NewAPI is a powerful tool that helps you access and process information from various sources.
            </p>

            <h2>What You Can Do With NewAPI</h2>
            <ul>
              <li>Get information from different websites and services</li>
              <li>Process and analyze data</li>
              <li>Generate images and text with AI</li>
              <li>Convert between different file formats</li>
              <li>Automate repetitive tasks</li>
            </ul>

            <h2>Who Is NewAPI For?</h2>
            <p>
              NewAPI is designed for everyone from beginners to experts. You don't need to be a technical expert to use
              it - our user-friendly interface makes it easy to get started.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                <h3 className="text-lg font-medium">For Beginners</h3>
                <p className="text-sm">
                  Use our simple interface to access information and perform tasks without writing any code.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                <h3 className="text-lg font-medium">For Developers</h3>
                <p className="text-sm">
                  Integrate NewAPI into your applications to add powerful features with minimal effort.
                </p>
              </div>
            </div>

            <h2>Popular Use Cases</h2>
            <ul>
              <li>Creating personalized content for websites and social media</li>
              <li>Automating data collection and analysis</li>
              <li>Building chatbots and virtual assistants</li>
              <li>Generating images and graphics</li>
              <li>Translating content between languages</li>
            </ul>

            <div className="bg-blue-50 dark:bg-navy-800 p-4 rounded-md my-6">
              <h3 className="text-blue-700 dark:text-blue-300 mt-0">Getting Started</h3>
              <p className="mb-0">
                To start using NewAPI, simply log in to your Ethan Club account and select NewAPI from your dashboard.
                No additional setup is required!
              </p>
            </div>
          </>
        ) : (
          // Chinese content - simplified
          <>
            <p className="lead">NewAPI 是一个强大的工具，可帮助您访问和处理来自各种来源的信息。</p>

            <h2>您可以用 NewAPI 做什么</h2>
            <ul>
              <li>从不同的网站和服务获取信息</li>
              <li>处理和分析数据</li>
              <li>使用 AI 生成图像和文本</li>
              <li>在不同的文件格式之间转换</li>
              <li>自动化重复性任务</li>
            </ul>

            <h2>NewAPI 适合谁使用</h2>
            <p>
              NewAPI 的设计适合从初学者到专家的所有人。您不需要成为技术专家就能使用它 -
              我们用户友好的界面使入门变得简单。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                <h3 className="text-lg font-medium">对于初学者</h3>
                <p className="text-sm">使用我们简单的界面访问信息并执行任务，无需编写任何代码。</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                <h3 className="text-lg font-medium">对于开发者</h3>
                <p className="text-sm">将 NewAPI 集成到您的应用程序中，以最小的努力添加强大的功能。</p>
              </div>
            </div>

            <h2>常见用例</h2>
            <ul>
              <li>为网站和社交媒体创建个性化内容</li>
              <li>自动化数据收集和分析</li>
              <li>构建聊天机器人和虚拟助手</li>
              <li>生成图像和图形</li>
              <li>在不同语言之间翻译内容</li>
            </ul>

            <div className="bg-blue-50 dark:bg-navy-800 p-4 rounded-md my-6">
              <h3 className="text-blue-700 dark:text-blue-300 mt-0">开始使用</h3>
              <p className="mb-0">
                要开始使用 NewAPI，只需登录您的 Ethan Club 账户并从仪表板中选择 NewAPI。 无需额外设置！
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
