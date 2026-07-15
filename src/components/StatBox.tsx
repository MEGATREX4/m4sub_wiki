import React from 'react';

interface Stat {
  label: string;
  value: string | number;
}

interface StatBoxProps {
  title?: string;
  stats?: Stat[];
  color?: 'pink' | 'blue' | 'purple' | 'green' | 'orange';
}

const colorMap = {
  pink: { bg: 'bg-[#1f0d22]', border: 'border-[#c5629a]', text: 'text-[#f390d0]' },
  blue: { bg: 'bg-[#0d1f2a]', border: 'border-[#4dd0e1]', text: 'text-[#4dd0e1]' },
  purple: { bg: 'bg-[#1a0d2a]', border: 'border-[#ba68c8]', text: 'text-[#ba68c8]' },
  green: { bg: 'bg-[#0d2a1a]', border: 'border-[#4caf50]', text: 'text-[#81c784]' },
  orange: { bg: 'bg-[#2a1a0d]', border: 'border-[#ff9800]', text: 'text-[#ffb74d]' }
};

export default function StatBox({
  title = '',
  stats = [],
  color = 'pink'
}: StatBoxProps) {
  const colors = colorMap[color];

  return (
    <div
      className={`my-6 ${colors.bg} border-2 ${colors.border}  overflow-hidden`}
    >
      {/* Header */}
      {title && (
        <div className="px-6 py-4 border-b-2 border-opacity-30" style={{ borderColor: colors.border }}>
          <h3 className={`minecraftFont text-xl font-bold ${colors.text}`}>
            {title}
          </h3>
        </div>
      )}

      {/* Stats Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span
                className="text-xs uppercase tracking-wider minecraftFont mb-1"
                style={{ color: 'rgba(209, 213, 219, 0.7)' }}
              >
                {stat.label}
              </span>
              <span
                className={`text-lg font-bold ${colors.text}`}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}