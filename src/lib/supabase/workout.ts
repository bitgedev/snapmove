import { createClient } from "./client";
import type { Exercise, WorkoutLog, WorkoutLogInsert } from "./types";
import type { ExerciseRecord } from "@/types";

export async function insertWorkoutLog({
  exercises,
  durationMinutes,
  date,
}: {
  exercises: ExerciseRecord[];
  durationMinutes: number;
  date: number;
}): Promise<{ error: string | null }> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "로그인이 필요합니다." };

  const d = new Date(date);
  const formattedDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  const mappedExercises: Exercise[] = exercises.map(
    ({ id: _, ...rest }) => rest,
  );

  const payload: WorkoutLogInsert = {
    date: formattedDate,
    duration_minutes: durationMinutes,
    exercises: mappedExercises,
  };

  const { error } = await supabase
    .from("workout_logs")
    .insert({ ...payload, user_id: user.id });

  return { error: error ? error.message : null };
}

export async function getWorkoutLogsByMonth(
  year: number,
  month: number,
): Promise<WorkoutLog[]> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const mm = String(month).padStart(2, "0");
  const firstDay = `${year}-${mm}-01`;
  const lastDayNum = new Date(year, month, 0).getDate();
  const lastDay = `${year}-${mm}-${String(lastDayNum).padStart(2, "0")}`;

  const { data, error } = await supabase
    .from("workout_logs")
    .select("*")
    .eq("user_id", user.id)
    .gte("date", firstDay)
    .lte("date", lastDay)
    .order("date", { ascending: false });

  if (error) return [];
  return data ?? [];
}
