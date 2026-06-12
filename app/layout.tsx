import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WorldExplorer — Dunyo Davlatlari Platformasi',
  description: 'Butun dunyo bo\'yicha 250+ davlat haqida ma\'lumot: aholi, poytaxt, tillar, valyutalar va ko\'proq.',
  keywords: 'dunyo davlatlari, jahon xaritasi, mamlakatlar, davlatlar, aholi',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-900 dark:text-white transition-colors duration-300`}>
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-700/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-lg shadow-md group-hover:scale-105 transition-transform">
                  🌍
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white text-lg leading-none block">WorldExplorer</span>
                  <span className="text-xs text-slate-400 leading-none">250+ davlat</span>
                </div>
              </Link>

              {/* Nav */}
              <nav className="flex items-center gap-1">
                <Link
                  href="/"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  🏠 Bosh sahifa
                </Link>
                <Link
                  href="/favorites"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  ❤️ Sevimlilar
                </Link>
                <ThemeToggle />
              </nav>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </main>

        {/* Footer */}
        <footer className="mt-16 border-t border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm">
                  🌍
                </div>
                <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">WorldExplorer</span>
              </div>
              <p className="text-slate-400 dark:text-slate-500 text-sm text-center">
                <a href="https://restcountries.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors">REST Countries API</a>
                {' '}&bull;{' '}
                Next.js 15 bilan qurilgan
                {' '}&bull;{' '}
                © 2025 WorldExplorer
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
