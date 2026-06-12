'use client';

import { useFavorites } from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  cca3: string;
  countryName: string;
}

export default function FavoriteButton({ cca3, countryName }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(cca3);

  return (
    <button
      onClick={() => toggleFavorite(cca3)}
      aria-label={favorite ? `${countryName}ni sevimlilardan olib tashlash` : `${countryName}ni sevimlilariga qo'shish`}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
        favorite
          ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/30'
          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-rose-300 hover:text-rose-500'
      }`}
    >
      <span className={`text-lg transition-transform duration-200 ${favorite ? 'scale-110' : ''}`}>
        {favorite ? '❤️' : '🤍'}
      </span>
      <span>{favorite ? 'Sevimlilardan olib tashlash' : 'Sevimlilariga qo\'shish'}</span>
    </button>
  );
}
