export type ExerciseCategory = "strength" | "cardio" | "flexibility" | "other";

export type MuscleGroup =
    | "chest"
    | "back"
    | "shoulders"
    | "arms"
    | "legs"
    | "core"
    | "cardio"
    | "full-body";

export interface Exercise {
    id: string;
    name: string;
    category: ExerciseCategory;
    muscleGroup: MuscleGroup;
    sets: number;
    reps: number;
    weight: number;
    restSeconds: number
}

export interface Routine {
    id: string;
    name: string;
    description: string;
    exercises: Exercise[];
    estimatedMinutes: number;
    lastPerformedAt?: string;
}

export interface SetRecord {
    setNumber: number;
    weight: number;
    reps: number;
    completed: boolean
}

export interface ExerciseRecord {
    exerciseName: string;
    category: ExerciseCategory;
    muscleGroup: MuscleGroup;
    sets: SetRecord[]
}

export interface WorkoutSession {
    id: string;
    date: string;
    durationSeconds: number;
    exercises: ExerciseRecord[]
}

export interface SetEntry {
    w?: number;
    r?: number;
    done: boolean;
}

export interface ExerciseEntry {
    id: string;
    name: string;
    category: ExerciseCategory;
    durationMinutes?: number;
    muscleGroup?: MuscleGroup;
    sets?: SetEntry[];
}