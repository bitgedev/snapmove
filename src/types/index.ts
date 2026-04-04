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
    id:string;
    name:string;
    muscleGroup: MuscleGroup;
    sets:number;
    reps:number;
    weight:number;
    restSeconds:number                               
}

export interface Routine {
    id:string;
    name:string;
    description:string;
    exercises: Exercise[];
    estimatedMinutes:number;
    lastPerformedAt?:string;
}

export interface SetRecord {
    setNumber:number;
    weight:number;
    reps:number;
    completed: boolean
}

export interface ExerciseRecord {
    exerciseId:string; 
    exerciseName:string;
    muscleGroup: MuscleGroup;
    sets: SetRecord[]
}

export interface WorkoutSession {
    id:string;
    routineId:string;
    routineName:string;
    date:string;
    durationSeconds:number;
    exercises: ExerciseRecord[]
}