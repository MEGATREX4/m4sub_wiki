import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MobileSidebar from '../components/MobileSidebar';
import BorderBox from '../components/BorderBox';
import WikiInfoBox from '../components/WikiInfoBox';
import MDXContent from '../components/MDXContent';
import Footer from '../components/Footer';
import { getEntryBySlug } from '../lib/wikiContent';

export default function EntryPage() {
  const { category: categorySlug, slug } = useParams();
  const entry = slug ? getEntryBySlug(slug) : undefined;

  if (!entry) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <Sidebar activeCategorySlug={categorySlug} />
          <div className="flex-1 w-full">
            <MobileSidebar activeCategorySlug={categorySlug} />
            <div className="min-h-[50vh] flex items-center justify-center text-center">
              <div>
                <div className="minecraftFont text-8xl font-bold mb-4 text-[#4a1f38]">
                  404
                </div>
                <p className="minecraftFont text-2xl mb-6 text-[#c5629a]">
                  Запис не знайдено ({categorySlug}/{slug})
                </p>
                <Link
                  to="/"
                  className="minecraftFont text-sm px-6 py-3 inline-block bg-[#c5629a] hover:bg-[#d47bb0] text-white transition-colors"
                >
                  ← Повернутись на головну
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* items-start гарантує, що Sidebar і контент не розтягують один одного по висоті */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Ліва бічна панель */}
        <Sidebar activeCategorySlug={categorySlug} />

        {/* Основна частина сторінки */}
        <div className="flex-1 min-w-0 w-full">
          <MobileSidebar activeCategorySlug={categorySlug} />

          {/* Хлібні крихти */}
          <div className="mb-4 flex items-center gap-2 text-xs minecraftFont text-gray-400 uppercase tracking-wider">
            <Link to="/" className="hover:text-[#c5629a]">Вікі</Link>
            <span>/</span>
            <Link to={`/wiki/${entry.category}`} className="hover:text-[#c5629a]">{entry.category}</Link>
            <span>/</span>
            <span className="text-[#f390d0]">{entry.title}</span>
          </div>

          {/* Компактний верхній інформаційний блок сторінки */}
          <WikiInfoBox entry={entry} />

          {/* Текст статті */}
          <BorderBox borderColor="#c5629a" innerBg="#0a0a12">
            <div className="p-6 sm:p-8">
              <MDXContent content={entry.content} />
            </div>
          </BorderBox>
        </div>
      </div>

      <Footer />
    </div>
  );
}