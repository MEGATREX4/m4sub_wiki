import React from 'react';
import BorderBox from './BorderBox';
import Icon from './Icon';
import type { WikiEntry } from '../lib/wikiContent';

interface WikiInfoBoxProps {
  entry: WikiEntry;
}

const rarityColors: Record<string, { text: string; bg: string; border: string }> = {
  legendary: { text: '#ffaa00', bg: 'rgba(255, 170, 0, 0.2)', border: '#ffaa00' },
  epic: { text: '#a800a8', bg: 'rgba(168, 0, 168, 0.2)', border: '#a800a8' },
  rare: { text: '#55ffff', bg: 'rgba(85, 255, 255, 0.2)', border: '#55ffff' },
  uncommon: { text: '#55ff55', bg: 'rgba(85, 255, 85, 0.2)', border: '#55ff55' },
  common: { text: '#ffffff', bg: 'rgba(255, 255, 255, 0.1)', border: '#4a1f38' },
};

export default function WikiInfoBox({ entry }: WikiInfoBoxProps) {
  const rarityKey = (entry.rarity || 'common').toLowerCase();
  const rarityStyle = rarityColors[rarityKey] || rarityColors.common;

  return (
    <BorderBox borderColor="#c5629a" innerBg="#130217" className="mb-6">
      <div className="p-5 sm:p-6 space-y-4">
        {/* Верхній заголовок та бейджі */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#4a1f38]">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="minecraftFont text-2xl sm:text-3xl font-bold text-[#f390d0] leading-tight">
                {entry.title}
              </h1>
              {entry.description && (
                <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-relaxed">
                  {entry.description}
                </p>
              )}
            </div>
          </div>

          {/* Лейбли та рідкісність */}
          <div className="flex flex-wrap items-center gap-2">
            {entry.rarity && (
              <span
                className="minecraftFont text-xs uppercase px-2.5 py-1 border font-bold"
                style={{
                  color: rarityStyle.text,
                  backgroundColor: rarityStyle.bg,
                  borderColor: rarityStyle.border,
                }}
              >
                {entry.rarity}
              </span>
            )}
            {entry.label && (
              <span className="minecraftFont text-xs uppercase px-2.5 py-1 bg-[#0a0a12] text-[#c5629a] border border-[#4a1f38]">
                {entry.label}
              </span>
            )}
            <span className="minecraftFont text-xs uppercase px-2.5 py-1 bg-[#0a0a12] text-gray-300 border border-[#4a1f38]">
              {entry.category}
            </span>
          </div>
        </div>

        {/* Метаданих сітка з використанням subgrid */}
        <div
          className="grid gap-4"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gridAutoRows: '1fr',
            alignItems: 'stretch',
          }}
        >
          {/* Автори */}
          {entry.authors && entry.authors.length > 0 && (
            <div
              className="bg-[#0a0a12]/70 border border-[#4a1f38] p-4 flex flex-col"
              style={{
                display: 'grid',
                gridTemplateRows: 'auto 1fr',
                gap: '0.5rem',
                alignContent: 'start',
              }}
            >
              <span className="minecraftFont text-xs text-[#f390d0] uppercase font-bold">
                Автори
              </span>
              <div className="flex flex-wrap gap-2 items-start">
                {entry.authors.map((author, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-[#130217] px-2.5 py-1 border border-[#4a1f38]"
                  >
                    {author.mc ? (
                      <img
                        src={`https://mc-heads.net/avatar/${author.mc}/16`}
                        alt={author.name}
                        className="w-5 h-5 flex-shrink-0"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    ) : (
                      <i className="hn hn-user text-xs text-[#c5629a]"></i>
                    )}
                    <span className="minecraftFont text-xs text-gray-200">
                      {author.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Дата */}
          {entry.date && (
            <div
              className="bg-[#0a0a12]/70 border border-[#4a1f38] p-4 flex flex-col"
              style={{
                display: 'grid',
                gridTemplateRows: 'auto 1fr',
                gap: '0.5rem',
                alignContent: 'start',
              }}
            >
              <span className="minecraftFont text-xs text-[#f390d0] uppercase font-bold">
                Дата публікації
              </span>
              <span className="font-mono text-gray-300 text-sm">
                {entry.date}
              </span>
            </div>
          )}

          {/* Теги */}
          {entry.tags && entry.tags.length > 0 && (
            <div
              className="bg-[#0a0a12]/70 border border-[#4a1f38] p-4 flex flex-col"
              style={{
                display: 'grid',
                gridTemplateRows: 'auto 1fr',
                gap: '0.5rem',
                alignContent: 'start',
              }}
            >
              <span className="minecraftFont text-xs text-[#f390d0] uppercase font-bold">
                Теги
              </span>
              <div className="flex flex-wrap gap-1.5 items-start">
                {entry.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 bg-[#130217] text-[#c5629a] border border-[#4a1f38] whitespace-nowrap"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Посилання / Джерела */}
          {entry.alsoOn && entry.alsoOn.length > 0 && (
            <div
              className="bg-[#0a0a12]/70 border border-[#4a1f38] p-4 flex flex-col"
              style={{
                display: 'grid',
                gridTemplateRows: 'auto 1fr',
                gap: '0.5rem',
                alignContent: 'start',
              }}
            >
              <span className="minecraftFont text-xs text-[#f390d0] uppercase font-bold">
                Джерела
              </span>
              <div className="flex flex-wrap gap-2 items-start">
                {entry.alsoOn.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#f390d0] hover:text-[#c5629a] underline text-xs flex items-center gap-1 whitespace-nowrap"
                  >
                    {item.name}
                    <i className="hn hn-external-link text-xs"></i>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </BorderBox>
  );
}