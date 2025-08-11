'use client';

import { useState } from 'react';
import { ApiKey } from '../../../../../types/api-key';
import ApiKeyRow from './ApiKeyRow';
import ApiKeyModal from './ApiKeyModal';
import { useApiKeyForm } from '../../../../hooks/useApiKeyForm';

interface ApiKeyTableProps {
  apiKeys: ApiKey[];
  loading: boolean;
  error: string | null;
  onCreateApiKey: (data: { name: string; type: string; usageLimit: string }) => Promise<void>;
  onUpdateApiKey: (id: string, data: { name?: string; type?: string; usageLimit?: string; isActive?: boolean }) => Promise<void>;
  onDeleteApiKey: (id: string) => Promise<void>;
  onCopyToClipboard: (text: string) => void;
}

export default function ApiKeyTable({
  apiKeys,
  loading,
  error,
  onCreateApiKey,
  onUpdateApiKey,
  onDeleteApiKey,
  onCopyToClipboard
}: ApiKeyTableProps) {
  const {
    formData,
    editingKey,
    showCreateModal,
    setFormData,
    setShowCreateModal,
    resetForm,
    startEdit,
    cancelEdit
  } = useApiKeyForm();

  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  const handleCreate = async () => {
    if (!formData.name) return;
    
    try {
      await onCreateApiKey(formData);
      resetForm();
      setShowCreateModal(false);
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  const handleUpdate = async () => {
    if (!editingKey || !formData.name) return;

    try {
      await onUpdateApiKey(editingKey.id, {
        name: formData.name,
        type: formData.type,
        usageLimit: formData.usageLimit,
      });
      cancelEdit();
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await onDeleteApiKey(id);
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  return (
    <>
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"/>
            </svg>
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* API Keys Section */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">API Keys</h2>
              <p className="text-sm text-gray-600 mt-1">
                The key is used to authenticate your requests to the Research API. To learn more, see the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-800">documentation page</a>.
              </p>
            </div>
            <button
              onClick={() => {
                setShowCreateModal(true);
                cancelEdit();
                resetForm();
              }}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ml-4 flex-shrink-0"
            >
              {loading ? 'Loading...' : '+ Create New Key'}
            </button>
          </div>
        </div>

        {/* Edit Form (inline for editing) */}
        {editingKey && (
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Edit API Key</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  NAME
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter API key name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  TYPE
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="dev">dev</option>
                  <option value="prod">prod</option>
                  <option value="test">test</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleUpdate}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors text-sm mr-2"
                >
                  Update
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table Header */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-2">NAME</div>
            <div className="col-span-2">TYPE</div>
            <div className="col-span-1">USAGE</div>
            <div className="col-span-4">KEY</div>
            <div className="col-span-3">OPTIONS</div>
          </div>
        </div>
        
        {/* Table Body */}
        {loading && apiKeys.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500">Loading API keys...</p>
          </div>
        ) : apiKeys.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500">
              No API keys found. Create your first API key to get started.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {apiKeys.map((apiKey) => (
              <ApiKeyRow
                key={apiKey.id}
                apiKey={apiKey}
                visibleKeys={visibleKeys}
                onToggleVisibility={toggleKeyVisibility}
                onCopy={onCopyToClipboard}
                onEdit={startEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create API Key Modal */}
      <ApiKeyModal
        isVisible={showCreateModal}
        formData={formData}
        onFormDataChange={setFormData}
        onSubmit={handleCreate}
        onCancel={() => setShowCreateModal(false)}
        isLoading={loading}
      />
    </>
  );
}
