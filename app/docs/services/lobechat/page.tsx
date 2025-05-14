"use client"

import { useLanguage } from "@/contexts/language-context"

export default function LobeChatPage() {
  const { language } = useLanguage()

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-navy-800 dark:text-pink-200">LobeChat</h1>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        {language === "en" ? (
          // English content - simplified
          <>
            <p className="lead">
              LobeChat is an AI assistant that helps you with everyday tasks through natural conversation.
            </p>

            <h2>What You Can Do With LobeChat</h2>
            <ul>
              <li>Ask questions and get instant answers</li>
              <li>Generate creative content like stories and poems</li>
              <li>Get help with writing emails and messages</li>
              <li>Brainstorm ideas for projects and presentations</li>
              <li>Learn about various topics through conversation</li>
            </ul>

            <h2>How to Use LobeChat</h2>
            <p>
              Using LobeChat is simple! Just type your question or request in the chat box and press enter. The AI will
              respond to you in a conversational manner. You can have back-and-forth conversations just like you would
              with a human assistant.
            </p>

            <div className="bg-blue-50 dark:bg-navy-800 p-4 rounded-md my-6">
              <h3 className="text-blue-700 dark:text-blue-300 mt-0">Pro Tip</h3>
              <p className="mb-0">
                For best results, be specific with your requests. Instead of asking "Tell me about books," try
                "Recommend fantasy books for a 12-year-old who enjoys Harry Potter."
              </p>
            </div>

            <h2>Examples of What You Can Ask</h2>
            <ul>
              <li>"Can you help me draft an email to reschedule a meeting?"</li>
              <li>"I need ideas for a birthday gift for my mom who loves gardening."</li>
              <li>"Explain quantum computing in simple terms."</li>
              <li>"Write a short poem about autumn leaves."</li>
              <li>"Help me plan a 7-day itinerary for Tokyo."</li>
            </ul>
          </>
        ) : (
          // Chinese content - simplified
          <>
            <p className="lead">LobeChat 是一个人工智能助手，通过自然对话帮助您完成日常任务。</p>

            <h2>您可以用 LobeChat 做什么</h2>
            <ul>
              <li>提问并获得即时答案</li>
              <li>生成创意内容，如故事和诗歌</li>
              <li>获取撰写电子邮件和消息的帮助</li>
              <li>为项目和演示文稿集思广益</li>
              <li>通过对话学习各种主题</li>
            </ul>

            <h2>如何使用 LobeChat</h2>
            <p>
              使用 LobeChat 非常简单！只需在聊天框中输入您的问题或请求，然后按回车键。 AI
              将以对话方式回应您。您可以像与人类助手一样进行来回对话。
            </p>

            <div className="bg-blue-50 dark:bg-navy-800 p-4 rounded-md my-6">
              <h3 className="text-blue-700 dark:text-blue-300 mt-0">专业提示</h3>
              <p className="mb-0">
                为了获得最佳结果，请具体说明您的请求。不要问"告诉我关于书籍的信息"，
                而是尝试"为喜欢哈利波特的12岁孩子推荐奇幻书籍"。
              </p>
            </div>

            <h2>您可以询问的示例</h2>
            <ul>
              <li>"你能帮我起草一封重新安排会议的电子邮件吗？"</li>
              <li>"我需要为喜欢园艺的妈妈准备生日礼物的想法。"</li>
              <li>"用简单的术语解释量子计算。"</li>
              <li>"写一首关于秋叶的短诗。"</li>
              <li>"帮我规划一个7天的东京行程。"</li>
            </ul>
          </>
        )}
      </div>
    </div>
  )
}
