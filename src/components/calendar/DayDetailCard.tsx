import { WorkoutSession } from "@/types";
import EmptyState from "../shared/EmptyState";
import MuscleGroupBadge from "../shared/MuscleGroupBadge";
import { getWorkoutLabel } from "@/lib/workout-label";

interface Props {
  selectedDate: Date | null;
  sessions: WorkoutSession[] | null;
}

export default function DayDetailCard({ selectedDate, sessions }: Props) {
  if (!selectedDate) {
    return (
      <div className="px-4 py-6 text-center text-sm text-gray-400">
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
        <p className="mb-2 text-sm text-gray-400">{koreanDate}</p>
        <EmptyState title="이 날은 기록된 운동이 없어요" />
      </div>
    );
  }

  const totalVolume = session.exercises.reduce((total, ex) => {
    return total + ex.sets.reduce((s, set) => s + set.weight * set.reps, 0);
  }, 0);

  const durationMin = Math.round(session.durationSeconds / 60);

  return (
    <div className="px-4 py-4">
      {/* 헤더 */}
      <div className="mb-4">
        <p className="text-sm text-gray-400">{koreanDate}</p>
        <h2 className="mb-2 text-lg font-bold text-gray-800">
          {getWorkoutLabel([
            ...new Set(session.exercises.map((ex) => ex.category)),
          ])}
        </h2>
        <div className="flex items-center gap-2">
          {totalVolume > 0 && (
            <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
              🏋️ {totalVolume.toLocaleString()}kg
            </span>
          )}
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
            ⏱️ {durationMin}분
          </span>
        </div>
      </div>

      {/* 운동 목록 */}
      <div className="space-y-2">
        {session.exercises.map((ex) => {
          const maxWeight = Math.max(...ex.sets.map((s) => s.weight));
          return (
            <div
              key={ex.exerciseName}
              className="flex items-center justify-between rounded-xl bg-teal-50 px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-800">
                  {ex.exerciseName}
                </span>
                <MuscleGroupBadge muscleGroup={ex.muscleGroup} />
              </div>
              <div className="text-right text-sm text-gray-500">
                <span>{ex.sets.length}세트</span>
                <span className="mx-1">·</span>
                {ex.category === "strength" ? (
                  <span>최대 {maxWeight}kg</span>
                ) : (
                  <span>{ex.sets[0].reps}회</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
