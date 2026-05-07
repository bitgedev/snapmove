"use client";
import { useState } from "react";
import { ExerciseRecord } from "@/types";
import TopBar from "@/components/layout/TopBar";
import { Button } from "@/components/ui/button";
import ExerciseCard from "@/components/workout/ExerciseCard";
import ExerciseDrawer from "@/components/workout/ExerciseDrawer";
import FinishModal from "@/components/workout/FinishModal";

export default function WorkoutPage() {
  const [exercises, setExercises] = useState<ExerciseRecord[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [finishOpen, setFinishOpen] = useState(false);

  const totalVolume = exercises.flatMap((ex) => ex.sets ?? []).reduce(
    (sum, set) => sum + set.weight * set.reps,
    0,
  );

  const handleUpdate = (updated: ExerciseRecord) => {
    setExercises((prev) => prev.map((ex) => (ex.id === updated.id ? updated : ex)));
  };

  const handleRemove = (id: string) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== id));
  };

  const handleComplete = async (durationMinutes: number, photoFile?: File) => {
    console.log({ exercises, durationMinutes, photoFile });
    setFinishOpen(false);
  };

  return (
    <>
      <TopBar title="오늘의 운동" />
      <div className="flex flex-col gap-3 p-4">
        {exercises.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            운동을 추가해보세요
          </p>
        ) : (
          exercises.map((ex) => (
            <ExerciseCard
              key={ex.id}
              record={ex}
              onChange={handleUpdate}
              onRemove={() => handleRemove(ex.id)}
            />
          ))
        )}
        <Button variant="outline" className="w-full" onClick={() => setDrawerOpen(true)}>
          + 운동 추가
        </Button>
        {exercises.length > 0 && (
          <Button className="w-full" onClick={() => setFinishOpen(true)}>
            운동 완료
          </Button>
        )}
      </div>
      <ExerciseDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        onSelect={(item) => {
          setExercises((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              name: item.name,
              category: item.category,
              muscleGroup: item.muscleGroup,
              sets: item.category === "strength" ? [{ weight: 0, reps: 0 }] : undefined,
            },
          ]);
        }}
      />
      <FinishModal
        open={finishOpen}
        onOpenChange={setFinishOpen}
        exercises={exercises}
        totalVolume={totalVolume}
        onComplete={handleComplete}
      />
    </>
  );
}
