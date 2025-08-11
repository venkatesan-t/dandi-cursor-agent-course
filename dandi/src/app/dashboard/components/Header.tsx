'use client';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <span>Pages</span>
            <span>/</span>
            <span>Overview</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Operational</span>
          </div>
        </div>
      </div>
    </header>
  );
}
