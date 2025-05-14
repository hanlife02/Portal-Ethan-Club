import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Documentation | Ethan Club",
  description: "Documentation for Ethan Club services",
}

export default function DocsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-navy-800 dark:text-pink-200">Documentation</h1>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="lead">
          Welcome to the Ethan Club documentation. Here you'll find comprehensive guides and documentation to help you
          start working with Ethan Club services as quickly as possible.
        </p>

        <h2>Getting Started</h2>
        <p>
          To get started with Ethan Club services, you'll need to create an account and obtain the necessary
          credentials. Follow the steps below to get up and running quickly.
        </p>

        <h3>Create an Account</h3>
        <p>
          Before you can use any of our services, you need to create an account. Visit the{" "}
          <a href="/login" className="text-pink-600 dark:text-pink-400 hover:underline">
            login page
          </a>{" "}
          and follow the registration process.
        </p>

        <h3>Explore Available Services</h3>
        <p>
          Once you have an account, you can explore the available services from your{" "}
          <a href="/dashboard" className="text-pink-600 dark:text-pink-400 hover:underline">
            dashboard
          </a>
          . Each service has its own documentation section that you can access from the sidebar.
        </p>

        <h2>Need Help?</h2>
        <p>
          If you need help with anything, please contact the site administrator at{" "}
          <a href="mailto:ethan@hanlife02.com" className="text-pink-600 dark:text-pink-400 hover:underline">
            ethan@hanlife02.com
          </a>
          .
        </p>
      </div>
    </div>
  )
}
