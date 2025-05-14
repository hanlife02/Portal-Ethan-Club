import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Installation | Ethan Club Docs",
  description: "Learn how to install and set up Ethan Club services",
}

export default function InstallationPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-navy-800 dark:text-pink-200">Installation</h1>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="lead">
          This guide will walk you through the process of installing and setting up the necessary components to use
          Ethan Club services.
        </p>

        <h2>Prerequisites</h2>
        <p>Before you begin, make sure you have the following:</p>
        <ul>
          <li>An Ethan Club account</li>
          <li>Access credentials provided by the administrator</li>
          <li>Basic understanding of API usage</li>
        </ul>

        <h2>Installation Steps</h2>
        <h3>1. Register for an Account</h3>
        <p>
          If you haven't already, create an account on the Ethan Club platform. You'll need to contact the administrator
          to get an invitation code.
        </p>

        <h3>2. Obtain API Keys</h3>
        <p>
          Once your account is set up, you can generate API keys from your dashboard. These keys will be used to
          authenticate your requests to the services.
        </p>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-6">
          <p className="text-sm font-mono">
            # Example API key format
            <br />
            ETHAN_API_KEY=ek_live_xxxxxxxxxxxxxxxxxxxx
          </p>
        </div>

        <h3>3. Install the Client Library</h3>
        <p>
          We provide client libraries for various programming languages to make integration easier. Choose the library
          that matches your development environment.
        </p>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-6">
          <p className="text-sm font-mono">
            # For JavaScript/Node.js
            <br />
            npm install ethan-club-client
            <br />
            <br /># For Python
            <br />
            pip install ethan-club-client
          </p>
        </div>

        <h3>4. Configure the Client</h3>
        <p>Initialize the client with your API key and you're ready to start using Ethan Club services.</p>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-6">
          <p className="text-sm font-mono">
            // JavaScript example
            <br />
            const EthanClient = require('ethan-club-client');
            <br />
            const client = new EthanClient('ek_live_xxxxxxxxxxxxxxxxxxxx');
            <br />
            <br />
            // Now you can use the client to access services
            <br />
            const response = await client.services.list();
          </p>
        </div>

        <h2>Next Steps</h2>
        <p>
          Now that you have installed and configured the client, you can proceed to the{" "}
          <a href="/docs/getting-started/configuration" className="text-pink-600 dark:text-pink-400 hover:underline">
            Configuration
          </a>{" "}
          section to learn how to customize the client for your specific needs.
        </p>
      </div>
    </div>
  )
}
