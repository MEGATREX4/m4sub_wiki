import React, { useState } from 'react';
import { categories, getEntriesByCategory, getCategoryBySlug } from '../lib/wikiContent';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon';

interface SidebarProps {
  activeCategorySlug?: string;
  activeSlug?: string;
}

export default function Sidebar({ activeCategorySlug, activeSlug }: SidebarProps) {
  const navigate = useNavigate();
  const [collapsedSubs, setCollapsedSubs] = useState<Record<string, boolean>>({});

  const toggleSub = (subSlug: string) => {
    setCollapsedSubs((prev) => ({ ...prev, [subSlug]: !prev[subSlug] }));
  };

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block">
      <div
        className="sticky top-24 border overflow-hidden"
        style={{ background: '#130217', borderColor: '#4a1f38' }}
      >
        <div className="px-5 py-4 border-b" style={{ borderColor: '#4a1f38' }}>
          <h3 className="minecraftFont text-lg uppercase tracking-tight" style={{ color: '#c5629a' }}>
            Категорії
          </h3>
        </div>

        <nav className="py-2">
          {categories.map((cat) => {
            const isActive = cat.slug === activeCategorySlug;
            const entries = isActive ? getEntriesByCategory(cat.slug) : [];
            const subcategories = cat.subcategories || [];

            // Двоєдине групування: прямі записи та записи за підкатегоріями
            const directEntries = entries.filter((e) => !e.subcategory);

            return (
              <div key={cat.slug}>
                {/* Головна кнопка категорії */}
                <button
                  onClick={() => navigate(`/wiki/${cat.slug}`)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all hover:bg-[#1f0d22] hover:text-white"
                  style={{
                    background: isActive ? '#1f0d22' : 'transparent',
                    color: isActive ? '#ffffff' : '#9ca3af',
                    borderLeft: isActive ? '3px solid #c5629a' : '3px solid transparent',
                  }}
                >
                  <Icon name={cat.icon} size={20} color={isActive ? '#ffffff' : '#c5629a'} />
                  <span className="minecraftFont text-sm flex-1">{cat.label}</span>
                </button>

                {/* Якщо категорія активна — показуємо підкатегорії та елементи */}
                {isActive && (
                  <div className="bg-[#0a0a12]/60 py-1">
                    {/* 1. Прямі статті категорії */}
                    {directEntries.map((entry) => {
                      const isEntryActive = entry.slug === activeSlug;
                      return (
                        <button
                          key={entry.slug}
                          onClick={() => navigate(`/wiki/${cat.slug}/${entry.slug}`)}
                          className="w-full flex items-center gap-2 pl-8 pr-4 py-1.5 text-left text-xs transition-all minecraftFont"
                          style={{
                            color: isEntryActive ? '#f390d0' : '#9ca3af',
                            background: isEntryActive ? 'rgba(197,98,154,0.12)' : 'transparent',
                          }}
                        >
                          <span className="truncate">{entry.title}</span>
                        </button>
                      );
                    })}

                    {/* 2. Блоки підкатегорій */}
                    {subcategories.map((sub) => {
                      const subEntries = entries.filter((e) => e.subcategory === sub.slug);
                      const isCollapsed = collapsedSubs[sub.slug];

                      return (
                        <div key={sub.slug} className="my-1">
                          {/* Заголовок підкатегорії */}
                          <div
                            onClick={() => toggleSub(sub.slug)}
                            className="flex items-center justify-between pl-6 pr-4 py-1.5 text-xs minecraftFont font-bold cursor-pointer hover:bg-[#1f0d22] text-[#c5629a]"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <Icon name={sub.icon || 'hn-folder'} size={14} color="#c5629a" />
                              <span className="uppercase tracking-wide">{sub.title}</span>
                            </div>
                            <span className="text-[10px] text-gray-500">
                              {isCollapsed ? '+' : '-'}
                            </span>
                          </div>

                          {/* Список елементів підкатегорії */}
                          {!isCollapsed && (
                            <div className="pl-3">
                              {subEntries.map((entry) => {
                                const isEntryActive = entry.slug === activeSlug;
                                return (
                                  <button
                                    key={entry.slug}
                                    onClick={() => navigate(`/wiki/${cat.slug}/${entry.slug}`)}
                                    className="w-full flex items-center gap-2 pl-7 pr-4 py-1.5 text-left text-[11px] transition-all minecraftFont"
                                    style={{
                                      color: isEntryActive ? '#f390d0' : '#6b7280',
                                      background: isEntryActive
                                        ? 'rgba(197,98,154,0.12)'
                                        : 'transparent',
                                    }}
                                  >
                                    <span style={{ color: '#4a1f38' }}>└─</span>
                                    <span className="truncate">{entry.title}</span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}