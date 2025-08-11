'use client';

import { ApiKey } from '../../../../../types/api-key';

interface ApiKeyRowProps {
  apiKey: ApiKey;
  visibleKeys: Set<string>;
  onToggleVisibility: (keyId: string) => void;
  onCopy: (text: string) => void;
  onEdit: (apiKey: ApiKey) => void;
  onDelete: (id: string) => void;
}

export default function ApiKeyRow({
  apiKey,
  visibleKeys,
  onToggleVisibility,
  onCopy,
  onEdit,
  onDelete
}: ApiKeyRowProps) {
  const isVisible = visibleKeys.has(apiKey.id);
  const maskedKey = apiKey.key.replace(/(?<=.{9}).*(?=.{4}$)/, '************************');

  return (
    <div className="px-6 py-4 hover:bg-gray-50">
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-2">
          <span className="text-sm font-medium text-gray-900">{apiKey.name}</span>
        </div>
        <div className="col-span-2">
          <span className="text-sm text-gray-600">{apiKey.type}</span>
        </div>
        <div className="col-span-1">
          <span className="text-sm text-gray-600">{apiKey.usage}</span>
        </div>
        <div className="col-span-4">
          <code className="text-sm font-mono text-gray-800 bg-gray-100 px-2 py-1 rounded">
            {isVisible ? apiKey.key : maskedKey}
          </code>
        </div>
        <div className="col-span-3 flex items-center gap-2">
          <button
            onClick={() => onToggleVisibility(apiKey.id)}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title={isVisible ? "Hide Key" : "Show Key"}
          >
            {isVisible ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"/>
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
              </svg>
            )}
          </button>
          <button
            onClick={() => onCopy(apiKey.key)}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title="Copy to Clipboard"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
            </svg>
          </button>
          <button
            onClick={() => onEdit(apiKey)}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title="Edit"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
            </svg>
          </button>
          <button
            onClick={() => onDelete(apiKey.id)}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
