import { useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  fetchCandidates,
  setSearch,
  setJobFilter,
  setPage,
  setPageSize,
  updateCandidate,
  type CandidateStage,
} from "../store/features/candidates/candidatesSlice";
import CandidatesVirtualList from "../components/candidates/CandidatesVirtualList";
import PaginationControls from "@/components/ui/PaginationControls";
import { fetchJobs } from "@/store/features/jobs/jobsSlice";

const STAGES: CandidateStage[] = [
  "applied",
  "screen",
  "tech",
  "offer",
  "hired",
  "rejected",
];

export default function CandidatesKanbanPage() {
  const dispatch = useDispatch<any>();
  const { items, filters, pagination } = useSelector(
    (s: any) => s.candidates,
    shallowEqual
  );
  const jobs = useSelector((s: any) => s.jobs.jobs, shallowEqual);
  const [localSearch, setLocalSearch] = useState(filters.search);
  const { jobId } = useParams();

  useEffect(() => {
    const t = setTimeout(() => {
      if (localSearch !== filters.search) dispatch(setSearch(localSearch));
    }, 400);
    return () => clearTimeout(t);
  }, [localSearch, filters.search, dispatch]);

  useEffect(() => {
    dispatch(fetchJobs());
    dispatch(fetchCandidates());
  }, [
    filters.search,
    filters.jobId,
    pagination?.page,
    pagination?.pageSize,
    dispatch,
  ]);

  useEffect(() => {
    if (!jobId) {
      dispatch(setJobFilter(undefined));
    } else {
      dispatch(setJobFilter(Number(jobId)));
      dispatch(setPage(1));
    }
  }, [jobId, dispatch]);

  const byStage = useMemo(() => {
    const map: Record<string, any[]> = Object.fromEntries(
      STAGES.map((s) => [s, []])
    );
    for (const c of items) {
      const key = (c.stage as CandidateStage) || "applied";
      if (!map[key]) map[key] = [];
      map[key].push(c);
    }
    return map;
  }, [items]);

  const jobTitleById = useMemo(() => {
    const m: Record<number, string> = {};
    for (const j of jobs) {
      if (j?.id) m[j.id] = j.title;
    }
    return m;
  }, [jobs]);

  const onDragStart = (e: React.DragEvent, id: number) => {
    e.dataTransfer.setData("text/plain", String(id));
  };
  const onDrop = async (e: React.DragEvent, stage: CandidateStage) => {
    const id = Number(e.dataTransfer.getData("text/plain"));
    if (!Number.isFinite(id)) return;
    const current = items.find((x: any) => x.id === id);
    if (!current || current.stage === stage) return;
    await dispatch(updateCandidate({ id, updates: { stage } }))
      .unwrap()
      .catch(async () => {
        await dispatch(
          updateCandidate({ id, updates: { stage: current.stage } })
        );
      });
  };

  const [showAll, setShowAll] = useState(false);

  const page = pagination?.page ?? 1;
  const pageSize = pagination?.pageSize ?? 10;
  const totalCount = pagination?.totalCount ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / (pageSize || 1)));

  function handleJobFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value;
    if (!val) {
      dispatch(setJobFilter(undefined));
    } else {
      dispatch(setJobFilter(Number(val)));
    }
    dispatch(setPage(1));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-2xl font-semibold text-foreground">
          {(() => {
            if (!jobId) return "Candidates";
            const n = Number(jobId);
            const job = Number.isFinite(n)
              ? jobs.find((j: any) => j.id === n)
              : undefined;
            return job ? `Candidates – ${job.title}` : "Candidates";
          })()}
        </h1>
        <div className="w-full">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <div className="w-full md:w-auto flex-1">
              <input
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search candidates..."
                className="w-full px-3 py-2 rounded-md bg-card text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div className="flex w-full md:w-auto gap-2 md:items-center md:justify-end flex-col sm:flex-row">
              <select
                value={filters.jobId ?? ""}
                onChange={handleJobFilterChange}
                className="w-full sm:w-auto px-3 py-2 rounded-md bg-card text-foreground border border-border focus:outline-none"
                aria-label="Filter by job"
              >
                <option value="">All jobs</option>
                {jobs.map((j: any) => (
                  <option key={j.id} value={j.id}>
                    {j.title}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowAll((v) => !v)}
                className="w-full sm:w-auto px-3 py-2 rounded-md bg-card text-foreground border border-border hover:bg-gray-100"
                aria-pressed={showAll}
              >
                {showAll ? "Show Kanban" : "Show All"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAll ? (
        <CandidatesVirtualList />
      ) : (
        <>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {STAGES.map((stage) => (
              <div
                key={stage}
                className="rounded-lg bg-gray-100 border border-gray-200"
              >
                <div className="px-3 py-2 border-b border-gray-200 text-foreground font-medium capitalize">
                  {stage}
                </div>
                <div
                  className="min-h-[200px] max-h-[60vh] overflow-auto p-2 space-y-2"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => onDrop(e, stage)}
                >
                  {byStage[stage].length === 0 ? (
                    <div className="text-muted-foreground text-sm px-2 py-3">
                      No candidates
                    </div>
                  ) : (
                    byStage[stage].map((c: any) => (
                      <div
                        key={c.id}
                        draggable
                        onDragStart={(e) => onDragStart(e, c.id)}
                        className="p-3 rounded-md bg-card border border-border cursor-grab active:cursor-grabbing shadow-sm"
                      >
                        <div className="font-medium text-foreground">{c.name}</div>
                        <div
                          className="text-muted-foreground text-xs truncate max-w-[180px]"
                          title={c.email}
                        >
                          {c.email}
                        </div>
                        {c.jobId ? (
                          <div className="mt-1 text-xs text-muted-foreground">
                            Job:{" "}
                            <span className="text-accent font-medium">
                              {jobTitleById[c.jobId] || `#${c.jobId}`}
                            </span>
                          </div>
                        ) : null}
                        <Link
                          to={`/candidates/${c.id}`}
                          className="text-xs text-accent font-semibold"
                        >
                          Open profile
                        </Link>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <PaginationControls
              page={page}
              totalPages={totalPages}
              pageSize={pageSize}
              totalCount={totalCount}
              onPrev={() => dispatch(setPage(Math.max(1, page - 1)))}
              onNext={() => dispatch(setPage(Math.min(totalPages, page + 1)))}
              onPageSizeChange={(n: number) => {
                dispatch(setPageSize(n));
                dispatch(setPage(1));
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}