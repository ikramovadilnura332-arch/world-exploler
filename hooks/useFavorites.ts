'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'worldexplorer-favorites';

interface UseFavoritesReturn {
  favorites: string[];
  toggleFavorite: (cca3: string) => void;
  isFavorite: (cca3: string) => boolean;
  clearAll: () => void;
}

export function useFavorites(): UseFavoritesReturn {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      console.error('localStorage ga saqlashda xatolik');
    }
  }, [favorites]);

  const toggleFavorite = (cca3: string) => {
    setFavorites((prev) =>
      prev.includes(cca3) ? prev.filter((f) => f !== cca3) : [...prev, cca3]
    );
  };

  const isFavorite = (cca3: string) => favorites.includes(cca3);

  const clearAll = () => setFavorites([]);

  return { favorites, toggleFavorite, isFavorite, clearAll };
}
