'use client';

import { useState } from 'react';
import { ApiKey } from '../../types/api-key';

interface FormData {
  name: string;
  type: string;
  usageLimit: string;
}

interface UseApiKeyFormReturn {
  formData: FormData;
  editingKey: ApiKey | null;
  showCreateModal: boolean;
  setFormData: (data: FormData) => void;
  setEditingKey: (key: ApiKey | null) => void;
  setShowCreateModal: (show: boolean) => void;
  resetForm: () => void;
  startEdit: (apiKey: ApiKey) => void;
  cancelEdit: () => void;
}

const defaultFormData: FormData = {
  name: '',
  type: 'dev',
  usageLimit: '1000'
};

export function useApiKeyForm(): UseApiKeyFormReturn {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const resetForm = () => {
    setFormData(defaultFormData);
    setEditingKey(null);
  };

  const startEdit = (apiKey: ApiKey) => {
    setEditingKey(apiKey);
    setFormData({
      name: apiKey.name,
      type: apiKey.type,
      usageLimit: apiKey.usage_limit?.toString() || '1000'
    });
    setShowCreateModal(false);
  };

  const cancelEdit = () => {
    setEditingKey(null);
    setFormData(defaultFormData);
  };

  return {
    formData,
    editingKey,
    showCreateModal,
    setFormData,
    setEditingKey,
    setShowCreateModal,
    resetForm,
    startEdit,
    cancelEdit,
  };
}
