import { ExerciseCategory, MuscleGroup } from "@/types";

export const CATEGORY_TABS = [
  { value: "all", label: "전체" },
  { value: "strength", label: "근력" },
  { value: "cardio", label: "유산소" },
  { value: "flexibility", label: "유연성" },
  { value: "other", label: "기타" },
] as const;

export const MUSCLE_GROUPS = [                            
    { value: "chest",     label: "가슴", color: "bg-red-100 text-red-700" },                                
    { value: "back",      label: "등",   color: "bg-blue-100 text-blue-700" },                              
    { value: "shoulders", label: "어깨", color: "bg-violet-100 text-violet-700" },                          
    { value: "arms",      label: "팔",   color: "bg-rose-100 text-rose-700" },                              
    { value: "legs",      label: "하체", color: "bg-amber-100 text-amber-700" },                            
    { value: "core",      label: "코어", color: "bg-green-100 text-green-700" },                            
    { value: "full-body", label: "전신", color: "bg-slate-100 text-slate-600" },                            
] as const;

export interface ExerciseItem {
    name: string;
    category: ExerciseCategory;
    muscleGroup?: MuscleGroup;
}

export const EXERCISES: ExerciseItem[] = [
    // 근력 - 가슴
    { name: "벤치 프레스", category: "strength", muscleGroup: "chest" },
    { name: "인클라인 벤치 프레스", category: "strength", muscleGroup: "chest" },
    { name: "인클라인 덤벨 프레스", category: "strength", muscleGroup: "chest" },
    { name: "덤벨 플라이", category: "strength", muscleGroup: "chest" },
    { name: "케이블 크로스오버", category: "strength", muscleGroup: "chest" },
    { name: "딥스", category: "strength", muscleGroup: "chest" },
    { name: "푸시업", category: "strength", muscleGroup: "chest" },
    { name: "펙 덱 플라이", category: "strength", muscleGroup: "chest" },

    // 근력 - 등
    { name: "데드리프트", category: "strength", muscleGroup: "back" },
    { name: "바벨 로우", category: "strength", muscleGroup: "back" },
    { name: "랫 풀다운", category: "strength", muscleGroup: "back" },
    { name: "케이블 로우", category: "strength", muscleGroup: "back" },
    { name: "풀업", category: "strength", muscleGroup: "back" },
    { name: "친업", category: "strength", muscleGroup: "back" },
    { name: "시티드 로우", category: "strength", muscleGroup: "back" },
    { name: "원암 덤벨 로우", category: "strength", muscleGroup: "back" },
    { name: "티바 로우", category: "strength", muscleGroup: "back" },

    // 근력 - 어깨
    { name: "숄더 프레스", category: "strength", muscleGroup: "shoulders" },
    { name: "덤벨 숄더 프레스", category: "strength", muscleGroup: "shoulders" },
    { name: "레터럴 레이즈", category: "strength", muscleGroup: "shoulders" },
    { name: "프론트 레이즈", category: "strength", muscleGroup: "shoulders" },
    { name: "페이스 풀", category: "strength", muscleGroup: "shoulders" },
    { name: "업라이트 로우", category: "strength", muscleGroup: "shoulders" },
    { name: "리어 델트 플라이", category: "strength", muscleGroup: "shoulders" },

    // 근력 - 팔
    { name: "바이셉 컬", category: "strength", muscleGroup: "arms" },
    { name: "해머 컬", category: "strength", muscleGroup: "arms" },
    { name: "인클라인 덤벨 컬", category: "strength", muscleGroup: "arms" },
    { name: "컨센트레이션 컬", category: "strength", muscleGroup: "arms" },
    { name: "바벨 컬", category: "strength", muscleGroup: "arms" },
    { name: "트라이셉 푸시다운", category: "strength", muscleGroup: "arms" },
    { name: "오버헤드 트라이셉 익스텐션", category: "strength", muscleGroup: "arms" },
    { name: "스컬 크러셔", category: "strength", muscleGroup: "arms" },
    { name: "킥백", category: "strength", muscleGroup: "arms" },

    // 근력 - 하체
    { name: "스쿼트", category: "strength", muscleGroup: "legs" },
    { name: "프론트 스쿼트", category: "strength", muscleGroup: "legs" },
    { name: "레그 프레스", category: "strength", muscleGroup: "legs" },
    { name: "루마니안 데드리프트", category: "strength", muscleGroup: "legs" },
    { name: "레그 컬", category: "strength", muscleGroup: "legs" },
    { name: "레그 익스텐션", category: "strength", muscleGroup: "legs" },
    { name: "카프 레이즈", category: "strength", muscleGroup: "legs" },
    { name: "런지", category: "strength", muscleGroup: "legs" },
    { name: "불가리안 스플릿 스쿼트", category: "strength", muscleGroup: "legs" },
    { name: "힙 스러스트", category: "strength", muscleGroup: "legs" },
    { name: "글루트 브리지", category: "strength", muscleGroup: "legs" },

    // 근력 - 코어
    { name: "플랭크", category: "strength", muscleGroup: "core" },
    { name: "사이드 플랭크", category: "strength", muscleGroup: "core" },
    { name: "크런치", category: "strength", muscleGroup: "core" },
    { name: "레그 레이즈", category: "strength", muscleGroup: "core" },
    { name: "러시안 트위스트", category: "strength", muscleGroup: "core" },
    { name: "케이블 크런치", category: "strength", muscleGroup: "core" },
    { name: "행잉 레그 레이즈", category: "strength", muscleGroup: "core" },
    { name: "Ab 롤아웃", category: "strength", muscleGroup: "core" },

    // 근력 - 전신
    { name: "클린 앤 프레스", category: "strength", muscleGroup: "full-body" },
    { name: "케틀벨 스윙", category: "strength", muscleGroup: "full-body" },
    { name: "바벨 스내치", category: "strength", muscleGroup: "full-body" },
    { name: "파머스 워크", category: "strength", muscleGroup: "full-body" },

    // 유산소
    { name: "트레드밀", category: "cardio" },
    { name: "트레드밀 인터벌", category: "cardio" },
    { name: "실외 달리기", category: "cardio" },
    { name: "사이클", category: "cardio" },
    { name: "사이클 스프린트", category: "cardio" },
    { name: "일립티컬", category: "cardio" },
    { name: "스텝퍼", category: "cardio" },
    { name: "버피", category: "cardio" },
    { name: "마운틴 클라이머", category: "cardio" },
    { name: "점프 로프", category: "cardio" },
    { name: "로잉 머신", category: "cardio" },
    { name: "배틀 로프", category: "cardio" },
    { name: "수영", category: "cardio" },
    { name: "HIIT", category: "cardio" },

    // 유연성
    { name: "폼롤러 등·허벅지", category: "flexibility", muscleGroup: "full-body" },
    { name: "고관절 굴곡근 스트레칭", category: "flexibility", muscleGroup: "legs" },
    { name: "햄스트링 스트레칭", category: "flexibility", muscleGroup: "legs" },
    { name: "대퇴사두 스트레칭", category: "flexibility", muscleGroup: "legs" },
    { name: "종아리 스트레칭", category: "flexibility", muscleGroup: "legs" },
    { name: "어깨 교차 스트레칭", category: "flexibility", muscleGroup: "shoulders" },
    { name: "고양이-소 스트레칭", category: "flexibility", muscleGroup: "back" },
    { name: "비둘기 자세", category: "flexibility", muscleGroup: "legs" },
    { name: "흉부 스트레칭", category: "flexibility", muscleGroup: "chest" },
    { name: "흉추 회전 스트레칭", category: "flexibility", muscleGroup: "back" },
    { name: "폼롤러 IT밴드", category: "flexibility", muscleGroup: "legs" },
    { name: "목 스트레칭", category: "flexibility", muscleGroup: "shoulders" },

    // 기타
    { name: "클라이밍 워밍업", category: "other", muscleGroup: "full-body" },
    { name: "볼더링", category: "other", muscleGroup: "full-body" },
    { name: "요가", category: "other", muscleGroup: "full-body" },
    { name: "필라테스", category: "other", muscleGroup: "full-body" },
    { name: "크로스핏", category: "other", muscleGroup: "full-body" },
    { name: "태권도", category: "other", muscleGroup: "full-body" },
    { name: "복싱", category: "other", muscleGroup: "full-body" },
    { name: "배드민턴", category: "other", muscleGroup: "full-body" },
    { name: "농구", category: "other", muscleGroup: "full-body" },
    { name: "축구", category: "other", muscleGroup: "full-body" },
];

export const EXERCISE_MAP = new Map(
    EXERCISES.map((ex) => [ex.name, ex])
);