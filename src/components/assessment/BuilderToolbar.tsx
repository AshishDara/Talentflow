import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "../ui/Button";

export default function Header({
  title,
  viewMode,
  setViewMode,
  onSave,
  className = "",
}: {
  title: string;
  viewMode: "builder" | "preview";
  setViewMode: (mode: "builder" | "preview") => void;
  onSave: () => void;
  className?: string;
}) {
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col md:flex-row md:items-center justify-between gap-3 ${className}`}
    >
      <div className="flex w-full md:w-auto items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="inline-flex items-center justify-center rounded-md p-2 bg-white border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900"
        >
          <ArrowLeft className="h-5 w-5 text-gray-800" />
        </button>

        <h2 className="truncate text-lg md:text-2xl font-semibold text-foreground">
          {title}
        </h2>
      </div>

      <div className="flex w-full md:w-auto items-center justify-end gap-3">
        <div className="flex rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => setViewMode("builder")}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              viewMode === "builder"
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Builder
          </button>

          <button
            onClick={() => setViewMode("preview")}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              viewMode === "preview"
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Preview
          </button>
        </div>

        <div className="w-full sm:w-auto md:w-auto">
          <Button onClick={onSave} className="w-full sm:w-auto md:inline-flex">
            Save Assessment
          </Button>
        </div>
      </div>
    </div>
  );
}