'use client';

import { Sidebar, Header } from '../../components/layout';

function ProtectedContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-8">
            <div className="max-w-4xl mx-auto">
              {/* Success Header */}
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Protected Playground</h1>
                <p className="text-gray-600">
                  Welcome to the protected area! Your API key has been validated successfully.
                </p>
              </div>

              {/* Playground Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* API Testing Panel */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">API Testing</h2>
                  <p className="text-gray-600 mb-4">
                    Test your API endpoints and explore the available functionality.
                  </p>
                  <div className="space-y-3">
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                      Test API Endpoint
                    </button>
                    <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                      View Documentation
                    </button>
                  </div>
                </div>

                {/* Usage Analytics */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Usage Analytics</h2>
                  <p className="text-gray-600 mb-4">
                    Monitor your API usage and performance metrics.
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Requests Today:</span>
                      <span className="font-medium">127</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Remaining Quota:</span>
                      <span className="font-medium text-green-600">9,873</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Success Rate:</span>
                      <span className="font-medium">99.2%</span>
                    </div>
                  </div>
                </div>

                {/* Code Examples */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 md:col-span-2">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Code Examples</h2>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <code className="text-green-400 text-sm">
                      <div className="text-gray-400"># Example API call using curl</div>
                      <div className="text-white">curl -X POST https://api.dandi.ai/v1/generate \</div>
                      <div className="text-white ml-4">-H "Authorization: Bearer YOUR_API_KEY" \</div>
                      <div className="text-white ml-4">-H "Content-Type: application/json" \</div>
                      <div className="text-white ml-4">-d '{"{"}"prompt": "Hello, world!", "max_tokens": 100{"}"}'</div>
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function Protected() {
  return <ProtectedContent />;
}
