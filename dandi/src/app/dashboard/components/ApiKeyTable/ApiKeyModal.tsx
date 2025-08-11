'use client';

interface FormData {
  name: string;
  type: string;
  usageLimit: string;
}

interface ApiKeyModalProps {
  isVisible: boolean;
  formData: FormData;
  onFormDataChange: (data: FormData) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export default function ApiKeyModal({
  isVisible,
  formData,
  onFormDataChange,
  onSubmit,
  onCancel,
  isLoading
}: ApiKeyModalProps) {
  if (!isVisible) return null;

  const handleInputChange = (field: keyof FormData, value: string) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Create a new API key</h2>
        <p className="text-gray-600 text-sm mb-6">Enter a name and limit for the new API key.</p>
        
        {/* Key Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Key Name — <span className="text-gray-500 font-normal">A unique name to identify this key</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Key Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Key Type */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Key Type — <span className="text-gray-500 font-normal">Choose the environment for this key</span>
          </label>
          <div className="space-y-3">
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                formData.type === 'dev' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleInputChange('type', 'dev')}
            >
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                  formData.type === 'dev' 
                    ? 'border-blue-500 bg-blue-500' 
                    : 'border-gray-300'
                }`}>
                  {formData.type === 'dev' && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                  )}
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"/>
                  </svg>
                  <div>
                    <div className="font-medium text-gray-900">Development</div>
                    <div className="text-sm text-gray-500">Rate limited to 100 requests/minute</div>
                  </div>
                </div>
              </div>
            </div>

            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                formData.type === 'prod' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleInputChange('type', 'prod')}
            >
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                  formData.type === 'prod' 
                    ? 'border-blue-500 bg-blue-500' 
                    : 'border-gray-300'
                }`}>
                  {formData.type === 'prod' && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                  )}
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                  </svg>
                  <div>
                    <div className="font-medium text-gray-900">Production</div>
                    <div className="text-sm text-gray-500">Rate limited to 1,000 requests/minute</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Limit */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Limit monthly usage*
          </label>
          <input
            type="number"
            value={formData.usageLimit}
            onChange={(e) => handleInputChange('usageLimit', e.target.value)}
            placeholder="1000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-2">
            * If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            {isLoading ? 'Creating...' : 'Create'}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
