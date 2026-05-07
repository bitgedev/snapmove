import { WorkoutSession } from "@/types";
import EmptyState from "../shared/EmptyState";
import ExerciseBadge from "../shared/ExerciseBadge";
import { getWorkoutLabel } from "@/lib/workout-label";

interface Props {
  selectedDate: Date | null;
  sessions: WorkoutSession[] | null;
}

export default function DayDetailCard({ selectedDate, sessions }: Props) {
  if (!selectedDate) {
    return (
      <div className="px-4 py-6 text-center text-sm text-muted-foreground">
        날짜를 선택하면 기록을 볼 수 있어요
      </div>
    );
  }

  const dateStr = `${selectedDate.getFullYear()}-${String(
    selectedDate.getMonth() + 1,
  ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

  const koreanDate = selectedDate.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  const session = sessions?.find((s) => s.date === dateStr) ?? null;

  if (!session) {
    return (
      <div className="px-4 py-4">
        <p className="mb-2 text-sm text-muted-foreground">{koreanDate}</p>
        <EmptyState title="이 날은 운동 기록이 없어요 🏃" />
      </div>
    );
  }

  const totalVolume = session.exercises
    .filter((ex) => ex.category === "strength" && ex.sets)
    .reduce((total, ex) =>
      total + ex.sets!.reduce((s, set) => s + set.weight * set.reps, 0), 0
    );

  return (
    <div className="px-4 py-4">
      {/* 헤더 */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">{koreanDate}</p>
        <h2 className="mb-2 text-lg font-bold text-foreground">
          {getWorkoutLabel([
            ...new Set(session.exercises.map((ex) => ex.category)),
          ])}
        </h2>
        <div className="flex items-center gap-2">
          {totalVolume > 0 && (
            <span className="rounded-full bg-brand-bg px-3 py-1 text-xs font-medium text-brand-hover">
              🏋️ {totalVolume.toLocaleString()}kg
            </span>
          )}
          <span className="rounded-full bg-brand-bg px-3 py-1 text-xs font-medium text-brand-hover">
            ⏱️ {session.durationMinutes}분
          </span>
        </div>
      </div>

      {/* 운동 목록 */}
      <div className="space-y-2">
        {session.exercises.map((ex) => (
          <div key={ex.name} className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">{ex.name}</span>
              <ExerciseBadge category={ex.category} muscleGroup={ex.muscleGroup} />
            </div>
            <span className="text-xs text-muted-foreground">
              {ex.category === "strength" && ex.sets && (
                `${ex.sets.length}세트 · 최대 ${Math.max(...ex.sets.map(s => s.weight))}kg`
              )}
              {ex.category === "cardio" && ex.durationMinutes && (
                `${ex.durationMinutes}분`
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
