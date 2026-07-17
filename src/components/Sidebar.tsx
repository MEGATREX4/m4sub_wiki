import React, { useState, useEffect } from 'react';
import { categories, getEntriesByCategory } from '../lib/wikiContent';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon';

interface SidebarProps {
  activeCategorySlug?: string;
  activeSlug?: string;
}

export default function Sidebar({ activeCategorySlug, activeSlug }: SidebarProps) {
  const navigate = useNavigate();
  const [collapsedSubs, setCollapsedSubs] = useState<Record<string, boolean>>({});

  // Ініціалізуємо всі підкатегорії як згорнуті, коли змінюється активна категорія
  useEffect(() => {
    if (activeCategorySlug) {
      setCollapsedSubs((prev) => {
        const newState = { ...prev };
        const activeCat = categories.find((c) => c.slug === activeCategorySlug);
        const subs = activeCat?.subcategories || [];

        subs.forEach((sub) => {
          if (newState[sub.slug] === undefined) {
            newState[sub.slug] = true; // true = згорнуто
          }
        });
        return newState;
      });
    }
  }, [activeCategorySlug]);

  const toggleSub = (subSlug: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCollapsedSubs((prev) => ({
      ...prev,
      [subSlug]: !prev[subSlug],
    }));
  };

  return (
    <aside className="w-72 flex-shrink-0 hidden lg:block">
      <div
        className="sticky top-24 border overflow-hidden"
        style={{ background: '#130217', borderColor: '#4a1f38' }}
      >
        <div className="px-6 py-5 border-b" style={{ borderColor: '#4a1f38' }}>
          <h3 className="minecraftFont text-xl uppercase tracking-tight" style={{ color: '#c5629a' }}>
            Категорії
          </h3>
        </div>

        <nav className="py-3">
          {categories.map((cat) => {
            const isActive = cat.slug === activeCategorySlug;
            const entries = isActive ? getEntriesByCategory(cat.slug) : [];
            const subcategories = cat.subcategories || [];
            const directEntries = entries.filter((e) => !e.subcategory);

            return (
              <div key={cat.slug}>
                {/* Головна категорія */}
                <button
                  onClick={() => navigate(`/wiki/${cat.slug}`)}
                  className="w-full flex items-center gap-3 px-5 py-3.5 text-left transition-all hover:bg-[#1f0d22] active:bg-[#2a0f2f] cursor-pointer group"
                  style={{
                    background: isActive ? '#1f0d22' : 'transparent',
                    color: isActive ? '#ffffff' : '#9ca3af',
                    borderLeft: isActive ? '4px solid #c5629a' : '4px solid transparent',
                  }}
                >
                  <Icon name={cat.icon} size={22} color={isActive ? '#ffffff' : '#c5629a'} />
                  <span className="minecraftFont text-[15px] flex-1 font-medium">
                    {cat.label}
                  </span>
                </button>

                {isActive && (
                  <div className="bg-[#0a0a12]/70 py-2">
                    {/* Прямі статті */}
                    {directEntries.map((entry) => {
                      const isEntryActive = entry.slug === activeSlug;
                      return (
                        <button
                          key={entry.slug}
                          onClick={() => navigate(`/wiki/${cat.slug}/${entry.slug}`)}
                          className="w-full flex items-center gap-2 pl-9 pr-5 py-2 text-left transition-all minecraftFont cursor-pointer hover:bg-[#1f0d22]/50"
                          style={{
                            color: isEntryActive ? '#f390d0' : '#a1a1aa',
                            background: isEntryActive ? 'rgba(197,98,154,0.15)' : 'transparent',
                          }}
                        >
                          <span className="truncate text-[13px]">{entry.title}</span>
                        </button>
                      );
                    })}

                    {/* Підкатегорії */}
                    {subcategories.map((sub) => {
                      const subEntries = entries.filter((e) => e.subcategory === sub.slug);
                      const isCollapsed = collapsedSubs[sub.slug] !== false;

                      return (
                        <div key={sub.slug} className="my-0.5">
                          {/* Заголовок підкатегорії */}
                          <div
                            onClick={(e) => toggleSub(sub.slug, e)}
                            className="flex items-center justify-between pl-7 pr-5 py-2.5 text-sm minecraftFont font-bold cursor-pointer hover:bg-[#1f0d22] transition-colors select-none"
                            style={{ color: '#c5629a' }}
                          >
                            <div className="flex items-center gap-2">
                              <Icon name={sub.icon || 'folder'} size={16} color="#c5629a" />
                              <span className="uppercase tracking-wider text-[13px]">
                                {sub.title}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400 font-normal">
                              {isCollapsed ? '▶' : '▼'}
                            </span>
                          </div>

                          {/* Статті підкатегорії */}
                          {!isCollapsed && (
                            <div className="pl-4">
                              {subEntries.map((entry) => {
                                const isEntryActive = entry.slug === activeSlug;
                                return (
                                  <button
                                    key={entry.slug}
                                    onClick={(e) => {
                                      e.stopPropagation(); // ← Важливо!
                                      navigate(`/wiki/${cat.slug}/${entry.slug}`);
                                    }}
                                    className="w-full flex items-center gap-2 pl-8 pr-5 py-2 text-left transition-all minecraftFont cursor-pointer hover:bg-[#1f0d22]/50"
                                    style={{
                                      color: isEntryActive ? '#f390d0' : '#8f8f9e',
                                      background: isEntryActive
                                        ? 'rgba(197,98,154,0.12)'
                                        : 'transparent',
                                    }}
                                  >
                                    <span className="text-[#4a1f38] text-base leading-none mt-px">└</span>
                                    <span className="truncate text-[13px]">{entry.title}</span>
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