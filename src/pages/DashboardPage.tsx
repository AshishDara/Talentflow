import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '@/store/features/jobs/jobsSlice';
import { fetchCandidates } from '@/store/features/candidates/candidatesSlice';
import type { RootState, AppDispatch } from '@/store/store';

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { jobs, status: jobsStatus } = useSelector((s: RootState) => s.jobs);
  const { items: candidates, loading: candidatesLoading } = useSelector((s: RootState) => s.candidates);

  useEffect(() => {
    // Fetch only the first page of jobs and candidates for summary
    dispatch(fetchJobs());
    dispatch(fetchCandidates());
  }, [dispatch]);

  const activeJobs = jobs.filter(j => j.status === 'active').length;
  const recentCandidates = candidates.slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader><h2 className="text-lg font-semibold text-foreground">Active Jobs</h2></CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-accent">{jobsStatus === 'loading' ? '...' : activeJobs}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><h2 className="text-lg font-semibold text-foreground">Total Candidates</h2></CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-accent">{candidatesLoading ? '...' : candidates.length}</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader><h2 className="text-lg font-semibold text-foreground">In Offer Stage</h2></CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-accent">{candidatesLoading ? '...' : candidates.filter(c => c.stage === 'offer').length}</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Candidates */}
      <Card>
        <CardHeader><h2 className="text-lg font-semibold text-foreground">Recent Candidates</h2></CardHeader>
        <CardContent>
          {candidatesLoading ? <p>Loading...</p> : (
            <ul className="divide-y divide-border">
              {recentCandidates.map(c => (
                <li key={c.id} className="py-2 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-foreground">{c.name}</p>
                    <p className="text-sm text-muted-foreground">{c.email}</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 bg-background rounded-full text-accent border border-accent/50">{c.stage}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}