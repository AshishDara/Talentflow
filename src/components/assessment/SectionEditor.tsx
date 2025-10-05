import Button from "../ui/Button";
import Input from "../ui/Input";

type QuestionType = {
  value: string;
  label: string;
};

type Props = {
  section: { id: string; title: string };
  QUESTION_TYPES: QuestionType[];
  updateSectionTitle: (id: string, title: string) => void;
  setSelectedSection: (id: string) => void;
  removeSection: (id: string) => void;
  addQuestion: (sectionId: string, type: string) => void;
};

export default function SectionEditor({
  section,
  QUESTION_TYPES,
  updateSectionTitle,
  setSelectedSection,
  removeSection,
  addQuestion,
}: Props) {
  return (
    <div key={section.id} className="rounded-lg border border-border bg-card p-3">
      <div className="mb-3 flex items-center gap-2">
        <Input
          value={section.title}
          onChange={(e) => updateSectionTitle(section.id, e.target.value)}
          placeholder="Section Title"
        />
        <Button
          variant="primary"
          size="sm"
          onClick={() => setSelectedSection(section.id)}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => removeSection(section.id)}
        >
          Remove
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="text-xs font-medium text-muted-foreground self-center mr-2">Add Question:</span>
        {QUESTION_TYPES.map((qt) => (
          <Button
            key={qt.value}
            variant="ghost"
            size="sm"
            onClick={() => addQuestion(section.id, qt.value)}
          >
            + {qt.label}
          </Button>
        ))}
      </div>
    </div>
  );
}