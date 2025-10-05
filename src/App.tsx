import { Routes, Route, Outlet } from "react-router-dom";
import JobsPage from "./pages/JobsPage";
import JobDetailPage from "./pages/JobDetailPage";
import AssessmentBuilderPage from "./pages/AssessmentBuilderPage";
import CandidateProfilePage from "./pages/CandidateProfilePage";
import CandidatesKanbanPage from "./pages/CandidatesKanbanPage";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import Sidebar from "./components/ui/Sidebar";
import DashboardPage from "./pages/DashboardPage";

function AppLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<AppLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="jobs/:jobId" element={<JobDetailPage />} />
          <Route
            path="jobs/:jobId/assessment"
            element={<AssessmentBuilderPage />}
          />
          <Route
            path="jobs/:jobId/candidates"
            element={<CandidatesKanbanPage />}
          />
          <Route path="candidates" element={<CandidatesKanbanPage />} />
          <Route path="candidates/:id" element={<CandidateProfilePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;