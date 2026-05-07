"use client";
import { ExerciseRecord } from "@/types";
import { Plus, X } from "lucide-react";
import SetTable from "./SetTable";
import DurationInput from "./DurationInput";
import ExerciseBadge from "@/components/shared/ExerciseBadge";

interface Props {
  record: ExerciseRecord;
  onChange: (updated: ExerciseRecord) => void;
  onRemove: () => void;
}
export default function ExerciseCard({ record, onChange, onRemove }: Props) {
  const addSet = () =>
    onChange({
      ...record,
      sets: [...(record.sets ?? []), { weight: 0, reps: 0 }],
    });
  return (
    <div className="flex flex-col gap-2 rounded-lg border p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium">{record.name}</span>
          <ExerciseBadge category={record.category} muscleGroup={record.muscleGroup} />
        </div>
        <button
          onClick={onRemove}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      {record.category === "strength" ? (
        <>
          <SetTable
            sets={record.sets ?? []}
            onChange={(newSets) => onChange({ ...record, sets: newSets })}
          />
          <button
            onClick={addSet}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-muted-foreground/25 py-2 text-xs text-muted-foreground transition-colors hover:border-brand-button/40 hover:text-brand-button"
          >
            <Plus className="size-3" />
            세트 추가
          </button>
        </>
      ) : (
        <DurationInput
          duration={record.durationMinutes ?? 0}
          onChange={(minutes) =>
            onChange({ ...record, durationMinutes: minutes })
          }
        />
      )}
    </div>
  );
}
