export interface ExerciseSet {
  w: number  // weight (kg)
  r: number  // reps
}

export interface Exercise {
  name: string
  sets: ExerciseSet[]
}

export interface WorkoutLog {
  id: string
  user_id: string
  date: string              // ISO date: "2026-04-18"
  routine_name: string
  duration_minutes: number
  category: string
  photo_url: string | null
  exercises: Exercise[]
  created_at: string
}

export type WorkoutLogInsert = Omit<WorkoutLog, 'id' | 'user_id' | 'created_at'>
