'use client'; // localStorage va window xizmatlari uchun klient komponent qilamiz

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Country } from '@/types';
import { formatPopulation } from '@/utils/formatters';

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Agarda country obyektining o'zi kelmay qolsa, sahifa oq bo'lib qolmasligi uchun
  if (!country) return null;

  const capital = country?.capital?.[0] ?? 'N/A';

  // Sahifa yuklanganda ushbu davlat sevimlilar ro'yxatida bor-yo'qligini tekshiramiz
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favorites');
      const favorites = saved ? JSON.parse(saved) : [];
      setIsFavorite(favorites.some((fav: any) => fav.cca3 === country.cca3));
    }
  }, [country.cca3]);

  // Sevimlilarga qo'shish yoki o'chirish funksiyasi
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Link bosilib ketib, boshqa sahifaga o'tib ketishini oldini oladi
    
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favorites');
      let favorites = saved ? JSON.parse(saved) : [];

      if (isFavorite) {
        // Agar allaqachon bor bo'lsa, o'chirib tashlaymiz
        favorites = favorites.filter((fav: any) => fav.cca3 !== country.cca3);
      } else {
        // Agar yo'q bo'lsa, ro'yxatga qo'shamiz
        favorites.push(country);
      }

      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(!isFavorite);

      // 🔥 MANA SHU QATOR TEPADAGI NAVBARGA SIGNAL YUBORADI:
      window.dispatchEvent(new Event('favoritesChanged'));
    }
  };

  return (
    <Link href={`/country/${country.cca3}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
        
        {/* Flag */}
        <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-900">
          <Image
            src={country.flags?.png || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=300'}
            alt={country.flags?.alt ?? `${country.name?.common || "Davlat"} bayrog'i`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          
          {/* Region badge */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/30 backdrop-blur-sm text-white border border-white/20">
              {country.region || 'N/A'}
            </span>
          </div>

          {/* ❤️ SEVIMLILAR TUGMASI (YURAKCHA) */}
          <button
            onClick={toggleFavorite}
            className="absolute bottom-3 right-3 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-md hover:scale-110 transition-transform z-10"
            title={isFavorite ? "Sevimlilardan o'chirish" : "Sevimlilarga qo'shish"}
          >
            <span className={`text-lg transition-colors ${isFavorite ? 'text-rose-500' : 'text-slate-400 dark:text-slate-500'}`}>
              {isFavorite ? '❤️' : '🤍'}
            </span>
          </button>
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="font-bold text-slate-900 dark:text-white text-base mb-3 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {country.name?.common || 'N/A'}
          </h3>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="text-base">🏛️</span>
              <span className="truncate">{capital}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="text-base">👥</span>
              <span>{formatPopulation(country.population || 0)}</span>
            </div>
          </div>

          {/* Bottom gradient line on hover */}
          <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300 rounded-full" />
        </div>
      </div>
    </Link>
  );
}