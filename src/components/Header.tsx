import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { searchEntries } from '../data/wikiContent';

export default function Header() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ReturnType<typeof searchEntries>>([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (q: string) => {
    setQuery(q);
    if (q.trim().length > 1) {
      setResults(searchEntries(q));
      setOpen(true);
    } else {
      setResults([]);
      setOpen(false);
    }
  };

  const goToEntry = (slug: string, category: string) => {
    navigate(`/wiki/${category}/${slug}`);
    setQuery('');
    setOpen(false);
  };

  return (
    <header className="border-b-4 sticky top-0 z-50" style={{ borderColor: '#c5629a', background: '#130217' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <Link to="/" className="text-3xl sm:text-4xl font-bold minecraftFont tracking-tighter text-white hover:opacity-90 transition-opacity">
          M4SUB <span style={{ color: '#c5629a' }}>WIKI</span>
        </Link>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <div className="flex items-center gap-2 px-3 py-2 border" style={{ borderColor: 'rgba(197,98,154,0.3)', background: 'rgba(10,10,18,0.7)' }}>
            <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#c5629a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Пошук у вікі..."
              value={query}
              onChange={e => handleSearch(e.target.value)}
              onBlur={() => setTimeout(() => setOpen(false), 200)}
              onFocus={() => query.length > 1 && setOpen(true)}
              className="bg-transparent outline-none text-sm w-full placeholder-gray-500"
              style={{ color: '#f0d4e6', fontFamily: 'Minecraft, sans-serif' }}
            />
          </div>

          {open && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-50 border border-t-0 overflow-hidden shadow-2xl" style={{ background: '#130217', borderColor: 'rgba(197,98,154,0.3)' }}>
              {results.slice(0, 6).map(r => (
                <button
                  key={r.slug}
                  onMouseDown={() => goToEntry(r.slug, r.category)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[#1f0d22]"
                >
                  <div className="w-2 h-2 -full flex-shrink-0" style={{ background: '#c5629a' }} />
                  <div>
                    <div className="text-sm text-white minecraftFont">{r.title}</div>
                    <div className="text-xs" style={{ color: '#9ca3af' }}>{r.description.slice(0, 50)}...</div>
                  </div>
                </button>
              ))}
            </div>
          )}
          {open && results.length === 0 && query.length > 1 && (
            <div className="absolute top-full left-0 right-0 z-50 border border-t-0 px-4 py-3 text-sm" style={{ background: '#130217', borderColor: 'rgba(197,98,154,0.3)', color: '#6b7280' }}>
              Нічого не знайдено
            </div>
          )}
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { to: '/wiki/items', label: 'Предмети' },
            { to: '/wiki/blocks', label: 'Блоки' },
            { to: '/wiki/entities', label: 'Моби' },
          ].map(l => (
            <Link
              key={l.label}
              to={l.to}
              className="px-3 py-1.5 text-sm transition-colors minecraftFont"
              style={{ color: '#d1d5db' }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
