import React, { useState } from 'react';
import { categories } from '../lib/wikiContent';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon';

interface MobileSidebarProps {
  activeCategorySlug?: string;
}

export default function MobileSidebar({ activeCategorySlug }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const go = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div className="lg:hidden mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 minecraftFont text-sm"
        style={{ background: '#130217', border: '1px solid #4a1f38', color: '#c5629a' }}
      >
        <span className="flex items-center gap-2">
          <i className="hn hn-book"></i>
          Категорії
        </span>
        <i className={`hn ${open ? 'hn-chevron-up' : 'hn-chevron-down'}`}></i>
      </button>

      {open && (
        <div style={{ background: '#130217', border: '1px solid #4a1f38', borderTop: 'none' }}>
          {categories.map((cat) => {
            const isActive = cat.slug === activeCategorySlug;
            const subcategories = cat.subcategories || [];

            return (
              <div key={cat.slug}>
                <button
                  onClick={() => go(`/wiki/${cat.slug}`)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left transition-all"
                  style={{
                    background: isActive ? '#1f0d22' : 'transparent',
                    color: isActive ? '#fff' : '#9ca3af',
                    borderLeft: isActive ? '3px solid #c5629a' : '3px solid transparent',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Icon name={cat.icon} size={20} color={isActive ? '#ffffff' : '#c5629a'} />
                    <span className="minecraftFont text-sm">{cat.label}</span>
                  </div>
                </button>

                {/* Вкладені підкатегорії у мобільному висувному меню */}
                {isActive && subcategories.length > 0 && (
                  <div className="bg-[#0a0a12]/80 py-1 pl-6 border-l border-[#4a1f38] my-1">
                    {subcategories.map((sub) => (
                      <div
                        key={sub.slug}
                        className="px-4 py-1.5 text-xs minecraftFont text-[#c5629a] flex items-center gap-2"
                      >
                        <Icon name={sub.icon || 'hn-folder'} size={14} />
                        <span>{sub.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}