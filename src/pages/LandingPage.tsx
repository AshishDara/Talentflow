import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center">
      <main className="w-full max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-gray-900">
          Talentflow
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          An integrated, local-first platform to manage your entire hiring pipeline. Track jobs, candidates, and assessments with unparalleled speed and efficiency.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/dashboard"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-gray-900 text-white font-semibold hover:bg-gray-700 transition-colors shadow-lg"
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <a
            href="https://github.com" // Replace with your actual GitHub repo link
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </main>
    </div>
  );
}