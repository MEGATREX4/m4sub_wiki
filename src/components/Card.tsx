import React from 'react';

interface CardProps {
  title?: string;
  image?: string;
  imageCaption?: string;
  children?: React.ReactNode;
  color?: 'pink' | 'blue' | 'purple' | 'green';
}

const colorMap = {
  pink: { border: '#c5629a', bg: '#1f0d22', header: '#f390d0' },
  blue: { border: '#4dd0e1', bg: '#0d1f2a', header: '#4dd0e1' },
  purple: { border: '#ba68c8', bg: '#1a0d2a', header: '#ba68c8' },
  green: { border: '#4caf50', bg: '#0d2a1a', header: '#81c784' }
};

export default function Card({
  title = '',
  image,
  imageCaption,
  children,
  color = 'pink'
}: CardProps) {
  const colors = colorMap[color];

  return (
    <div
      className="my-6 border-2"
      style={{ borderColor: colors.border }}
    >
      {image && (
        <div className="p-4 bg-black flex justify-center border-b-2" style={{ borderColor: colors.border }}>
          <img
            src={image}
            alt={title}
            className="max-h-96 w-auto object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      )}

      {title && (
        <div className="px-6 py-4 border-b-2" style={{ backgroundColor: colors.bg, borderColor: colors.border }}>
          <h3 className="minecraftFont text-2xl font-bold" style={{ color: colors.header }}>
            {title}
          </h3>
        </div>
      )}

      <div className="p-6 bg-[#0a0a12]/80">
        <div className="prose prose-invert max-w-none">{children}</div>
      </div>

      {imageCaption && (
        <div className="px-6 py-3 text-xs text-gray-400 italic border-t-2" style={{ borderColor: colors.border }}>
          {imageCaption}
        </div>
      )}
    </div>
  );
}