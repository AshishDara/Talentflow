import Input from "../ui/Input";
import Select from "../ui/Select";
import TagGroupPicker from "./TagPicker";

type Filters = {
  search: string;
  status: string;
  tags: string[];
};

type Props = {
  filters: Filters;
  onSearchChange: (v: string) => void;
  onStatusChange: (v: string) => void;
  onTagsChange: (tags: string[]) => void;
  tagGroups: Record<string, string[]>;
};

export default function JobsFilters({
  filters,
  onSearchChange,
  onStatusChange,
  onTagsChange,
  tagGroups,
}: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-lg bg-white p-4 border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          value={filters.search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by job title..."
          aria-label="Search title"
        />
        <Select
          value={filters.status}
          onChange={(e) => onStatusChange(e.target.value)}
          aria-label="Status filter"
        >
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </Select>
      </div>
      
      <div>
        <span className="text-sm font-medium text-gray-600">Filter by tags:</span>
        <div className="mt-2">
            <TagGroupPicker
                groups={tagGroups}
                selected={filters.tags}
                onChange={(tags: string[]) => onTagsChange(tags)}
                size="sm"
            />
        </div>
      </div>
    </div>
  );
}