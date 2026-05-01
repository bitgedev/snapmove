import { WorkoutSession } from "@/types";
import EmptyState from "../shared/EmptyState";

interface Props {
  selectedDate: Date | null;
  sessions: WorkoutSession[] | null;
}
export default function DayDetailCard({ selectedDate, sessions }: Props) {
  if (!selectedDate) {
    return (
      <div className="px-4 py-8 text-center text-sm text-gray-400">
        날짜를 선택하면 기록을 볼 수 있어요
      </div>
    );
  }
  // 선택한 날짜를 "2026-05-01" 형식 문자열로 변환
  const dateStr = `${selectedDate.getFullYear()}-${String(
    selectedDate.getMonth() + 1,
  ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

  // sessions 배열에서 해당 날짜 세션 찾기
  const session = sessions?.find((s) => s.date === dateStr) ?? null;

  if (!session) {
    return (
      <div className="px-4">
        <EmptyState title="이 날은 기록된 운동이 없어요" />
      </div>
    );
  }
  //무게
  const totalVolume = session.exercises.reduce((total, ex) => {
    return total + ex.sets.reduce((s, set) => s + set.weight * set.reps, 0);
  }, 0);
  //운동 시간
  const durationMin = Math.round(session.durationSeconds / 60);

  return (
    <div className="px-4 py-4">
      날짜 {dateStr}
      {session.exercises.map((ex) => {
        return (
          <>
            <div>진행 운동 {ex.exerciseName}</div>
            <div>세트 수 {ex.sets.length}</div>
          </>
        );
      })}
    </div>
  );
}
