'use client';

import { useState, useEffect } from 'react';
import { Country } from '@/types';
import CountryCard from '@/components/CountryCard';
import Link from 'next/link';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Country[]>([]);
  const [mounted, setMounted] = useState(false);

  // localStorage'dan ma'lumotlarni xavfsiz yuklab olish funksiyasi
  const loadFavorites = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favorites');
      const savedFavs = saved ? JSON.parse(saved) : [];
      setFavorites(savedFavs);
    }
  };

  useEffect(() => {
    setMounted(true);
    // Sahifa birinchi marta ochilganda yuklaydi
    loadFavorites();

    // Agar foydalanuvchi shu sahifada turib ham biron davlatni o'chirsa/qo'shsa, darhol yangilaydi
    window.addEventListener('favoritesChanged', loadFavorites);

    return () => {
      window.removeEventListener('favoritesChanged', loadFavorites);
    };
  }, []);

  // Hydration xatosini oldini olish uchun
  if (!mounted) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="text-slate-500 dark:text-slate-400 font-medium">Sevimlilar yuklanmoqda...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
          ❤️ Sevimli Davlatlar
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Sizga yoqqan va belgilab qo&apos;ygan davlatlaringiz ro&apos;yxati
        </p>
      </div>

      {favorites.length === 0 ? (
        // Agar ro'yxat bo'sh bo'lsa chiqadigan chiroyli blok
        <div className="flex flex-col items-center justify-center py-24 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="text-6xl mb-4 animate-bounce">🤍</div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Sevimli davlatlar yo&apos;q</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mb-6">
            Bosh sahifaga o&apos;ting va davlat kartochkasidagi ❤️ tugmasini bosib, sevimlilaringizga qo&apos;shing.
          </p>
          <Link 
            href="/" 
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl transition-colors shadow-sm"
          >
            🏠 Bosh sahifaga qaytish
          </Link>
        </div>
      ) : (
        // Agar davlatlar bo'lsa, ularni chizish
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((country, index) => (
            <CountryCard key={`${country?.cca3 || 'fav'}-${index}`} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}