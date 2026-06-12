import { getAllCountries } from '@/lib/api';
import CountriesClient from '@/components/CountriesClient';

export default async function HomePage() {
  const countries = await getAllCountries();

  // 1. Umumiy aholini xavfsiz hisoblash (Milliardlarda)
  const totalPopulationNum = countries.reduce((sum, country) => {
    const pop = Number(country?.population) || 0;
    return sum + (isNaN(pop) ? 0 : pop);
  }, 0);
  
  const totalPopulationFormatted = totalPopulationNum > 0 
    ? `${(totalPopulationNum / 1_000_000_000).toFixed(1)}B` 
    : '7.9B'; // Agar kutilmaganda 0 chiqsa, standart dunyo aholisi zaxirasi

  // 2. Regionlarni xavfsiz hisoblash (Bo'sh bo'lmaganlarini saralash)
  const uniqueRegions = Array.from(
    new Set(
      countries
        .map((c) => c?.region)
        .filter((r) => r && typeof r === 'string' && r.trim() !== '' && r !== 'Boshqa')
    )
  );
  const totalRegions = uniqueRegions.length > 0 ? uniqueRegions.length : 5;

  // 3. Tillarni xavfsiz hisoblash (Obyekt kalitlari yoki qiymatlarini yig'ish)
  const uniqueLanguages = new Set<string>();
  countries.forEach((c: any) => {
    if (c?.languages) {
      if (typeof c.languages === 'object' && !Array.isArray(c.languages)) {
        Object.values(c.languages).forEach((lang) => {
          if (lang && typeof lang === 'string') uniqueLanguages.add(lang);
        });
      } else if (Array.isArray(c.languages)) {
        c.languages.forEach((lang: any) => {
          if (lang && typeof lang === 'string') uniqueLanguages.add(lang);
        });
      }
    } else if (c?.language && typeof c.language === 'string') {
      uniqueLanguages.add(c.language);
    }
  });
  
  const totalLanguages = uniqueLanguages.size > 0 ? `${uniqueLanguages.size}+` : '150+';

  return (
    <div>
      {/* Hero header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-indigo-200 dark:to-indigo-800" />
          <span className="text-xs font-medium text-indigo-500 uppercase tracking-widest">Ma&apos;lumotlar Platformasi</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-indigo-200 dark:to-indigo-800" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-3 text-center">
          🌍 Dunyo Davlatlari
        </h1>
        <p className="text-center text-slate-500 dark:text-slate-400 text-lg">
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">{countries.length}</span> ta davlat haqida to&apos;liq ma&apos;lumot
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { icon: '🏳️', label: 'Davlatlar', value: countries.length },
          { icon: '🌍', label: 'Regionlar', value: totalRegions },
          { icon: '👥', label: 'Umumiy aholi', value: totalPopulationFormatted },
          { icon: '🗣️', label: 'Tillar', value: totalLanguages },
        ].map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4 text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
            <div className="text-xs text-slate-400 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      <CountriesClient countries={countries} />
    </div>
  );
}