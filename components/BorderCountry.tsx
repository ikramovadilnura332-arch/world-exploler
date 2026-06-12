import Link from 'next/link';

interface BorderCountryProps {
  code: string;
  name?: string;
}

export default function BorderCountry({ code, name }: BorderCountryProps) {
  return (
    <Link
      href={`/country/${code}`}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-150 font-medium"
    >
      {name ?? code}
    </Link>
  );
}
