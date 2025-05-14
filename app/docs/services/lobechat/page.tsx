import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "LobeChat | Ethan Club Docs",
  description: "Documentation for the LobeChat service",
}

export default function LobeChatPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-navy-800 dark:text-pink-200">LobeChat</h1>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="lead">
          LobeChat is an AI chat service that provides advanced conversational capabilities powered by large language
          models.
        </p>

        <h2>Overview</h2>
        <p>
          LobeChat allows you to interact with state-of-the-art AI models through a simple and intuitive interface. It
          supports various features including:
        </p>
        <ul>
          <li>Multi-turn conversations</li>
          <li>Context awareness</li>
          <li>File and image processing</li>
          <li>Custom knowledge bases</li>
          <li>Conversation history</li>
        </ul>

        <h2>Getting Started</h2>
        <p>
          To start using LobeChat, simply access it from your dashboard after logging in. No additional setup is
          required as the service runs in your browser.
        </p>

        <h2>Features</h2>

        <h3>Conversation Modes</h3>
        <p>LobeChat offers different conversation modes optimized for various use cases:</p>
        <ul>
          <li>
            <strong>Chat Mode:</strong> General-purpose conversation
          </li>
          <li>
            <strong>Creative Mode:</strong> Enhanced creativity for brainstorming and content creation
          </li>
          <li>
            <strong>Precise Mode:</strong> Focused on accuracy and factual responses
          </li>
        </ul>

        <h3>File Handling</h3>
        <p>You can upload and process various file types including:</p>
        <ul>
          <li>Text documents (.txt, .md, .pdf)</li>
          <li>Images (.jpg, .png, .webp)</li>
          <li>Code files (.js, .py, .java, etc.)</li>
        </ul>

        <h2>API Integration</h2>
        <p>
          For developers who want to integrate LobeChat into their applications, we provide a comprehensive API. See the
          API Reference section for detailed documentation.
        </p>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-6">
          <p className="text-sm font-mono">
            // Example API usage
            <br />
            &nbsp;&nbsp;message: "Tell me about artificial intelligence",
            <br />
            &nbsp;&nbsp;mode: "precise"
            <br />
          </p>
        </div>

        <h2>Limitations</h2>
        <p>Please be aware of the following limitations when using LobeChat:</p>
        <ul>
          <li>Maximum context length of 100,000 tokens</li>
          <li>File upload size limit of 10MB</li>
          <li>Rate limits of 100 requests per minute</li>
        </ul>

        <h2>Support</h2>
        <p>
          If you encounter any issues or have questions about LobeChat, please contact our support team at{" "}
          <a href="mailto:ethan@hanlife02.com" className="text-pink-600 dark:text-pink-400 hover:underline">
            ethan@hanlife02.com
          </a>
          .
        </p>
      </div>
    </div>
  )
}
