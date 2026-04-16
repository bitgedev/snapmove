import { Routine, WorkoutSession } from "@/types";

// 1. 운동 루틴 가짜 데이터 (계획)
export const MOCK_ROUTINES: Routine[] = [
  {
    id: "1",
    name: "오운완 상체 루틴",
    description: "가슴과 어깨 위주의 스트렝스 루틴",
    exercises: [
      {
        id: "e1",
        name: "벤치 프레스",
        muscleGroup: "chest",
        sets: 3,
        reps: 10,
        weight: 60,
        restSeconds: 90,
      },
      {
        id: "e2",
        name: "숄더 프레스",
        muscleGroup: "shoulders",
        sets: 3,
        reps: 12,
        weight: 30,
        restSeconds: 60,
      },
    ],
    estimatedMinutes: 45,
    lastPerformedAt: "2026-04-15T10:00:00Z",
  },
  {
    id: "2",
    name: "주말 하체 지옥",
    description: "스쿼트 중심의 하체 강화 루틴",
    exercises: [
      {
        id: "e3",
        name: "스쿼트",
        muscleGroup: "legs",
        sets: 4,
        reps: 8,
        weight: 80,
        restSeconds: 120,
      },
    ],
    estimatedMinutes: 60,
  },
];

// 2. 운동 기록 가짜 데이터 (실제로 한 것)
export const MOCK_SESSIONS: WorkoutSession[] = [
  {
    id: "s1",
    routineId: "1",
    routineName: "오운완 상체 루틴",
    date: "2026-04-15",
    durationSeconds: 2700,
    exercises: [
      {
        exerciseId: "e1",
        exerciseName: "벤치 프레스",
        muscleGroup: "chest",
        sets: [
          { setNumber: 1, weight: 60, reps: 10, completed: true },
          { setNumber: 2, weight: 60, reps: 10, completed: true },
          { setNumber: 3, weight: 60, reps: 9, completed: true },
        ],
      },
    ],
  },
];

// 3. 데이터를 가져오는 가짜 함수들 (나중에 DB 쿼리로 바뀔 부분)
export const getRoutines = async () => {
  // 실제 서버처럼 보이기 위해 아주 약간의 지연 시간을 줌
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_ROUTINES;
};

export const getRoutineById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_ROUTINES.find((r) => r.id === id);
};