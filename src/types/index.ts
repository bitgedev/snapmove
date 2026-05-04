export type ExerciseCategory = "strength" | "cardio" | "flexibility" | "other";

export type MuscleGroup =
    | "chest"
    | "back"
    | "shoulders"
    | "arms"
    | "legs"
    | "core"
    | "full-body";

export interface SetRecord {
    weight: number;
    reps: number;
}
export interface ExerciseRecord {
    id: string;
    name: string;
    category: ExerciseCategory;
    durationMinutes?: number;
    muscleGroup?: MuscleGroup;
    sets?: SetRecord[];
}
export interface WorkoutSession {
    id: string;
    date: string;
    durationMinutes: number;
    exercises: ExerciseRecord[]
}