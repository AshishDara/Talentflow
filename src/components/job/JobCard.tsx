import { Link } from "react-router-dom";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Button from "../ui/Button";
import { GripVertical } from "lucide-react";

type Job = {
  id?: number;
  title: string;
  slug: string;
  status: "active" | "archived";
  tags: string[];
};

type Props = {
  job: Job;
  onEdit: (jobId: number) => void;
  onToggleArchive: (jobId: number, current: "active" | "archived") => void;
};

export default function JobCard({ job, onEdit, onToggleArchive }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: job.id! });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative rounded-lg border border-gray-200 bg-white shadow-sm p-4 flex items-center justify-between gap-3 transition-shadow ${
        isDragging ? "shadow-2xl" : "hover:shadow-md"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className="cursor-grab text-gray-400 hover:text-gray-700"
          aria-label="Drag handle"
          title="Drag to reorder"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={20} />
        </div>

        <div className="flex flex-col">
          <Link
            to={`/jobs/${job.id}`}
            state={{ job }}
            className="text-base font-semibold text-gray-900 hover:text-gray-700 transition-colors"
          >
            {job.title}
          </Link>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="rounded bg-gray-100 px-2 py-0.5">
              slug: {job.slug}
            </span>

            <span
              className={
                "rounded-full px-2 py-0.5 text-xs font-semibold " +
                (job.status === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-600")
              }
            >
              {job.status}
            </span>

            {job.tags.map((t) => (
              <span
                key={t}
                className="rounded-full px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onEdit(job.id!)}
        >
          Edit
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onToggleArchive(job.id!, job.status)}
        >
          {job.status === "active" ? "Archive" : "Unarchive"}
        </Button>

        <Button
          variant="secondary"
          size="sm"
          asChild
        >
          <Link to={`/jobs/${job.id}/assessment`}>Assessment</Link>
        </Button>
      </div>
    </div>
  );
}