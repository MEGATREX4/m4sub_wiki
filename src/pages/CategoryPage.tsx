import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategoryBySlug, getEntriesByCategory } from '../lib/wikiContent';
import Sidebar from '../components/Sidebar';
import MobileSidebar from '../components/MobileSidebar';
import BorderBox from '../components/BorderBox';
import Footer from '../components/Footer';
import Icon from '../components/Icon';

export default function CategoryPage() {
  const { category: categorySlug } = useParams();
  const category = getCategoryBySlug(categorySlug || '');
  const entries = getEntriesByCategory(categorySlug || '');

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center py-16">
          <h1 className="minecraftFont text-4xl text-[#c5629a] mb-4">
            Категорію не знайдено
          </h1>
          <Link to="/" className="minecraftFont text-sm px-6 py-3 bg-[#c5629a] text-white">
            ← Повернутись на головну
          </Link>
        </div>
      </div>
    );
  }

  const subcategories = category.subcategories || [];
  const directEntries = entries.filter((e) => !e.subcategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <Sidebar activeCategorySlug={categorySlug} />

        <div className="flex-1 min-w-0 w-full">
          <MobileSidebar activeCategorySlug={categorySlug} />

          {/* Заголовок категорії */}
          <div className="mb-8 border-b-2 pb-6 border-[#4a1f38]">
            <div className="flex items-center gap-4 mb-2">
              <Icon name={category.icon} size={40} color={category.color} />
              <h1
                className="minecraftFont text-3xl sm:text-4xl uppercase tracking-tight"
                style={{ color: category.color }}
              >
                {category.title}
              </h1>
            </div>
            <p className="text-gray-400 text-sm uppercase tracking-wide">
              {category.subtitle}
            </p>
          </div>

          {/* 1. Прямі статті без підкатегорії */}
          {directEntries.length > 0 && (
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {directEntries.map((entry) => (
                  <Link key={entry.slug} to={`/wiki/${categorySlug}/${entry.slug}`}>
                    <BorderBox
                      borderColor="rgba(197,98,154,0.3)"
                      innerBg="#130217"
                      className="h-full transition-transform hover:-translate-y-1"
                    >
                      <div className="p-4 flex gap-4 items-center h-full">
                        {(entry.icon || entry.image) && (
                          <div className="w-12 h-12 flex-shrink-0 bg-[#0a0a12] flex items-center justify-center border-2 border-[#4a1f38]">
                            <Icon name={entry.icon || entry.image || ''} size={32} />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="minecraftFont text-lg text-[#f390d0] truncate">
                            {entry.title}
                          </h3>
                          <p className="text-xs text-gray-400 line-clamp-1">
                            {entry.description}
                          </p>
                        </div>
                      </div>
                    </BorderBox>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 2. Блоки статей розгруповані за підкатегоріями (наприклад, Trinkets) */}
          {subcategories.map((sub) => {
            const subEntries = entries.filter((e) => e.subcategory === sub.slug);
            if (subEntries.length === 0) return null;

            return (
              <div key={sub.slug} className="mb-10">
                <div className="flex items-center gap-3 mb-4 pb-2 border-b border-[#4a1f38]">
                  <Icon name={sub.icon || 'hn-folder'} size={24} color="#c5629a" />
                  <h2 className="minecraftFont text-2xl text-[#f390d0] uppercase tracking-wide">
                    {sub.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subEntries.map((entry) => (
                    <Link key={entry.slug} to={`/wiki/${categorySlug}/${entry.slug}`}>
                      <BorderBox
                        borderColor="rgba(197,98,154,0.3)"
                        innerBg="#130217"
                        className="h-full transition-transform hover:-translate-y-1"
                      >
                        <div className="p-4 flex gap-4 items-center h-full">
                          {(entry.icon || entry.image) && (
                            <div className="w-12 h-12 flex-shrink-0 bg-[#0a0a12] flex items-center justify-center border-2 border-[#4a1f38]">
                              <Icon name={entry.icon || entry.image || ''} size={32} />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="minecraftFont text-lg font-bold text-[#f390d0] truncate">
                                {entry.title}
                              </h3>
                              {entry.rarity && (
                                <span className="text-[9px] minecraftFont uppercase px-1.5 py-0.5 bg-[#0a0a12] text-[#c5629a] border border-[#4a1f38]">
                                  {entry.rarity}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-400 line-clamp-2">
                              {entry.description}
                            </p>
                          </div>
                        </div>
                      </BorderBox>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}