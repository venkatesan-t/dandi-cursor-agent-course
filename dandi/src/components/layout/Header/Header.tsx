'use client';

interface HeaderProps {
  title?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  showStatus?: boolean;
  statusText?: string;
  statusColor?: 'green' | 'yellow' | 'red';
}

export default function Header({ 
  title = "Overview",
  breadcrumbs = [{ label: "Pages" }, { label: "Overview" }],
  showStatus = true,
  statusText = "Operational",
  statusColor = "green"
}: HeaderProps) {
  const statusColorMap = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-500', 
    red: 'bg-red-500'
  };

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            {breadcrumbs.map((crumb, index) => (
              <span key={index} className="flex items-center gap-2">
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-gray-700">
                    {crumb.label}
                  </a>
                ) : (
                  <span>{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && <span>/</span>}
              </span>
            ))}
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        </div>
        {showStatus && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 ${statusColorMap[statusColor]} rounded-full`}></div>
              <span className="text-sm text-gray-600">{statusText}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
