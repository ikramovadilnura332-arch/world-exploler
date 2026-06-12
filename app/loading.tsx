import Loading from '@/components/Loading';

export default function AppLoading() {
  return (
    <div>
      <div className="mb-10 text-center">
        <div className="h-8 w-64 mx-auto bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse mb-3" />
        <div className="h-4 w-40 mx-auto bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
      </div>
      <Loading />
    </div>
  );
}
