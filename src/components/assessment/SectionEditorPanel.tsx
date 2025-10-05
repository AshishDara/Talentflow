import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import type {
  AssessmentSection,
  AssessmentQuestion,
  QuestionType,
} from "../../lib/db";
import { Trash2 } from 'lucide-react';

type Props = {
  sections: AssessmentSection[];
  selectedSection: string | null;
  QUESTION_TYPES: { value: string; label: string }[];
  updateQuestion: (
    sectionId: string,
    questionId: string,
    updates: Partial<AssessmentQuestion>
  ) => void;
  removeQuestion: (sectionId: string, questionId: string) => void;
};

export default function SectionEditorPanel({
  sections,
  selectedSection,
  QUESTION_TYPES,
  updateQuestion,
  removeQuestion,
}: Props) {
  const section = sections.find((s) => s.id === selectedSection);

  if (!section) return null;

  return (
    <Card>
      <CardHeader>
        <h3 className="font-medium text-foreground">Editing '{section.title}'</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        {section.questions.map((q) => (
          <div key={q.id} className="rounded-lg border border-border p-4 bg-background/50">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <Input
                value={q.title}
                onChange={(e) =>
                  updateQuestion(section.id!, q.id, {
                    title: e.target.value,
                  })
                }
                placeholder="Question title"
              />
              <Select
                value={q.type}
                onChange={(e) =>
                  updateQuestion(section.id!, q.id, {
                    type: e.target.value as QuestionType,
                  })
                }
              >
                {QUESTION_TYPES.map((qt) => (
                  <option key={qt.value} value={qt.value}>
                    {qt.label}
                  </option>
                ))}
              </Select>
            </div>

            <div className="mt-4 border-t border-border pt-4 space-y-4">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={!!q.required}
                  onChange={(e) =>
                    updateQuestion(section.id!, q.id, {
                      required: e.target.checked,
                    })
                  }
                  className="rounded border-gray-300 text-accent focus:ring-accent"
                />
                Required Question
              </label>

              {q.type === "numeric" && (
                <div className="flex items-center gap-2">
                   <Input
                    type="number"
                    placeholder="Min"
                    value={q.min ?? ''}
                    onChange={(e) =>
                      updateQuestion(section.id!, q.id, {
                        min: e.target.value === '' ? undefined : Number(e.target.value),
                      })
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={q.max ?? ''}
                    onChange={(e) =>
                      updateQuestion(section.id!, q.id, {
                        max: e.target.value === '' ? undefined : Number(e.target.value),
                      })
                    }
                  />
                </div>
              )}

              {(q.type === "short_text" || q.type === "long_text") && (
                <Input
                  type="number"
                  placeholder="Max length"
                  value={q.maxLength ?? ''}
                  onChange={(e) =>
                    updateQuestion(section.id!, q.id, {
                      maxLength: e.target.value === '' ? undefined : Number(e.target.value),
                    })
                  }
                />
              )}
            </div>

            {(q.type === "single_choice" || q.type === "multi_choice") && (
              <div className="mt-4 border-t border-border pt-4">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add an option..."
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const input = e.target as HTMLInputElement;
                          const value = input.value.trim();
                          if (value) {
                            const currentOptions = q.options || [];
                            updateQuestion(section.id!, q.id, {
                              options: [...currentOptions, value],
                            });
                            input.value = "";
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={(e) => {
                        const input = (e.target as HTMLElement).parentElement?.querySelector("input") as HTMLInputElement;
                        const value = input?.value.trim();
                        if (value) {
                          const currentOptions = q.options || [];
                          updateQuestion(section.id!, q.id, { options: [...currentOptions, value] });
                          input.value = "";
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>

                  <div className="space-y-1 pt-2">
                    {(q.options || []).map((option, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-gray-100 rounded px-2 py-1">
                        <span className="text-sm text-foreground">{option}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const currentOptions = q.options || [];
                            updateQuestion(section.id!, q.id, {
                              options: currentOptions.filter((_, i) => i !== idx),
                            });
                          }}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-4 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:bg-red-100 hover:text-red-700"
                onClick={() => removeQuestion(section.id!, q.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove Question
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}