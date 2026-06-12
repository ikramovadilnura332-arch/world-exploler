'use client';

const REGIONS = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

const REGION_ICONS: Record<string, string> = {
  All: '🌍',
  Africa: '🌍',
  Americas: '🌎',
  Asia: '🌏',
  Europe: '🏰',
  Oceania: '🏝️',
};

interface RegionFilterProps {
  selected: string;
  onChange: (region: string) => void;
}

export default function RegionFilter({ selected, onChange }: RegionFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {REGIONS.map((region) => (
        <button
          key={region}
          onClick={() => onChange(region)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
            selected === region
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 dark:shadow-indigo-900 scale-105'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400'
          }`}
        >
          <span>{REGION_ICONS[region]}</span>
          <span>{region}</span>
        </button>
      ))}
    </div>
  );
}
