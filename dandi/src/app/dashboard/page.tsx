'use client';

import Snackbar from '../../components/Snackbar';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import PlanOverview from './components/PlanOverview';
import ApiKeyTable from './components/ApiKeyTable/ApiKeyTable';
import { useApiKeys } from '../../hooks/useApiKeys';
import { useSnackbar } from '../../hooks/useSnackbar';

export default function Dashboard() {
  const {
    apiKeys,
    loading,
    error,
    createApiKey,
    updateApiKey,
    deleteApiKey,
    totalUsage,
  } = useApiKeys();

  const { snackbar, showSnackbar, hideSnackbar } = useSnackbar();

  const handleCreateApiKey = async (data: { name: string; type: string; usageLimit: string }) => {
    try {
      await createApiKey(data);
      showSnackbar(`API key "${data.name}" created successfully!`, 'success');
    } catch (err) {
      showSnackbar('Failed to create API key', 'error');
      throw err;
    }
  };

  const handleUpdateApiKey = async (id: string, data: { name?: string; type?: string; usageLimit?: string; isActive?: boolean }) => {
    try {
      await updateApiKey(id, data);
      showSnackbar(`API key updated successfully!`, 'success');
    } catch (err) {
      showSnackbar('Failed to update API key', 'error');
      throw err;
    }
  };

  const handleDeleteApiKey = async (id: string) => {
    // Find the API key name for the snackbar message
    const apiKey = apiKeys.find(key => key.id === id);
    const keyName = apiKey?.name || 'API key';
    
    try {
      await deleteApiKey(id);
      showSnackbar(`"${keyName}" deleted successfully!`, 'success');
    } catch (err) {
      showSnackbar('Failed to delete API key', 'error');
      throw err;
    }
  };

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showSnackbar('API key copied to clipboard!', 'success');
    } catch (err) {
      showSnackbar('Failed to copy to clipboard', 'error');
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
            {/* Plan Overview Section */}
            <PlanOverview totalUsage={totalUsage} />

            {/* API Keys Table */}
            <ApiKeyTable
              apiKeys={apiKeys}
              loading={loading}
              error={error}
              onCreateApiKey={handleCreateApiKey}
              onUpdateApiKey={handleUpdateApiKey}
              onDeleteApiKey={handleDeleteApiKey}
              onCopyToClipboard={handleCopyToClipboard}
            />
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
