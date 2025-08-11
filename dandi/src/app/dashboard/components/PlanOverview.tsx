'use client';

interface PlanOverviewProps {
  totalUsage: number;
}

export default function PlanOverview({ totalUsage }: PlanOverviewProps) {
  return (
    <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 rounded-2xl p-8 mb-8 text-white">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-white/80 text-sm font-medium mb-2">CURRENT PLAN</p>
          <h2 className="text-4xl font-bold mb-6">Developer</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-white/90 text-sm">API Usage</span>
                <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
                </svg>
              </div>
              <p className="text-white/90 text-sm mb-1">Plan</p>
              <div className="text-right text-white/90 text-sm mb-1">{totalUsage}/1,000 Credits</div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white/40 rounded-full"></div>
              <span className="text-white/90 text-sm">Pay as you go</span>
              <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium transition-colors border border-white/20">
          📊 Manage Plan
        </button>
      </div>
    </div>
  );
}
