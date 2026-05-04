import { WorkoutSession } from "@/types";

export const MOCK_SESSIONS: WorkoutSession[] = [
  {
    id: "s1",
    date: "2026-04-14",
    durationMinutes: 55,
    exercises: [
      {
        id: "s1-e1", name: "벤치 프레스", category: "strength", muscleGroup: "chest",
        sets: [
          { weight: 70, reps: 8 },
          { weight: 70, reps: 8 },
          { weight: 70, reps: 7 },
          { weight: 65, reps: 8 },
        ],
      },
      {
        id: "s1-e2", name: "인클라인 덤벨 프레스", category: "strength", muscleGroup: "chest",
        sets: [
          { weight: 24, reps: 10 },
          { weight: 24, reps: 10 },
          { weight: 22, reps: 10 },
        ],
      },
      {
        id: "s1-e3", name: "숄더 프레스", category: "strength", muscleGroup: "shoulders",
        sets: [
          { weight: 30, reps: 12 },
          { weight: 30, reps: 11 },
          { weight: 30, reps: 10 },
        ],
      },
      {
        id: "s1-e4", name: "레터럴 레이즈", category: "strength", muscleGroup: "shoulders",
        sets: [
          { weight: 10, reps: 15 },
          { weight: 10, reps: 15 },
          { weight: 10, reps: 12 },
        ],
      },
      {
        id: "s1-e5", name: "트라이셉 푸시다운", category: "strength", muscleGroup: "arms",
        sets: [
          { weight: 20, reps: 12 },
          { weight: 20, reps: 12 },
          { weight: 20, reps: 10 },
        ],
      },
    ],
  },
  {
    id: "s2",
    date: "2026-04-13",
    durationMinutes: 60,
    exercises: [
      {
        id: "s2-e1", name: "데드리프트", category: "strength", muscleGroup: "back",
        sets: [
          { weight: 100, reps: 5 },
          { weight: 100, reps: 5 },
          { weight: 100, reps: 4 },
          { weight: 95, reps: 5 },
        ],
      },
      {
        id: "s2-e2", name: "바벨 로우", category: "strength", muscleGroup: "back",
        sets: [
          { weight: 60, reps: 8 },
          { weight: 60, reps: 8 },
          { weight: 60, reps: 7 },
          { weight: 60, reps: 7 },
        ],
      },
      {
        id: "s2-e3", name: "랫 풀다운", category: "strength", muscleGroup: "back",
        sets: [
          { weight: 55, reps: 10 },
          { weight: 55, reps: 10 },
          { weight: 55, reps: 9 },
        ],
      },
      {
        id: "s2-e4", name: "바이셉 컬", category: "strength", muscleGroup: "arms",
        sets: [
          { weight: 15, reps: 12 },
          { weight: 15, reps: 12 },
          { weight: 15, reps: 10 },
        ],
      },
    ],
  },
  {
    id: "s3",
    date: "2026-04-12",
    durationMinutes: 65,
    exercises: [
      {
        id: "s3-e1", name: "스쿼트", category: "strength", muscleGroup: "legs",
        sets: [
          { weight: 90, reps: 5 },
          { weight: 90, reps: 5 },
          { weight: 90, reps: 5 },
          { weight: 85, reps: 5 },
          { weight: 85, reps: 5 },
        ],
      },
      {
        id: "s3-e2", name: "레그 프레스", category: "strength", muscleGroup: "legs",
        sets: [
          { weight: 140, reps: 10 },
          { weight: 140, reps: 10 },
          { weight: 140, reps: 9 },
          { weight: 130, reps: 10 },
        ],
      },
      {
        id: "s3-e3", name: "루마니안 데드리프트", category: "strength", muscleGroup: "legs",
        sets: [
          { weight: 70, reps: 10 },
          { weight: 70, reps: 10 },
          { weight: 70, reps: 9 },
        ],
      },
      {
        id: "s3-e4", name: "카프 레이즈", category: "strength", muscleGroup: "legs",
        sets: [
          { weight: 60, reps: 15 },
          { weight: 60, reps: 15 },
          { weight: 60, reps: 15 },
          { weight: 60, reps: 12 },
        ],
      },
    ],
  },
  {
    id: "s4",
    date: "2026-04-11",
    durationMinutes: 40,
    exercises: [
      {
        id: "s4-e1", name: "플랭크", category: "strength", muscleGroup: "core",
        sets: [
          { weight: 0, reps: 60 },
          { weight: 0, reps: 60 },
          { weight: 0, reps: 55 },
        ],
      },
      {
        id: "s4-e2", name: "크런치", category: "strength", muscleGroup: "core",
        sets: [
          { weight: 0, reps: 20 },
          { weight: 0, reps: 20 },
          { weight: 0, reps: 18 },
        ],
      },
      {
        id: "s4-e3", name: "버피", category: "cardio",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 9 },
        ],
      },
      {
        id: "s4-e4", name: "마운틴 클라이머", category: "cardio",
        sets: [
          { weight: 0, reps: 30 },
          { weight: 0, reps: 30 },
          { weight: 0, reps: 28 },
        ],
      },
    ],
  },
  {
    id: "s5",
    date: "2026-04-08",
    durationMinutes: 53,
    exercises: [
      {
        id: "s5-e1", name: "벤치 프레스", category: "strength", muscleGroup: "chest",
        sets: [
          { weight: 70, reps: 8 },
          { weight: 70, reps: 8 },
          { weight: 70, reps: 8 },
          { weight: 70, reps: 7 },
        ],
      },
    ],
  },
  {
    id: "s6",
    date: "2026-04-06",
    durationMinutes: 57,
    exercises: [
      {
        id: "s6-e1", name: "바벨 로우", category: "strength", muscleGroup: "back",
        sets: [
          { weight: 60, reps: 8 },
          { weight: 60, reps: 8 },
          { weight: 60, reps: 8 },
          { weight: 60, reps: 7 },
        ],
      },
    ],
  },
  {
    id: "s7",
    date: "2026-04-04",
    durationMinutes: 67,
    exercises: [
      {
        id: "s7-e1", name: "스쿼트", category: "strength", muscleGroup: "legs",
        sets: [
          { weight: 85, reps: 5 },
          { weight: 85, reps: 5 },
          { weight: 85, reps: 5 },
          { weight: 85, reps: 5 },
          { weight: 80, reps: 5 },
        ],
      },
    ],
  },
  {
    id: "s8",
    date: "2026-04-02",
    durationMinutes: 38,
    exercises: [
      {
        id: "s8-e1", name: "버피", category: "cardio",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 9 },
        ],
      },
    ],
  },
  // 5월
  {
    id: "s9",
    date: "2026-05-01",
    durationMinutes: 55,
    exercises: [
      {
        id: "s9-e1", name: "벤치 프레스", category: "strength", muscleGroup: "chest",
        sets: [
          { weight: 72, reps: 8 },
          { weight: 72, reps: 8 },
          { weight: 72, reps: 7 },
          { weight: 67, reps: 8 },
        ],
      },
    ],
  },
  {
    id: "s10",
    date: "2026-05-03",
    durationMinutes: 60,
    exercises: [
      {
        id: "s10-e1", name: "데드리프트", category: "strength", muscleGroup: "back",
        sets: [
          { weight: 102, reps: 5 },
          { weight: 102, reps: 5 },
          { weight: 102, reps: 4 },
          { weight: 97, reps: 5 },
        ],
      },
    ],
  },
  {
    id: "s11",
    date: "2026-05-05",
    durationMinutes: 68,
    exercises: [
      {
        id: "s11-e1", name: "스쿼트", category: "strength", muscleGroup: "legs",
        sets: [
          { weight: 92, reps: 5 },
          { weight: 92, reps: 5 },
          { weight: 92, reps: 5 },
          { weight: 87, reps: 5 },
          { weight: 87, reps: 5 },
        ],
      },
    ],
  },
  {
    id: "s12",
    date: "2026-05-07",
    durationMinutes: 25,
    exercises: [
      {
        id: "s12-e1", name: "폼롤러 등·허벅지", category: "flexibility", muscleGroup: "full-body",
        sets: [{ weight: 0, reps: 60 }],
      },
      {
        id: "s12-e2", name: "고관절 굴곡근 스트레칭", category: "flexibility", muscleGroup: "legs",
        sets: [
          { weight: 0, reps: 30 },
          { weight: 0, reps: 30 },
        ],
      },
      {
        id: "s12-e3", name: "흉추 회전 스트레칭", category: "flexibility", muscleGroup: "back",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        id: "s12-e4", name: "햄스트링 스트레칭", category: "flexibility", muscleGroup: "legs",
        sets: [
          { weight: 0, reps: 30 },
          { weight: 0, reps: 30 },
        ],
      },
    ],
  },
  {
    id: "s13",
    date: "2026-05-10",
    durationMinutes: 54,
    exercises: [
      {
        id: "s13-e1", name: "숄더 프레스", category: "strength", muscleGroup: "shoulders",
        sets: [
          { weight: 32, reps: 12 },
          { weight: 32, reps: 11 },
          { weight: 32, reps: 10 },
        ],
      },
    ],
  },
  {
    id: "s14",
    date: "2026-05-13",
    durationMinutes: 58,
    exercises: [
      {
        id: "s14-e1", name: "바벨 로우", category: "strength", muscleGroup: "back",
        sets: [
          { weight: 62, reps: 8 },
          { weight: 62, reps: 8 },
          { weight: 62, reps: 7 },
          { weight: 62, reps: 7 },
        ],
      },
    ],
  },
  {
    id: "s15",
    date: "2026-05-15",
    durationMinutes: 42,
    exercises: [
      {
        id: "s15-e1", name: "플랭크", category: "strength", muscleGroup: "core",
        sets: [
          { weight: 0, reps: 60 },
          { weight: 0, reps: 60 },
          { weight: 0, reps: 60 },
        ],
      },
    ],
  },
  {
    id: "s16",
    date: "2026-05-17",
    durationMinutes: 66,
    exercises: [
      {
        id: "s16-e1", name: "레그 프레스", category: "strength", muscleGroup: "legs",
        sets: [
          { weight: 145, reps: 10 },
          { weight: 145, reps: 10 },
          { weight: 145, reps: 9 },
          { weight: 140, reps: 10 },
        ],
      },
    ],
  },
  {
    id: "s17",
    date: "2026-05-20",
    durationMinutes: 56,
    exercises: [
      {
        id: "s17-e1", name: "벤치 프레스", category: "strength", muscleGroup: "chest",
        sets: [
          { weight: 72, reps: 8 },
          { weight: 72, reps: 8 },
          { weight: 72, reps: 8 },
          { weight: 72, reps: 7 },
        ],
      },
    ],
  },
  {
    id: "s18",
    date: "2026-05-22",
    durationMinutes: 60,
    exercises: [
      {
        id: "s18-e1", name: "바이셉 컬", category: "strength", muscleGroup: "arms",
        sets: [
          { weight: 16, reps: 12 },
          { weight: 16, reps: 12 },
          { weight: 16, reps: 11 },
        ],
      },
    ],
  },
  {
    id: "s19",
    date: "2026-05-24",
    durationMinutes: 27,
    exercises: [
      {
        id: "s19-e1", name: "햄스트링 스트레칭", category: "flexibility", muscleGroup: "legs",
        sets: [
          { weight: 0, reps: 30 },
          { weight: 0, reps: 30 },
        ],
      },
    ],
  },
  {
    id: "s20",
    date: "2026-05-27",
    durationMinutes: 68,
    exercises: [
      {
        id: "s20-e1", name: "스쿼트", category: "strength", muscleGroup: "legs",
        sets: [
          { weight: 95, reps: 5 },
          { weight: 95, reps: 5 },
          { weight: 95, reps: 5 },
          { weight: 90, reps: 5 },
          { weight: 90, reps: 4 },
        ],
      },
    ],
  },
  {
    id: "s21",
    date: "2026-05-29",
    durationMinutes: 40,
    exercises: [
      {
        id: "s21-e1", name: "버피", category: "cardio",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
    ],
  },
  {
    id: "s33",
    date: "2026-05-02",
    durationMinutes: 45,
    exercises: [
      {
        id: "s33-e1", name: "트레드밀 인터벌", category: "cardio",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        id: "s33-e2", name: "사이클 스프린트", category: "cardio",
        sets: [
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
          { weight: 0, reps: 8 },
        ],
      },
      {
        id: "s33-e3", name: "점프 로프", category: "cardio",
        sets: [
          { weight: 0, reps: 100 },
          { weight: 0, reps: 100 },
          { weight: 0, reps: 80 },
        ],
      },
    ],
  },
  {
    id: "s34",
    date: "2026-05-09",
    durationMinutes: 60,
    exercises: [
      {
        id: "s34-e1", name: "벤치 프레스", category: "strength", muscleGroup: "chest",
        sets: [
          { weight: 72, reps: 8 },
          { weight: 72, reps: 8 },
          { weight: 72, reps: 7 },
          { weight: 67, reps: 8 },
        ],
      },
      {
        id: "s34-e2", name: "스쿼트", category: "strength", muscleGroup: "legs",
        sets: [
          { weight: 90, reps: 5 },
          { weight: 90, reps: 5 },
          { weight: 85, reps: 5 },
        ],
      },
      {
        id: "s34-e3", name: "흉추 회전 스트레칭", category: "flexibility", muscleGroup: "back",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        id: "s34-e4", name: "햄스트링 스트레칭", category: "flexibility", muscleGroup: "legs",
        sets: [
          { weight: 0, reps: 30 },
          { weight: 0, reps: 30 },
        ],
      },
    ],
  },
  {
    id: "s35",
    date: "2026-05-12",
    durationMinutes: 40,
    exercises: [
      {
        id: "s35-e1", name: "버피", category: "cardio",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        id: "s35-e2", name: "마운틴 클라이머", category: "cardio",
        sets: [
          { weight: 0, reps: 30 },
          { weight: 0, reps: 30 },
        ],
      },
      {
        id: "s35-e3", name: "고관절 굴곡근 스트레칭", category: "flexibility", muscleGroup: "legs",
        sets: [
          { weight: 0, reps: 30 },
          { weight: 0, reps: 30 },
        ],
      },
      {
        id: "s35-e4", name: "폼롤러 등·허벅지", category: "flexibility", muscleGroup: "full-body",
        sets: [{ weight: 0, reps: 60 }],
      },
    ],
  },
  {
    id: "s36",
    date: "2026-05-16",
    durationMinutes: 70,
    exercises: [
      {
        id: "s36-e1", name: "데드리프트", category: "strength", muscleGroup: "back",
        sets: [
          { weight: 100, reps: 5 },
          { weight: 100, reps: 5 },
          { weight: 95, reps: 5 },
        ],
      },
      {
        id: "s36-e2", name: "트레드밀 인터벌", category: "cardio",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        id: "s36-e3", name: "햄스트링 스트레칭", category: "flexibility", muscleGroup: "legs",
        sets: [
          { weight: 0, reps: 30 },
          { weight: 0, reps: 30 },
        ],
      },
      {
        id: "s36-e4", name: "흉추 회전 스트레칭", category: "flexibility", muscleGroup: "back",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
    ],
  },
  {
    id: "s37",
    date: "2026-05-19",
    durationMinutes: 50,
    exercises: [
      {
        id: "s37-e1", name: "클라이밍 워밍업", category: "other", muscleGroup: "full-body",
        sets: [
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
        ],
      },
      {
        id: "s37-e2", name: "볼더링", category: "other", muscleGroup: "full-body",
        sets: [
          { weight: 0, reps: 6 },
          { weight: 0, reps: 6 },
          { weight: 0, reps: 5 },
        ],
      },
    ],
  },
  {
    id: "s38",
    date: "2026-05-23",
    durationMinutes: 90,
    exercises: [
      {
        id: "s38-e1", name: "스쿼트", category: "strength", muscleGroup: "legs",
        sets: [
          { weight: 90, reps: 5 },
          { weight: 90, reps: 5 },
          { weight: 85, reps: 5 },
        ],
      },
      {
        id: "s38-e2", name: "트레드밀 인터벌", category: "cardio",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
      {
        id: "s38-e3", name: "햄스트링 스트레칭", category: "flexibility", muscleGroup: "legs",
        sets: [
          { weight: 0, reps: 30 },
          { weight: 0, reps: 30 },
        ],
      },
      {
        id: "s38-e4", name: "볼더링", category: "other", muscleGroup: "full-body",
        sets: [
          { weight: 0, reps: 5 },
          { weight: 0, reps: 5 },
        ],
      },
    ],
  },
  // 6월
  {
    id: "s22",
    date: "2026-06-02",
    durationMinutes: 55,
    exercises: [
      {
        id: "s22-e1", name: "벤치 프레스", category: "strength", muscleGroup: "chest",
        sets: [
          { weight: 75, reps: 8 },
          { weight: 75, reps: 8 },
          { weight: 75, reps: 7 },
          { weight: 70, reps: 8 },
        ],
      },
    ],
  },
  {
    id: "s23",
    date: "2026-06-04",
    durationMinutes: 62,
    exercises: [
      {
        id: "s23-e1", name: "데드리프트", category: "strength", muscleGroup: "back",
        sets: [
          { weight: 105, reps: 5 },
          { weight: 105, reps: 5 },
          { weight: 105, reps: 5 },
          { weight: 100, reps: 5 },
        ],
      },
    ],
  },
  {
    id: "s24",
    date: "2026-06-06",
    durationMinutes: 70,
    exercises: [
      {
        id: "s24-e1", name: "스쿼트", category: "strength", muscleGroup: "legs",
        sets: [
          { weight: 95, reps: 5 },
          { weight: 95, reps: 5 },
          { weight: 95, reps: 5 },
          { weight: 95, reps: 5 },
          { weight: 90, reps: 5 },
        ],
      },
    ],
  },
  {
    id: "s25",
    date: "2026-06-08",
    durationMinutes: 25,
    exercises: [
      {
        id: "s25-e1", name: "고관절 굴곡근 스트레칭", category: "flexibility", muscleGroup: "legs",
        sets: [
          { weight: 0, reps: 30 },
          { weight: 0, reps: 30 },
        ],
      },
    ],
  },
  {
    id: "s26",
    date: "2026-06-11",
    durationMinutes: 57,
    exercises: [
      {
        id: "s26-e1", name: "인클라인 덤벨 프레스", category: "strength", muscleGroup: "chest",
        sets: [
          { weight: 26, reps: 10 },
          { weight: 26, reps: 10 },
          { weight: 26, reps: 9 },
        ],
      },
    ],
  },
  {
    id: "s27",
    date: "2026-06-13",
    durationMinutes: 43,
    exercises: [
      {
        id: "s27-e1", name: "마운틴 클라이머", category: "cardio",
        sets: [
          { weight: 0, reps: 30 },
          { weight: 0, reps: 30 },
          { weight: 0, reps: 30 },
        ],
      },
    ],
  },
  {
    id: "s28",
    date: "2026-06-16",
    durationMinutes: 59,
    exercises: [
      {
        id: "s28-e1", name: "랫 풀다운", category: "strength", muscleGroup: "back",
        sets: [
          { weight: 58, reps: 10 },
          { weight: 58, reps: 10 },
          { weight: 58, reps: 9 },
        ],
      },
    ],
  },
  {
    id: "s29",
    date: "2026-06-19",
    durationMinutes: 67,
    exercises: [
      {
        id: "s29-e1", name: "레그 컬", category: "strength", muscleGroup: "legs",
        sets: [
          { weight: 42, reps: 12 },
          { weight: 42, reps: 12 },
          { weight: 42, reps: 11 },
        ],
      },
    ],
  },
  {
    id: "s30",
    date: "2026-06-22",
    durationMinutes: 55,
    exercises: [
      {
        id: "s30-e1", name: "벤치 프레스", category: "strength", muscleGroup: "chest",
        sets: [
          { weight: 75, reps: 8 },
          { weight: 75, reps: 8 },
          { weight: 75, reps: 8 },
          { weight: 75, reps: 7 },
        ],
      },
    ],
  },
  {
    id: "s31",
    date: "2026-06-25",
    durationMinutes: 26,
    exercises: [
      {
        id: "s31-e1", name: "흉추 회전 스트레칭", category: "flexibility", muscleGroup: "back",
        sets: [
          { weight: 0, reps: 10 },
          { weight: 0, reps: 10 },
        ],
      },
    ],
  },
  {
    id: "s32",
    date: "2026-06-28",
    durationMinutes: 42,
    exercises: [
      {
        id: "s32-e1", name: "크런치", category: "strength", muscleGroup: "core",
        sets: [
          { weight: 0, reps: 20 },
          { weight: 0, reps: 20 },
          { weight: 0, reps: 18 },
        ],
      },
    ],
  },
];

export const getMockSessionsByMonth = (year: number, month: number) =>
  MOCK_SESSIONS.filter((s) => {
    const d = new Date(s.date);
    return d.getFullYear() === year && d.getMonth() + 1 === month;
  });
