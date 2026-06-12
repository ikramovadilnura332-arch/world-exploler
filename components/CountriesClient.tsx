'use client';

import { useState, useMemo } from 'react';
import { Country, SortOption } from '@/types';
import CountryCard from './CountryCard';
import SearchBar from './SearchBar';
import RegionFilter from './RegionFilter';
import SortDropdown from './SortDropdown';
import { useDebounce } from '@/hooks/useDebounce';

interface CountriesClientProps {
  countries: Country[];
}

export default function CountriesClient({ countries }: CountriesClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');

  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredCountries = useMemo(() => {
    let result = [...countries];

    // Region filter
    if (selectedRegion !== 'All') {
      result = result.filter((c) => c.region === selectedRegion);
    }

 // Search filter
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter((c) => {
        // Har bir qiymat mavjudligini xavfsiz tekshirib olamiz (agar bo'sh bo'lsa, xato bermaydi)
        const commonName = (c?.name?.common || '').toLowerCase();
        const officialName = (c?.name?.official || '').toLowerCase();
        
        // Poytaxt massiv ekanligini va ichi bo'sh emasligini tekshirish
        const matchesCapital = Array.isArray(c?.capital) && c.capital.some((cap) => {
          return cap && typeof cap === 'string' && cap.toLowerCase().includes(q);
        });

        return commonName.includes(q) || officialName.includes(q) || matchesCapital;
      });
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.common.localeCompare(b.name.common);
        case 'name-desc':
          return b.name.common.localeCompare(a.name.common);
        case 'population-desc':
          return b.population - a.population;
        case 'population-asc':
          return a.population - b.population;
        case 'area-desc':
          return (b.area ?? 0) - (a.area ?? 0);
        case 'area-asc':
          return (a.area ?? 0) - (b.area ?? 0);
        default:
          return 0;
      }
    });

    return result;
  }, [countries, debouncedSearch, selectedRegion, sortBy]);

  return (
    <div>
      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      {/* Region filter */}
      <div className="mb-8">
        <RegionFilter selected={selectedRegion} onChange={setSelectedRegion} />
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {filteredCountries.length === countries.length
            ? `Jami ${countries.length} ta davlat`
            : `${filteredCountries.length} ta davlat topildi`}
        </p>
        {(searchQuery || selectedRegion !== 'All') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedRegion('All');
            }}
            className="text-xs text-indigo-500 hover:text-indigo-700 font-medium transition-colors"
          >
            Filtrlarni tozalash ✕
          </button>
        )}
      </div>

      {/* Grid */}
      {filteredCountries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Davlat topilmadi</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            &ldquo;{searchQuery}&rdquo; so&apos;rovi bo&apos;yicha hech narsa topilmadi.
          </p>
        </div>
      ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {filteredCountries.map((country, index) => (
    <CountryCard key={`${country.name?.common || 'country'}-${index}`} country={country} />
  ))}
</div>
   
      )}
    </div>
  );
}
