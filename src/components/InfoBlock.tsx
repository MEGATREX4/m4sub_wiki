import React from 'react';

interface InfoBlockProps {
  title?: string;
  icon?: string;
  type?: 'info' | 'warning' | 'success' | 'error' | 'tip';
  children?: React.ReactNode;
}

const typeStyles = {
  info: { bg: 'bg-[#1f0d22]', border: 'border-[#c5629a]', title: 'text-[#f390d0]', icon: '📌' },
  warning: { bg: 'bg-[#2a1a1a]', border: 'border-[#ff9800]', title: 'text-[#ffb74d]', icon: '⚠️' },
  success: { bg: 'bg-[#1a2a1a]', border: 'border-[#4caf50]', title: 'text-[#81c784]', icon: '✓' },
  error: { bg: 'bg-[#2a1a1a]', border: 'border-[#f44336]', title: 'text-[#ef5350]', icon: '✕' },
  tip: { bg: 'bg-[#1a2a2a]', border: 'border-[#00bcd4]', title: 'text-[#4dd0e1]', icon: '💡' }
};

export default function InfoBlock({
  title = '',
  icon,
  type = 'info',
  children
}: InfoBlockProps) {
  const style = typeStyles[type];

  return (
    <div className={`my-6 p-4 border-l-4 border-2 ${style.bg} ${style.border}`}>
      <div className="flex gap-3 items-start">
        <span className="text-2xl flex-shrink-0 mt-0.5">{icon || style.icon}</span>
        <div className="flex-1">
          {title && <h4 className={`minecraftFont font-bold mb-2 ${style.title}`}>{title}</h4>}
          <div className="text-sm leading-relaxed text-gray-300">{children}</div>
        </div>
      </div>
    </div>
  );
}