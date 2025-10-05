import Modal from "../ui/Modal";
import Input from "../ui/Input";
import TagGroupPicker from "./TagPicker";
import Button from "../ui/Button";

type Props = {
  open: boolean;
  onClose: () => void;
  editingJobId: number | null;
  titleValue: string;
  setTitleValue: (v: string) => void;
  slugValue: string;
  setSlugValue: (v: string) => void;
  tagsInput: string;
  setTagsInput: (v: string) => void;
  onSubmit: () => Promise<void> | void;
  formError?: string | null;
  onDeleteClick?: () => void;
  tagGroups: Record<string, string[]>;
};

export default function JobFormModal({
  open,
  onClose,
  editingJobId,
  titleValue,
  setTitleValue,
  slugValue,
  setSlugValue,
  tagsInput,
  setTagsInput,
  onSubmit,
  formError,
  onDeleteClick,
  tagGroups,
}: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editingJobId == null ? "Create Job" : "Edit Job"}
    >
      <div className="flex flex-col gap-4">
        <label className="text-sm font-medium text-gray-600">
          Title
          <Input
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            className="mt-1"
          />
        </label>

        <label className="text-sm font-medium text-gray-600">
          Slug
          <Input
            value={slugValue}
            onChange={(e) => setSlugValue(e.target.value)}
            className="mt-1"
          />
        </label>

        <div>
          <div className="text-sm font-medium text-gray-600 mb-2">Tags</div>
          <TagGroupPicker
            groups={tagGroups}
            selected={tagsInput
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)}
            onChange={(tags) => setTagsInput(tags.join(", "))}
          />
        </div>

        {formError && <p className="text-sm text-rose-500">{formError}</p>}

        <div className="mt-4 flex justify-between items-center gap-3">
          {editingJobId != null && onDeleteClick && (
            <Button
              variant="danger"
              onClick={onDeleteClick}
            >
              Delete Job
            </Button>
          )}

          <div className="ml-auto flex gap-3">
            <Button
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              variant="primary"
              onClick={onSubmit}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}