'use client';

import { useState, useEffect } from 'react';
import { ApiKey } from '../../types/api-key';

interface UseApiKeysReturn {
  apiKeys: ApiKey[];
  loading: boolean;
  error: string | null;
  fetchApiKeys: () => Promise<void>;
  createApiKey: (data: { name: string; type: string; usageLimit: string }) => Promise<ApiKey>;
  updateApiKey: (id: string, data: { name?: string; type?: string; usageLimit?: string; isActive?: boolean }) => Promise<ApiKey>;
  deleteApiKey: (id: string) => Promise<void>;
  totalUsage: number;
}

export function useApiKeys(): UseApiKeysReturn {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApiKeys = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/api-keys');
      if (!response.ok) {
        throw new Error('Failed to fetch API keys');
      }
      const data = await response.json();
      setApiKeys(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createApiKey = async (data: { name: string; type: string; usageLimit: string }) => {
    setLoading(true);
    const response = await fetch('/api/api-keys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        type: data.type,
        usageLimit: data.usageLimit,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create API key');
    }

    const newApiKey = await response.json();
    setApiKeys(prev => [newApiKey, ...prev]);
    setError(null);
    setLoading(false);
    return newApiKey;
  };

  const updateApiKey = async (id: string, data: { name?: string; type?: string; usageLimit?: string; isActive?: boolean }) => {
    setLoading(true);
    const response = await fetch(`/api/api-keys/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update API key');
    }

    const updatedApiKey = await response.json();
    setApiKeys(prev => prev.map(key => 
      key.id === id ? updatedApiKey : key
    ));
    setError(null);
    setLoading(false);
    return updatedApiKey;
  };

  const deleteApiKey = async (id: string) => {
    setLoading(true);
    const response = await fetch(`/api/api-keys/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete API key');
    }

    setApiKeys(prev => prev.filter(key => key.id !== id));
    setError(null);
    setLoading(false);
  };

  const totalUsage = apiKeys.reduce((sum, key) => sum + key.usage, 0);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  return {
    apiKeys,
    loading,
    error,
    fetchApiKeys,
    createApiKey,
    updateApiKey,
    deleteApiKey,
    totalUsage,
  };
}
