export interface Exercise {
  name: string;
  category: string;
  muscleGroup?: string;
  sets?: { weight: number; reps: number }[];
  durationMinutes?: number;
}

export interface WorkoutLog {
  id: string;
  user_id: string;
  date: string; // ISO date: "2026-04-18"
  duration_minutes: number;
  exercises: Exercise[];
  created_at: string;
}

export type WorkoutLogInsert = Omit<
  WorkoutLog,
  "id" | "user_id" | "created_at"
>;
