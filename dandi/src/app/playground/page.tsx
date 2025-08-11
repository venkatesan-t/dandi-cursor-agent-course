'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar, Header } from '../../components/layout';
import { Snackbar } from '../../components/ui';
import { useSnackbar } from '../../hooks/useSnackbar';

export default function Playground() {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { snackbar, showSnackbar, hideSnackbar } = useSnackbar();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      showSnackbar('Please enter an API key', 'error');
      return;
    }

    setIsLoading(true);
    
    try {
      // Validate the API key by fetching all API keys and checking if the provided key exists
      const response = await fetch('/api/api-keys');
      
      if (!response.ok) {
        throw new Error('Failed to validate API key');
      }

      const apiKeys = await response.json();
      
      // Check if the provided API key exists and is active
      const validKey = apiKeys.find((key: any) => 
        key.key === apiKey && key.is_active === true
      );

      if (validKey) {
        // Show success message
        showSnackbar('Valid API key, redirecting to API Playground', 'success');
        
        // Navigate to protected page after 3 seconds
        setTimeout(() => {
          router.push('/protected');
        }, 3000);
      } else {
        // Show error message for invalid key
        showSnackbar('Invalid API Key', 'error');
      }
    } catch (error) {
      console.error('Error validating API key:', error);
      showSnackbar('Error validating API key', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <Header />

          <main className="p-8">
            <div className="max-w-2xl mx-auto">
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">API Playground</h1>
                <p className="text-gray-600">
                  Enter your API key to access the protected playground environment.
                </p>
              </div>

              {/* API Key Form */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
                      API Key
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="apiKey"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your API key..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        disabled={isLoading}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"/>
                        </svg>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Your API key will be validated before granting access to the playground.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !apiKey.trim()}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Validating...
                      </div>
                    ) : (
                      'Access Playground'
                    )}
                  </button>
                </form>

                {/* Additional Info */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
                    </svg>
                    <div>
                      <h3 className="text-sm font-medium text-blue-800 mb-1">Getting Started</h3>
                      <p className="text-sm text-blue-700">
                        If you don't have an API key yet, you can create one from the{' '}
                        <a href="/dashboard" className="underline hover:text-blue-900">
                          dashboard
                        </a>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* Snackbar */}
      <Snackbar
        message={snackbar.message}
        isVisible={snackbar.isVisible}
        type={snackbar.type}
        onClose={hideSnackbar}
      />
    </div>
  );
}
