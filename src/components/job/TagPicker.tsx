import type { PropsWithChildren } from "react";
import { clsx } from "clsx";

export interface GroupedTags {
  [groupLabel: string]: readonly string[];
}

interface TagGroupPickerProps {
  groups: GroupedTags;
  selected: string[];
  onChange: (tags: string[]) => void;
  size?: "sm" | "md";
}

export default function TagGroupPicker({
  groups,
  selected,
  onChange,
  size = "md",
}: PropsWithChildren<TagGroupPickerProps>) {
  const base =
    "inline-flex items-center rounded-full border px-3 py-1 font-medium transition-colors transform-gpu";
  const sizes = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  } as const;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-6">
        {Object.entries(groups).map(([group, tags]) => (
          <div key={group} className="flex flex-col gap-2">
            <div className="text-sm font-semibold text-gray-800">{group}</div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => {
                const isActive = selected.includes(tag as string);
                return (
                  <button
                    key={tag as string}
                    type="button"
                    onClick={() => toggle(tag as string)}
                    aria-pressed={isActive}
                    className={clsx(
                      base,
                      sizes[size],
                      isActive
                        ? "border-transparent bg-gray-900 text-white shadow-sm"
                        : "border-gray-300 bg-white text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    {tag as string}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  function toggle(tag: string) {
    if (selected.includes(tag)) {
      onChange(selected.filter((t) => t !== tag));
    } else {
      onChange([...selected, tag]);
    }
  }
}