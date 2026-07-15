import Header from './Header';
import { ReactNode } from 'react';

interface WikiLayoutProps {
  children: ReactNode;
}

export default function WikiLayout({ children }: WikiLayoutProps) {
  return (
    <div className="min-h-screen" style={{ background: '#0a0a12', color: '#f0d4e6' }}>
      <Header />
      <main>{children}</main>
    </div>
  );
}
