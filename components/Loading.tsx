export default function Loading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 overflow-hidden animate-pulse">
          <div className="h-44 bg-slate-200 dark:bg-slate-700" />
          <div className="p-5 space-y-3">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4" />
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/2" />
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-lg w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
