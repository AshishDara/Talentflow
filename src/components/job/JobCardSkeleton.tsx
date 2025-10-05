// src/components/job/JobCardSkeleton.tsx
export default function JobCardSkeleton() {
  return (
    <div className="rounded-lg border border-slate-700 p-4 bg-slate-800 shadow-lg">
      <div className="flex animate-pulse items-start gap-4">
        <div className="mt-1 h-6 w-6 rounded bg-slate-700"></div>
        <div className="flex-1 space-y-3 py-1">
          <div className="h-4 w-3/4 rounded bg-slate-700"></div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-20 rounded-full bg-slate-700"></div>
            <div className="h-3 w-16 rounded-full bg-slate-700"></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <div className="h-8 w-20 rounded-lg bg-slate-700"></div>
            <div className="h-8 w-24 rounded-lg bg-slate-700"></div>
        </div>
      </div>
    </div>
  );
}