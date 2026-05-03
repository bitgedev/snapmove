"use client"
import { ExerciseEntry } from "@/types"
import { Button } from '@/components/ui/button';
import SetTable from "./SetTable";
import DurationInput from "./DurationInput";

interface Props {
    entry: ExerciseEntry;
    onChange: (updated: ExerciseEntry) => void;
    onRemove: () => void
}
export default function ExerciseCard({ entry, onChange, onRemove }: Props) {
    const addSet = () => onChange({
        ...entry,
        sets: [...entry.sets, { done: false }]
    })
    return <div className="flex items-center gap-3">
        <span>{entry.name}</span>
        <Button variant="ghost" size="icon" onClick={onRemove}>X</Button>
        {entry.category === "strength"
            ? <>
                <SetTable
                    sets={entry.sets}
                    onChange={(newSets) => onChange({ ...entry, sets: newSets })}
                    category="strength" />
                <Button variant="outline" onClick={addSet}>+ 세트 추가</Button>
            </>
            : <DurationInput
                duration={entry.durationMinutes ?? 0}
                onChange={(minutes) => onChange({ ...entry, durationMinutes: minutes })} />
        }
    </div>
}