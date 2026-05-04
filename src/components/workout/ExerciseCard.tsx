"use client";
import { ExerciseRecord } from "@/types";
import { Button } from "@/components/ui/button";
import SetTable from "./SetTable";
import DurationInput from "./DurationInput";

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
    <div className="flex items-center gap-3">
      <span>{record.name}</span>
      <Button variant="ghost" size="icon" onClick={onRemove}>
        X
      </Button>
      {record.category === "strength" ? (
        <>
          <SetTable
            sets={record.sets ?? []}
            onChange={(newSets) => onChange({ ...record, sets: newSets })}
            category="strength"
          />
          <Button variant="outline" onClick={addSet}>
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
