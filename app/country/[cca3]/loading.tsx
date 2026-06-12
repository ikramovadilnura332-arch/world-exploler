export default function CountryLoading() {
  return (
    <div className="max-w-5xl mx-auto animate-pulse">
      <div className="w-24 h-10 bg-slate-200 dark:bg-slate-700 rounded-xl mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="aspect-[3/2] rounded-2xl bg-slate-200 dark:bg-slate-700" />
        <div className="space-y-4">
          <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-xl w-3/4" />
          <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/2" />
          <div className="grid grid-cols-2 gap-3 mt-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-16 bg-slate-100 dark:bg-slate-800 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
