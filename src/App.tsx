import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import WikiLayout from './components/WikiLayout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import EntryPage from './pages/EntryPage';

export default function App() {
  return (
    <HashRouter>
      <WikiLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wiki/:category" element={<CategoryPage />} />
          <Route 
            path="/wiki/:category/:slug" 
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <EntryPage />
              </Suspense>
            } 
          />
          <Route path="/wiki" element={<Navigate to="/" replace />} />
          <Route path="*" element={
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="text-center">
                <div className="minecraftFont text-8xl font-bold mb-4" style={{ color: '#4a1f38' }}>404</div>
                <p className="minecraftFont text-2xl mb-6" style={{ color: '#c5629a' }}>Сторінку не знайдено</p>
                <a href="#/" className="minecraftFont text-sm px-6 py-3 inline-block" style={{ background: '#c5629a', color: '#fff' }}>
                  ← Повернутись на головну
                </a>
              </div>
            </div>
          } />
        </Routes>
      </WikiLayout>
    </HashRouter>
  );
}