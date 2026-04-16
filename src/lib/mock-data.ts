import { Routine, WorkoutSession } from "@/types";

export const MOCK_ROUTINES: Routine[] = [
  {
    id: "1",
    name: "Push Day",
    description: "가슴·어깨·삼두 위주의 밀기 루틴",
    exercises: [
      { id: "e1", name: "벤치 프레스", muscleGroup: "chest", sets: 4, reps: 8, weight: 70, restSeconds: 90 },
      { id: "e2", name: "인클라인 덤벨 프레스", muscleGroup: "chest", sets: 3, reps: 10, weight: 24, restSeconds: 75 },
      { id: "e3", name: "숄더 프레스", muscleGroup: "shoulders", sets: 3, reps: 12, weight: 30, restSeconds: 60 },
      { id: "e4", name: "레터럴 레이즈", muscleGroup: "shoulders", sets: 3, reps: 15, weight: 10, restSeconds: 45 },
      { id: "e5", name: "트라이셉 푸시다운", muscleGroup: "arms", sets: 3, reps: 12, weight: 20, restSeconds: 60 },
    ],
    estimatedMinutes: 55,
    lastPerformedAt: "2026-04-14T10:00:00Z",
  },
  {
    id: "2",
    name: "Pull Day",
    description: "등·이두 위주의 당기기 루틴",
    exercises: [
      { id: "e6", name: "데드리프트", muscleGroup: "back", sets: 4, reps: 5, weight: 100, restSeconds: 120 },
      { id: "e7", name: "바벨 로우", muscleGroup: "back", sets: 4, reps: 8, weight: 60, restSeconds: 90 },
      { id: "e8", name: "랫 풀다운", muscleGroup: "back", sets: 3, reps: 10, weight: 55, restSeconds: 75 },
      { id: "e9", name: "케이블 로우", muscleGroup: "back", sets: 3, reps: 12, weight: 45, restSeconds: 60 },
      { id: "e10", name: "바이셉 컬", muscleGroup: "arms", sets: 3, reps: 12, weight: 15, restSeconds: 60 },
    ],
    estimatedMinutes: 60,
    lastPerformedAt: "2026-04-13T11:00:00Z",
  },
  {
    id: "3",
    name: "Leg Day",
    description: "하체 전체를 공략하는 하체 지옥 루틴",
    exercises: [
      { id: "e11", name: "스쿼트", muscleGroup: "legs", sets: 5, reps: 5, weight: 90, restSeconds: 120 },
      { id: "e12", name: "레그 프레스", muscleGroup: "legs", sets: 4, reps: 10, weight: 140, restSeconds: 90 },
      { id: "e13", name: "루마니안 데드리프트", muscleGroup: "legs", sets: 3, reps: 10, weight: 70, restSeconds: 90 },
      { id: "e14", name: "레그 컬", muscleGroup: "legs", sets: 3, reps: 12, weight: 40, restSeconds: 60 },
      { id: "e15", name: "카프 레이즈", muscleGroup: "legs", sets: 4, reps: 15, weight: 60, restSeconds: 45 },
    ],
    estimatedMinutes: 65,
    lastPerformedAt: "2026-04-12T09:00:00Z",
  },
  {
    id: "4",
    name: "Core & Cardio",
    description: "코어 강화와 유산소를 결합한 전신 컨디셔닝",
    exercises: [
      { id: "e16", name: "플랭크", muscleGroup: "core", sets: 3, reps: 60, weight: 0, restSeconds: 45 },
      { id: "e17", name: "크런치", muscleGroup: "core", sets: 3, reps: 20, weight: 0, restSeconds: 45 },
      { id: "e18", name: "레그 레이즈", muscleGroup: "core", sets: 3, reps: 15, weight: 0, restSeconds: 45 },
      { id: "e19", name: "버피", muscleGroup: "cardio", sets: 4, reps: 10, weight: 0, restSeconds: 60 },
      { id: "e20", name: "마운틴 클라이머", muscleGroup: "cardio", sets: 3, reps: 30, weight: 0, restSeconds: 45 },
    ],
    estimatedMinutes: 40,
    lastPerformedAt: "2026-04-11T08:00:00Z",
  },
];

