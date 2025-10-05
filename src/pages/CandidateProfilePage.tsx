import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  addTimelineNote,
  fetchTimeline,
  fetchCandidateById,
} from "../store/features/candidates/candidatesSlice";
import Button from "@/components/ui/Button";

// A simple Textarea component for consistency, defined locally to avoid import errors.
function CustomTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { ref?: React.Ref<HTMLTextAreaElement> }) {
  return (
    <textarea
      {...props}
      className="w-full h-32 p-3 rounded-md bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900/50 focus:border-gray-900"
    />
  );
}


const EMPTY_EVENTS: any[] = [];

export default function CandidateProfilePage() {
  const params = useParams();
  const navigate = useNavigate();
  const id = Number(params.id);
  const dispatch = useDispatch<any>();
  const candidate = useSelector((s: any) =>
    s.candidates.items.find((c: any) => c.id === id)
  );
  const events = useSelector(
    (s: any) => s.candidates.timelineById[id] ?? EMPTY_EVENTS
  );
  
  const INTERVIEWERS: string[] = [
    "Abhishek", "Farhan", "Rituraj", "Sweta", "Pandey",
  ];
  const [note, setNote] = useState("");
  const [mentionQuery, setMentionQuery] = useState<string>("");
  const [showMentions, setShowMentions] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const mentionSuggestions = ((): string[] => {
    if (!mentionQuery) return INTERVIEWERS.slice(0, 5);
    const q = mentionQuery.toLowerCase();
    return INTERVIEWERS.filter((name) => name.toLowerCase().includes(q)).slice(
      0,
      5
    );
  })();

  useEffect(() => {
    if (!candidate) {
      dispatch(fetchCandidateById(id));
    }
    dispatch(fetchTimeline(id));
  }, [id, dispatch, candidate]);

  const submitNote = async () => {
    if (!note.trim()) return;
    await dispatch(addTimelineNote({ candidateId: id, text: note.trim() }));
    setNote("");
  };

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setNote(value);
    const cursor = e.target.selectionStart || value.length;
    const uptoCursor = value.slice(0, cursor);
    const match = uptoCursor.match(/(^|\s)@([\w\- ]*)$/);
    if (match) {
      setMentionQuery(match[2] || "");
      setShowMentions(true);
    } else {
      setMentionQuery("");
      setShowMentions(false);
    }
  }

  function insertMention(name: string) {
    const el = textareaRef.current;
    if (!el) return;
    const value = note;
    const cursor = el.selectionStart || value.length;
    const uptoCursor = value.slice(0, cursor);
    const afterCursor = value.slice(cursor);
    const match = uptoCursor.match(/(^|\s)@([\w\- ]*)$/);
    if (!match) return;
    const start = (match.index ?? uptoCursor.length - 1) + match[1].length;
    const newBefore = uptoCursor.slice(0, start) + "@" + name + " ";
    const next = newBefore + afterCursor;
    setNote(next);
    setShowMentions(false);
    setMentionQuery("");
    const newPos = newBefore.length;
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(newPos, newPos);
    });
  }

  function goBack() {
    navigate(-1);
  }

  if (!candidate) return <div className="p-6">Loading candidate profile...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={goBack}
          aria-label="Go back"
          className="inline-flex items-center justify-center rounded-md p-2 bg-white border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900"
        >
          <ArrowLeft className="h-5 w-5 text-gray-800" />
        </button>

        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{candidate.name}</h1>
          <p className="text-sm text-gray-500">{candidate.email}</p>
        </div>
      </div>
      <div>
        <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium capitalize">
          {candidate.stage}
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Timeline</h2>
           {events.length === 0 ? (
              <div className="text-gray-500 border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">No timeline events yet.</div>
            ) : (
              [...events].reverse().map((e: any) => (
                <div key={e.id} className="p-4 rounded-lg border border-gray-200 bg-white">
                  <div className="text-sm text-gray-500 capitalize">
                    {new Date(e.timestamp).toLocaleString()} • {e.type.replace('_', ' ')}
                  </div>
                  {e.type === "note" ? (
                    <p className="mt-1 text-gray-700">{String((e.payload || {}).text || "")}</p>
                  ) : e.type === "stage_change" ? (
                    <p className="mt-1 text-gray-700">
                      Moved from <span className="font-semibold capitalize">{String((e.payload || {}).from)}</span> to <span className="font-semibold capitalize">{String((e.payload || {}).to)}</span>
                    </p>
                  ) : null}
                </div>
              ))
            )}
        </div>
        
        <div className="space-y-4">
           <h2 className="text-xl font-semibold text-gray-900">Add a Note</h2>
          <div className="relative">
            <CustomTextarea
              ref={textareaRef}
              value={note}
              onChange={handleTextChange}
              onBlur={() => setTimeout(() => setShowMentions(false), 200)}
              placeholder="Add a note... Use @ to mention a colleague."
            />
            {showMentions && mentionSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 z-10 mt-1 rounded-md border border-gray-200 bg-white shadow-lg">
                {mentionSuggestions.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => insertMention(name)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >
                    @{name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={submitNote}
              variant="primary"
            >
              Add Note
            </Button>
            {candidate.jobId && (
              <Button asChild variant="secondary">
                <Link to={`/jobs/${candidate.jobId}/assessment`}>
                  Assessment
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}