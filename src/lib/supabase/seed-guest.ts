import { createClient } from './client';

const SEED_LOGS = [
  {
    date: '2026-04-11',
    duration_minutes: 40,
    exercises: [
      { name: '플랭크', category: 'strength', muscleGroup: 'core', sets: [{ weight: 0, reps: 60 }, { weight: 0, reps: 60 }, { weight: 0, reps: 55 }] },
      { name: '크런치', category: 'strength', muscleGroup: 'core', sets: [{ weight: 0, reps: 20 }, { weight: 0, reps: 20 }, { weight: 0, reps: 18 }] },
      { name: '버피', category: 'cardio', sets: [{ weight: 0, reps: 10 }, { weight: 0, reps: 10 }, { weight: 0, reps: 10 }, { weight: 0, reps: 9 }] },
      { name: '마운틴 클라이머', category: 'cardio', sets: [{ weight: 0, reps: 30 }, { weight: 0, reps: 30 }, { weight: 0, reps: 28 }] },
    ],
  },
  {
    date: '2026-04-12',
    duration_minutes: 65,
    exercises: [
      { name: '스쿼트', category: 'strength', muscleGroup: 'legs', sets: [{ weight: 90, reps: 5 }, { weight: 90, reps: 5 }, { weight: 90, reps: 5 }, { weight: 85, reps: 5 }, { weight: 85, reps: 5 }] },
      { name: '레그 프레스', category: 'strength', muscleGroup: 'legs', sets: [{ weight: 140, reps: 10 }, { weight: 140, reps: 10 }, { weight: 140, reps: 9 }, { weight: 130, reps: 10 }] },
      { name: '루마니안 데드리프트', category: 'strength', muscleGroup: 'legs', sets: [{ weight: 70, reps: 10 }, { weight: 70, reps: 10 }, { weight: 70, reps: 9 }] },
      { name: '카프 레이즈', category: 'strength', muscleGroup: 'legs', sets: [{ weight: 60, reps: 15 }, { weight: 60, reps: 15 }, { weight: 60, reps: 15 }, { weight: 60, reps: 12 }] },
    ],
  },
  {
    date: '2026-04-13',
    duration_minutes: 60,
    exercises: [
      { name: '데드리프트', category: 'strength', muscleGroup: 'back', sets: [{ weight: 100, reps: 5 }, { weight: 100, reps: 5 }, { weight: 100, reps: 4 }, { weight: 95, reps: 5 }] },
      { name: '바벨 로우', category: 'strength', muscleGroup: 'back', sets: [{ weight: 60, reps: 8 }, { weight: 60, reps: 8 }, { weight: 60, reps: 7 }, { weight: 60, reps: 7 }] },
      { name: '랫 풀다운', category: 'strength', muscleGroup: 'back', sets: [{ weight: 55, reps: 10 }, { weight: 55, reps: 10 }, { weight: 55, reps: 9 }] },
      { name: '바이셉 컬', category: 'strength', muscleGroup: 'arms', sets: [{ weight: 15, reps: 12 }, { weight: 15, reps: 12 }, { weight: 15, reps: 10 }] },
    ],
  },
  {
    date: '2026-04-14',
    duration_minutes: 55,
    exercises: [
      { name: '벤치 프레스', category: 'strength', muscleGroup: 'chest', sets: [{ weight: 70, reps: 8 }, { weight: 70, reps: 8 }, { weight: 70, reps: 7 }, { weight: 65, reps: 8 }] },
      { name: '인클라인 덤벨 프레스', category: 'strength', muscleGroup: 'chest', sets: [{ weight: 24, reps: 10 }, { weight: 24, reps: 10 }, { weight: 22, reps: 10 }] },
      { name: '숄더 프레스', category: 'strength', muscleGroup: 'shoulders', sets: [{ weight: 30, reps: 12 }, { weight: 30, reps: 11 }, { weight: 30, reps: 10 }] },
      { name: '레터럴 레이즈', category: 'strength', muscleGroup: 'shoulders', sets: [{ weight: 10, reps: 15 }, { weight: 10, reps: 15 }, { weight: 10, reps: 12 }] },
      { name: '트라이셉 푸시다운', category: 'strength', muscleGroup: 'arms', sets: [{ weight: 20, reps: 12 }, { weight: 20, reps: 12 }, { weight: 20, reps: 10 }] },
    ],
  },
  // 5월: workout-label.ts 15가지 조합 전부 커버
  { // strength only → 💪 오늘 근력 제대로 했네요
    date: '2026-05-01',
    duration_minutes: 55,
    exercises: [
      { name: '벤치 프레스', category: 'strength', muscleGroup: 'chest', sets: [{ weight: 72, reps: 8 }, { weight: 72, reps: 8 }, { weight: 72, reps: 7 }, { weight: 67, reps: 8 }] },
      { name: '인클라인 덤벨 프레스', category: 'strength', muscleGroup: 'chest', sets: [{ weight: 24, reps: 10 }, { weight: 24, reps: 10 }, { weight: 22, reps: 10 }] },
    ],
  },
  { // cardio only → 🫀 심폐까지 밀어붙인 하루
    date: '2026-05-02',
    duration_minutes: 45,
    exercises: [
      { name: '트레드밀 인터벌', category: 'cardio', sets: [{ weight: 0, reps: 10 }, { weight: 0, reps: 10 }, { weight: 0, reps: 10 }] },
      { name: '점프 로프', category: 'cardio', sets: [{ weight: 0, reps: 100 }, { weight: 0, reps: 100 }, { weight: 0, reps: 80 }] },
    ],
  },
  { // flexibility only → 🧘 가동성과 유연성을 깨웠어요
    date: '2026-05-03',
    duration_minutes: 30,
    exercises: [
      { name: '폼롤러 등·허벅지', category: 'flexibility', muscleGroup: 'full-body', sets: [{ weight: 0, reps: 60 }] },
      { name: '고관절 굴곡근 스트레칭', category: 'flexibility', muscleGroup: 'legs', sets: [{ weight: 0, reps: 30 }, { weight: 0, reps: 30 }] },
      { name: '햄스트링 스트레칭', category: 'flexibility', muscleGroup: 'legs', sets: [{ weight: 0, reps: 30 }, { weight: 0, reps: 30 }] },
    ],
  },
  { // other only → ✨ 새로운 도전을 시작했네요
    date: '2026-05-04',
    duration_minutes: 50,
    exercises: [
      { name: '클라이밍 워밍업', category: 'other', muscleGroup: 'full-body', sets: [{ weight: 0, reps: 5 }, { weight: 0, reps: 5 }] },
      { name: '볼더링', category: 'other', muscleGroup: 'full-body', sets: [{ weight: 0, reps: 6 }, { weight: 0, reps: 6 }, { weight: 0, reps: 5 }] },
    ],
  },
  { // strength + cardio → 🔥 근력과 심폐를 함께 단련했네요
    date: '2026-05-05',
    duration_minutes: 65,
    exercises: [
      { name: '스쿼트', category: 'strength', muscleGroup: 'legs', sets: [{ weight: 92, reps: 5 }, { weight: 92, reps: 5 }, { weight: 92, reps: 5 }, { weight: 87, reps: 5 }, { weight: 87, reps: 5 }] },
      { name: '버피', category: 'cardio', sets: [{ weight: 0, reps: 10 }, { weight: 0, reps: 10 }, { weight: 0, reps: 10 }, { weight: 0, reps: 9 }] },
    ],
  },
  { // strength + flexibility → 💪 근력 키우고 유연성까지 챙겼어요
    date: '2026-05-07',
    duration_minutes: 60,
    exercises: [
      { name: '데드리프트', category: 'strength', muscleGroup: 'back', sets: [{ weight: 102, reps: 5 }, { weight: 102, reps: 5 }, { weight: 102, reps: 4 }, { weight: 97, reps: 5 }] },
      { name: '흉추 회전 스트레칭', category: 'flexibility', muscleGroup: 'back', sets: [{ weight: 0, reps: 10 }, { weight: 0, reps: 10 }] },
      { name: '햄스트링 스트레칭', category: 'flexibility', muscleGroup: 'legs', sets: [{ weight: 0, reps: 30 }, { weight: 0, reps: 30 }] },
    ],
  },
  { // strength + other → 🎯 다양하게 구성한 알찬 근력 운동
    date: '2026-05-08',
    duration_minutes: 70,
    exercises: [
      { name: '바벨 로우', category: 'strength', muscleGroup: 'back', sets: [{ weight: 62, reps: 8 }, { weight: 62, reps: 8 }, { weight: 62, reps: 7 }, { weight: 62, reps: 7 }] },
      { name: '클라이밍 워밍업', category: 'other', muscleGroup: 'full-body', sets: [{ weight: 0, reps: 5 }, { weight: 0, reps: 5 }] },
      { name: '볼더링', category: 'other', muscleGroup: 'full-body', sets: [{ weight: 0, reps: 6 }, { weight: 0, reps: 5 }, { weight: 0, reps: 5 }] },
    ],
  },
  { // cardio + flexibility → 🌿 유산소 후 몸까지 잘 풀었네요
    date: '2026-05-09',
    duration_minutes: 45,
    exercises: [
      { name: '사이클 스프린트', category: 'cardio', sets: [{ weight: 0, reps: 8 }, { weight: 0, reps: 8 }, { weight: 0, reps: 8 }] },
      { name: '마운틴 클라이머', category: 'cardio', sets: [{ weight: 0, reps: 30 }, { weight: 0, reps: 30 }, { weight: 0, reps: 28 }] },
      { name: '고관절 굴곡근 스트레칭', category: 'flexibility', muscleGroup: 'legs', sets: [{ weight: 0, reps: 30 }, { weight: 0, reps: 30 }] },
    ],
  },
  { // cardio + other → 🫀 심폐를 중심으로 단련한 하루
    date: '2026-05-10',
    duration_minutes: 55,
    exercises: [
      { name: '트레드밀 인터벌', category: 'cardio', sets: [{ weight: 0, reps: 10 }, { weight: 0, reps: 10 }, { weight: 0, reps: 10 }] },
      { name: '볼더링', category: 'other', muscleGroup: 'full-body', sets: [{ weight: 0, reps: 5 }, { weight: 0, reps: 5 }, { weight: 0, reps: 4 }] },
    ],
  },
  { // flexibility + other → 🧘 몸의 균형을 되찾은 하루
    date: '2026-05-11',
    duration_minutes: 35,
    exercises: [
      { name: '폼롤러 등·허벅지', category: 'flexibility', muscleGroup: 'full-body', sets: [{ weight: 0, reps: 60 }] },
      { name: '흉추 회전 스트레칭', category: 'flexibility', muscleGroup: 'back', sets: [{ weight: 0, reps: 10 }, { weight: 0, reps: 10 }] },
      { name: '클라이밍 워밍업', category: 'other', muscleGroup: 'full-body', sets: [{ weight: 0, reps: 5 }, { weight: 0, reps: 5 }] },
    ],
  },
  { // strength + cardio + flexibility → 🔥 근력·유산소·회복까지, 완벽한 하루
    date: '2026-05-12',
    duration_minutes: 75,
    exercises: [
      { name: '벤치 프레스', category: 'strength', muscleGroup: 'chest', sets: [{ weight: 72, reps: 8 }, { weight: 72, reps: 8 }, { weight: 72, reps: 7 }, { weight: 67, reps: 8 }] },
      { name: '버피', category: 'cardio', sets: [{ weight: 0, reps: 10 }, { weight: 0, reps: 10 }, { weight: 0, reps: 10 }] },
      { name: '햄스트링 스트레칭', category: 'flexibility', muscleGroup: 'legs', sets: [{ weight: 0, reps: 30 }, { weight: 0, reps: 30 }] },
    ],
  },
  { // strength + cardio + other → ⚡ 근력과 심폐를 동시에 잡았어요
    date: '2026-05-14',
    duration_minutes: 80,
    exercises: [
      { name: '스쿼트', category: 'strength', muscleGroup: 'legs', sets: [{ weight: 95, reps: 5 }, { weight: 95, reps: 5 }, { weight: 95, reps: 5 }, { weight: 90, reps: 5 }] },
      { name: '트레드밀 인터벌', category: 'cardio', sets: [{ weight: 0, reps: 10 }, { weight: 0, reps: 10 }, { weight: 0, reps: 10 }] },
      { name: '볼더링', category: 'other', muscleGroup: 'full-body', sets: [{ weight: 0, reps: 6 }, { weight: 0, reps: 6 }, { weight: 0, reps: 5 }] },
    ],
  },
  { // strength + flexibility + other → 💪 근력 키우고 회복까지 챙겼네요
    date: '2026-05-16',
    duration_minutes: 70,
    exercises: [
      { name: '데드리프트', category: 'strength', muscleGroup: 'back', sets: [{ weight: 100, reps: 5 }, { weight: 100, reps: 5 }, { weight: 95, reps: 5 }] },
      { name: '흉추 회전 스트레칭', category: 'flexibility', muscleGroup: 'back', sets: [{ weight: 0, reps: 10 }, { weight: 0, reps: 10 }] },
      { name: '볼더링', category: 'other', muscleGroup: 'full-body', sets: [{ weight: 0, reps: 5 }, { weight: 0, reps: 5 }] },
    ],
  },
  { // cardio + flexibility + other → 🌀 몸을 구석구석 깨운 하루
    date: '2026-05-19',
    duration_minutes: 60,
    exercises: [
      { name: '사이클 스프린트', category: 'cardio', sets: [{ weight: 0, reps: 8 }, { weight: 0, reps: 8 }, { weight: 0, reps: 8 }] },
      { name: '점프 로프', category: 'cardio', sets: [{ weight: 0, reps: 100 }, { weight: 0, reps: 80 }] },
      { name: '고관절 굴곡근 스트레칭', category: 'flexibility', muscleGroup: 'legs', sets: [{ weight: 0, reps: 30 }, { weight: 0, reps: 30 }] },
      { name: '클라이밍 워밍업', category: 'other', muscleGroup: 'full-body', sets: [{ weight: 0, reps: 5 }, { weight: 0, reps: 5 }] },
    ],
  },
  { // strength + cardio + flexibility + other → 🏆 오늘 진짜 다 했네요
    date: '2026-05-23',
    duration_minutes: 90,
    exercises: [
      { name: '스쿼트', category: 'strength', muscleGroup: 'legs', sets: [{ weight: 95, reps: 5 }, { weight: 95, reps: 5 }, { weight: 90, reps: 5 }] },
      { name: '트레드밀 인터벌', category: 'cardio', sets: [{ weight: 0, reps: 10 }, { weight: 0, reps: 10 }, { weight: 0, reps: 10 }] },
      { name: '햄스트링 스트레칭', category: 'flexibility', muscleGroup: 'legs', sets: [{ weight: 0, reps: 30 }, { weight: 0, reps: 30 }] },
      { name: '볼더링', category: 'other', muscleGroup: 'full-body', sets: [{ weight: 0, reps: 6 }, { weight: 0, reps: 6 }, { weight: 0, reps: 5 }] },
    ],
  },
];

export async function seedGuestData(): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: '인증 실패' };

  const rows = SEED_LOGS.map((log) => ({
    user_id: user.id,
    date: log.date,
    duration_minutes: log.duration_minutes,
    exercises: log.exercises,
  }));

  const { error } = await supabase.from('workout_logs').insert(rows);
  return { error: error?.message ?? null };
}
