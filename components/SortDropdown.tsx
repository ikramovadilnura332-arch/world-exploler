'use client';

import { SortOption } from '@/types';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'name-asc', label: '🔤 Nom (A → Z)' },
  { value: 'name-desc', label: '🔤 Nom (Z → A)' },
  { value: 'population-desc', label: '👥 Aholi (ko\'pdan kamga)' },
  { value: 'population-asc', label: '👥 Aholi (kamdan ko\'pga)' },
  { value: 'area-desc', label: '📐 Maydon (kattadan kichikka)' },
  { value: 'area-asc', label: '📐 Maydon (kichikdan kattaga)' },
];

interface SortDropdownProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="appearance-none pl-4 pr-10 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm cursor-pointer transition-all hover:border-indigo-300 dark:hover:border-indigo-600"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
