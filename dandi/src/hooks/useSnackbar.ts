'use client';

import { useState } from 'react';

interface SnackbarState {
  isVisible: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface UseSnackbarReturn {
  snackbar: SnackbarState;
  showSnackbar: (message: string, type?: 'success' | 'error' | 'info') => void;
  hideSnackbar: () => void;
}

export function useSnackbar(): UseSnackbarReturn {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    isVisible: false,
    message: '',
    type: 'success'
  });

  const showSnackbar = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setSnackbar({
      isVisible: true,
      message,
      type
    });
  };

  const hideSnackbar = () => {
    setSnackbar(prev => ({ ...prev, isVisible: false }));
  };

  return {
    snackbar,
    showSnackbar,
    hideSnackbar,
  };
}
