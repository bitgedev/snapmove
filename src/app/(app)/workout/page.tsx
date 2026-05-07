"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExerciseRecord } from "@/types";
import TopBar from "@/components/layout/TopBar";
import { Plus, CheckCircle2 } from "lucide-react";
import ExerciseCard from "@/components/workout/ExerciseCard";
import ExerciseDrawer from "@/components/workout/ExerciseDrawer";
import FinishModal from "@/components/workout/FinishModal";

export default function WorkoutPage() {
  const router = useRouter();
  const [exercises, setExercises] = useState<ExerciseRecord[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [finishOpen, setFinishOpen] = useState(false);

  const totalVolume = exercises
    .flatMap((ex) => ex.sets ?? [])
    .reduce((sum, set) => sum + set.weight * set.reps, 0);

  const handleUpdate = (updated: ExerciseRecord) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === updated.id ? updated : ex)),
    );
  };

  const handleRemove = (id: string) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== id));
  };

  const handleComplete = async (durationMinutes: number) => {
    sessionStorage.setItem(
      "snapmove_pending_session",
      JSON.stringify({
        exercises,
        totalVolume,
        durationMinutes,
        date: Date.now(),
      }),
    );
    router.push("/workout/complete");
  };

  return (
    <>
      <TopBar title="오늘의 운동" />
      <div
        className={`flex flex-col gap-3 p-4 ${exercises.length > 0 ? "pb-40" : ""}`}
      >
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
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-muted-foreground/25 py-3.5 text-sm text-muted-foreground transition-colors hover:border-brand-button/40 hover:text-brand-button"
        >
          <Plus className="size-4" />
          운동 추가
        </button>
      </div>

      {exercises.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 flex justify-center px-6 py-3">
          <button
            onClick={() => setFinishOpen(true)}
            className="flex items-center gap-2.5 rounded-2xl bg-mint-gradient px-10 py-3.5 text-sm font-semibold text-white shadow-lg transition-opacity hover:opacity-90 active:scale-95"
          >
            <CheckCircle2 className="size-4" />
            운동 완료
          </button>
        </div>
      )}
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
              sets:
                item.category === "strength"
                  ? [{ weight: 0, reps: 0 }]
                  : undefined,
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
