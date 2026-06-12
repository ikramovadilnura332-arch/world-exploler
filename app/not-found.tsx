import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <div className="text-8xl mb-6 animate-bounce">🗺️</div>
      <h1 className="text-6xl font-extrabold text-slate-900 dark:text-white mb-3">404</h1>
      <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200 mb-4">Sahifa topilmadi</h2>
      <p className="text-slate-500 dark:text-slate-400 text-base mb-8 max-w-sm">
        Siz qidirayotgan sahifa mavjud emas yoki ko&apos;chirilgan bo&apos;lishi mumkin.
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-indigo-200 dark:shadow-indigo-900"
      >
        ← Bosh sahifaga qaytish
      </Link>
    </div>
  );
}
