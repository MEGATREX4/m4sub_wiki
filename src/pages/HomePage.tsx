import Hero from '../components/Hero';
import { categories } from '../data/wikiContent';
import { Link } from 'react-router-dom';
import BorderBox from '../components/BorderBox';
import Footer from '../components/Footer';
import Icon from '../components/Icon';

export default function HomePage() {
  return (
    <div>
      <Hero
        title="M4SUB WIKI"
        subtitle="Ласкаво просимо до офіційної бази знань сервера M4SUB. Тут ви знайдете інформацію про всі нові предмети, босів, виміри та системи."
        label="База знань"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="minecraftFont text-3xl mb-8 text-center" style={{ color: '#c5629a' }}>КАТЕГОРІЇ</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(cat => (
            <Link key={cat.slug} to={`/wiki/${cat.slug}`}>
              <BorderBox
                borderColor={cat.color}
                className="h-full transition-transform hover:-translate-y-1"
                shine
              >
                <div className="p-6 flex flex-col items-center text-center h-full">
                  <div className="mb-4">
                    <Icon name={cat.icon} size={64} color={cat.color} />
                  </div>
                  <h3 className="minecraftFont text-xl mb-2" style={{ color: '#fff' }}>{cat.title}</h3>
                  <p className="text-sm text-gray-400">{cat.subtitle}</p>
                </div>
              </BorderBox>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