export const MOCK_SESSIONS: WorkoutSession[] = [
  {
    id: "s1",
    routineId: "1",
    routineName: "Push Day",
    date: "2026-04-14",
    durationSeconds: 3300,
    exercises: [
      {
        exerciseId: "e1", exerciseName: "벤치 프레스", muscleGroup: "chest",
        sets: [
          { setNumber: 1, weight: 70, reps: 8, completed: true },
          { setNumber: 2, weight: 70, reps: 8, completed: true },
          { setNumber: 3, weight: 70, reps: 7, completed: true },
          { setNumber: 4, weight: 65, reps: 8, completed: true },
        ],
      },
      {
        exerciseId: "e3", exerciseName: "숄더 프레스", muscleGroup: "shoulders",
        sets: [
          { setNumber: 1, weight: 30, reps: 12, completed: true },
          { setNumber: 2, weight: 30, reps: 11, completed: true },
          { setNumber: 3, weight: 30, reps: 10, completed: true },
        ],
      },
    ],
  },
  {
    id: "s2",
    routineId: "2",
    routineName: "Pull Day",
    date: "2026-04-13",
    durationSeconds: 3600,
    exercises: [
      {
        exerciseId: "e6", exerciseName: "데드리프트", muscleGroup: "back",
        sets: [
          { setNumber: 1, weight: 100, reps: 5, completed: true },
          { setNumber: 2, weight: 100, reps: 5, completed: true },
          { setNumber: 3, weight: 100, reps: 4, completed: true },
          { setNumber: 4, weight: 95, reps: 5, completed: true },
        ],
      },
    ],
  },
  {
    id: "s3",
    routineId: "3",
    routineName: "Leg Day",
    date: "2026-04-12",
    durationSeconds: 3900,
    exercises: [
      {
        exerciseId: "e11", exerciseName: "스쿼트", muscleGroup: "legs",
        sets: [
          { setNumber: 1, weight: 90, reps: 5, completed: true },
          { setNumber: 2, weight: 90, reps: 5, completed: true },
          { setNumber: 3, weight: 90, reps: 5, completed: true },
          { setNumber: 4, weight: 85, reps: 5, completed: true },
          { setNumber: 5, weight: 85, reps: 5, completed: true },
        ],
      },
    ],
  },
  {
    id: "s4",
    routineId: "4",
    routineName: "Core & Cardio",
    date: "2026-04-11",
    durationSeconds: 2400,
    exercises: [
      {
        exerciseId: "e16", exerciseName: "플랭크", muscleGroup: "core",
        sets: [
          { setNumber: 1, weight: 0, reps: 60, completed: true },
          { setNumber: 2, weight: 0, reps: 60, completed: true },
          { setNumber: 3, weight: 0, reps: 55, completed: true },
        ],
      },
    ],
  },
  {
    id: "s5",
    routineId: "1",
    routineName: "Push Day",
    date: "2026-04-08",
    durationSeconds: 3200,
    exercises: [
      {
        exerciseId: "e1", exerciseName: "벤치 프레스", muscleGroup: "chest",
        sets: [
          { setNumber: 1, weight: 70, reps: 8, completed: true },
          { setNumber: 2, weight: 70, reps: 8, completed: true },
          { setNumber: 3, weight: 70, reps: 8, completed: true },
          { setNumber: 4, weight: 70, reps: 7, completed: true },
        ],
      },
    ],
  },
  {
    id: "s6",
    routineId: "2",
    routineName: "Pull Day",
    date: "2026-04-06",
    durationSeconds: 3400,
    exercises: [
      {
        exerciseId: "e7", exerciseName: "바벨 로우", muscleGroup: "back",
        sets: [
          { setNumber: 1, weight: 60, reps: 8, completed: true },
          { setNumber: 2, weight: 60, reps: 8, completed: true },
          { setNumber: 3, weight: 60, reps: 8, completed: true },
          { setNumber: 4, weight: 60, reps: 7, completed: true },
        ],
      },
    ],
  },
  {
    id: "s7",
    routineId: "3",
    routineName: "Leg Day",
    date: "2026-04-04",
    durationSeconds: 4000,
    exercises: [
      {
        exerciseId: "e11", exerciseName: "스쿼트", muscleGroup: "legs",
        sets: [
          { setNumber: 1, weight: 85, reps: 5, completed: true },
          { setNumber: 2, weight: 85, reps: 5, completed: true },
          { setNumber: 3, weight: 85, reps: 5, completed: true },
          { setNumber: 4, weight: 85, reps: 5, completed: true },
          { setNumber: 5, weight: 80, reps: 5, completed: true },
        ],
      },
    ],
  },
  {
    id: "s8",
    routineId: "4",
    routineName: "Core & Cardio",
    date: "2026-04-02",
    durationSeconds: 2300,
    exercises: [
      {
        exerciseId: "e19", exerciseName: "버피", muscleGroup: "cardio",
        sets: [
          { setNumber: 1, weight: 0, reps: 10, completed: true },
          { setNumber: 2, weight: 0, reps: 10, completed: true },
          { setNumber: 3, weight: 0, reps: 10, completed: true },
          { setNumber: 4, weight: 0, reps: 9, completed: true },
        ],
      },
    ],
  },
];

export const getMockRoutineById = (id: string) =>
  MOCK_ROUTINES.find((r) => r.id === id);

export const getMockSessionsByMonth = (year: number, month: number) =>
  MOCK_SESSIONS.filter((s) => {
    const d = new Date(s.date);
    return d.getFullYear() === year && d.getMonth() + 1 === month;
  });

// async helpers (for Server Components that need await)
export const getRoutines = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_ROUTINES;
};

export const getRoutineById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return getMockRoutineById(id);
};
