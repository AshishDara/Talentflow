import Button from "../ui/Button";
import { Plus } from "lucide-react";

type Props = {
  onCreate: () => void;
  title?: string;
};

export default function JobsHeader({ onCreate, title = "Jobs" }: Props) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-white">{title}</h1>
      <Button className="shadow-md shadow-blue-900/40" onClick={onCreate}>
        <Plus className="mr-2 h-4 w-4" />
        New Job
      </Button>
    </div>
  );
}