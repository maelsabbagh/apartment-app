'use client';

import { useState } from 'react';

export default function TestAPI() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/health`);
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError('Failed to connect to backend. Make sure it is running on port 5000');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          API Connection Test
        </h1>

        <button
          onClick={testConnection}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Backend Connection'}
        </button>

        {response && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h2 className="font-semibold text-green-800 mb-2">Success!</h2>
            <pre className="text-sm text-gray-700 overflow-x-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h2 className="font-semibold text-red-800 mb-2">Error</h2>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        
      </div>
    </main>
  );
}