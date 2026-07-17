import React, { useState, useEffect } from 'react';
import { categories, getEntriesByCategory } from '../lib/wikiContent';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon';

interface MobileSidebarProps {
  activeCategorySlug?: string;
  activeSlug?: string;
}

export default function MobileSidebar({ activeCategorySlug, activeSlug }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);
  const [collapsedSubs, setCollapsedSubs] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  // Ініціалізація стану підкатегорій
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

  const go = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const toggleSub = (subSlug: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCollapsedSubs((prev) => ({
      ...prev,
      [subSlug]: !prev[subSlug],
    }));
  };

  return (
    <div className="lg:hidden mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 minecraftFont text-base cursor-pointer border"
        style={{ 
          background: '#130217', 
          borderColor: '#4a1f38', 
          color: '#c5629a' 
        }}
      >
        <span className="flex items-center gap-2">
          <i className="hn hn-book"></i>
          Категорії
        </span>
        <i className={`hn ${open ? 'hn-chevron-up' : 'hn-chevron-down'}`}></i>
      </button>

      {open && (
        <div
          className="border border-t-0"
          style={{ background: '#130217', borderColor: '#4a1f38' }}
        >
          {categories.map((cat) => {
            const isActive = cat.slug === activeCategorySlug;
            const entries = isActive ? getEntriesByCategory(cat.slug) : [];
            const subcategories = cat.subcategories || [];
            const directEntries = entries.filter((e) => !e.subcategory);

            return (
              <div key={cat.slug} className="border-b border-[#2a0f2f] last:border-b-0">
                {/* Головна категорія */}
                <button
                  onClick={() => go(`/wiki/${cat.slug}`)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left transition-all cursor-pointer"
                  style={{
                    background: isActive ? '#1f0d22' : 'transparent',
                    color: isActive ? '#ffffff' : '#9ca3af',
                    borderLeft: isActive ? '4px solid #c5629a' : '4px solid transparent',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Icon 
                      name={cat.icon} 
                      size={22} 
                      color={isActive ? '#ffffff' : '#c5629a'} 
                    />
                    <span className="minecraftFont text-[15px] font-medium">{cat.label}</span>
                  </div>
                </button>

                {/* Вміст активної категорії */}
                {isActive && (
                  <div className="bg-[#0a0a12]/80 py-2">
                    {/* Прямі статті категорії */}
                    {directEntries.map((entry) => {
                      const isEntryActive = entry.slug === activeSlug;
                      return (
                        <button
                          key={entry.slug}
                          onClick={() => go(`/wiki/${cat.slug}/${entry.slug}`)}
                          className="w-full flex items-center gap-2 px-8 py-2.5 text-left transition-all cursor-pointer"
                          style={{
                            color: isEntryActive ? '#f390d0' : '#a1a1aa',
                            background: isEntryActive ? 'rgba(197,98,154,0.15)' : 'transparent',
                          }}
                        >
                          <span className="truncate text-[14px]">{entry.title}</span>
                        </button>
                      );
                    })}

                    {/* Підкатегорії */}
                    {subcategories.map((sub) => {
                      const subEntries = entries.filter((e) => e.subcategory === sub.slug);
                      const isCollapsed = collapsedSubs[sub.slug] !== false;

                      return (
                        <div key={sub.slug}>
                          {/* Заголовок підкатегорії */}
                          <div
                            onClick={(e) => toggleSub(sub.slug, e)}
                            className="flex items-center justify-between px-6 py-3 text-sm minecraftFont font-bold cursor-pointer hover:bg-[#1f0d22] transition-colors"
                            style={{ color: '#c5629a' }}
                          >
                            <div className="flex items-center gap-2">
                              <Icon name={sub.icon || 'folder'} size={16} color="#c5629a" />
                              <span className="uppercase tracking-wider text-[13px]">
                                {sub.title}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400">
                              {isCollapsed ? '▶' : '▼'}
                            </span>
                          </div>

                          {/* Статті підкатегорії */}
                          {!isCollapsed && (
                            <div className="pl-4 pb-2">
                              {subEntries.map((entry) => {
                                const isEntryActive = entry.slug === activeSlug;
                                return (
                                  <button
                                    key={entry.slug}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      go(`/wiki/${cat.slug}/${entry.slug}`);
                                    }}
                                    className="w-full flex items-center gap-2 pl-8 pr-5 py-2.5 text-left transition-all cursor-pointer"
                                    style={{
                                      color: isEntryActive ? '#f390d0' : '#8f8f9e',
                                      background: isEntryActive
                                        ? 'rgba(197,98,154,0.12)'
                                        : 'transparent',
                                    }}
                                  >
                                    <span className="text-[#4a1f38] text-lg leading-none mt-px">└</span>
                                    <span className="truncate text-[14px]">{entry.title}</span>
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
        </div>
      )}
    </div>
  );
}