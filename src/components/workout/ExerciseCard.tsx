"use client";
import { ExerciseRecord } from "@/types";
import { Button } from "@/components/ui/button";
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
        <Button variant="ghost" size="icon-sm" onClick={onRemove}>
          X
        </Button>
      </div>
      {record.category === "strength" ? (
        <>
          <SetTable
            sets={record.sets ?? []}
            onChange={(newSets) => onChange({ ...record, sets: newSets })}
          />
          <Button variant="outline" size="sm" onClick={addSet}>
            + 세트 추가
          </Button>
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
