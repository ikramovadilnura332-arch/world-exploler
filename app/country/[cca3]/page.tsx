import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCountryByCode } from '@/lib/api';
import { formatPopulation, formatArea, formatLanguages, formatCurrencies, formatNumber } from '@/utils/formatters';
import StatCard from '@/components/StatCard';
import BorderCountry from '@/components/BorderCountry';
import FavoriteButton from '@/components/FavoriteButton';

interface Props {
  params: Promise<{ cca3: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { cca3 } = await params;
    const country = await getCountryByCode(cca3);
    return {
      title: `${country.name.common} | WorldExplorer`,
      description: `${country.name.common} haqida ma'lumot — aholi: ${formatPopulation(country.population)}, poytaxt: ${country.capital?.[0] ?? 'N/A'}, tillar: ${formatLanguages(country.languages)}`,
    };
  } catch {
    return { title: 'Davlat | WorldExplorer' };
  }
}

export default async function CountryDetailPage({ params }: Props) {
  const { cca3 } = await params;
  let country;
  try {
    country = await getCountryByCode(cca3);
  } catch {
    notFound();
  }

  const capital = country.capital?.join(', ') ?? 'N/A';
  const languages = formatLanguages(country.languages);
  const currencies = formatCurrencies(country.currencies);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all mb-8 shadow-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Orqaga
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Flag */}
        <div className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl shadow-slate-300 dark:shadow-slate-900 border border-slate-200 dark:border-slate-700">
          <Image
            src={country.flags.svg || country.flags.png}
            alt={country.flags.alt ?? `${country.name.common} bayrog'i`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Info */}
        <div>
          {/* Name & actions */}
          <div className="mb-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-1">
                  {country.flag} {country.name.common}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{country.name.official}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
                {country.region}
              </span>
              {country.subregion && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-800">
                  {country.subregion}
                </span>
              )}
              {country.independent && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800">
                  Mustaqil davlat
                </span>
              )}
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <StatCard icon="🏛️" label="Poytaxt" value={capital} />
        
<StatCard icon="👥" label="Aholi" value={formatPopulation(country.population)} />
            <StatCard icon="📐" label="Maydon" value={formatArea(country.area)} />
            <StatCard icon="🗣️" label="Tillar" value={languages} />
            <StatCard icon="💰" label="Valyuta" value={currencies} />
            <StatCard icon="🌐" label="Domen" value={country.tld?.join(', ') ?? 'N/A'} />
            {country.timezones && country.timezones.length > 0 && (
              <StatCard icon="🕐" label="Vaqt mintaqasi" value={country.timezones[0]} />
            )}
            {country.car?.side && (
              <StatCard icon="🚗" label="Haydash tomoni" value={country.car.side === 'left' ? 'Chap tomon' : 'O\'ng tomon'} />
            )}
          </div>

          {/* Favorite button */}
          <FavoriteButton cca3={country.cca3} countryName={country.name.common} />
        </div>
      </div>

      {/* Borders */}
      {country.borders && country.borders.length > 0 && (
        <div className="mt-10 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span>🗺️</span> Chegaradosh Davlatlar
            <span className="text-sm font-normal text-slate-400">({country.borders.length})</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {country.borders.map((border) => (
              <BorderCountry key={border} code={border} />
            ))}
          </div>
        </div>
      )}

      {/* Maps link */}
      {country.maps?.googleMaps && (
        <div className="mt-4">
          <a
            href={country.maps.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            Google Xaritada ko&apos;rish
          </a>
        </div>
      )}
    </div>
  );
}
