import { ExerciseCategory, MuscleGroup } from "@/types";

export interface ExerciseItem {
    name: string;
    category: ExerciseCategory;
    muscleGroup: MuscleGroup;
}

export const EXERCISES: ExerciseItem[] = [
    // 근력 - 가슴
    { name: "벤치 프레스", category: "strength", muscleGroup: "chest" },
    { name: "인클라인 덤벨 프레스", category: "strength", muscleGroup: "chest" },
    { name: "덤벨 플라이", category: "strength", muscleGroup: "chest" },
    { name: "케이블 크로스오버", category: "strength", muscleGroup: "chest" },
    { name: "딥스", category: "strength", muscleGroup: "chest" },

    // 근력 - 등
    { name: "데드리프트", category: "strength", muscleGroup: "back" },
    { name: "바벨 로우", category: "strength", muscleGroup: "back" },
    { name: "랫 풀다운", category: "strength", muscleGroup: "back" },
    { name: "케이블 로우", category: "strength", muscleGroup: "back" },
    { name: "풀업", category: "strength", muscleGroup: "back" },
    { name: "시티드 로우", category: "strength", muscleGroup: "back" },

    // 근력 - 어깨
    { name: "숄더 프레스", category: "strength", muscleGroup: "shoulders" },
    { name: "레터럴 레이즈", category: "strength", muscleGroup: "shoulders" },
    { name: "프론트 레이즈", category: "strength", muscleGroup: "shoulders" },
    { name: "페이스 풀", category: "strength", muscleGroup: "shoulders" },

    // 근력 - 팔
    { name: "바이셉 컬", category: "strength", muscleGroup: "arms" },
    { name: "해머 컬", category: "strength", muscleGroup: "arms" },
    { name: "트라이셉 푸시다운", category: "strength", muscleGroup: "arms" },
    { name: "오버헤드 트라이셉 익스텐션", category: "strength", muscleGroup: "arms" },
    { name: "컨센트레이션 컬", category: "strength", muscleGroup: "arms" },

    // 근력 - 하체
    { name: "스쿼트", category: "strength", muscleGroup: "legs" },
    { name: "레그 프레스", category: "strength", muscleGroup: "legs" },
    { name: "루마니안 데드리프트", category: "strength", muscleGroup: "legs" },
    { name: "레그 컬", category: "strength", muscleGroup: "legs" },
    { name: "레그 익스텐션", category: "strength", muscleGroup: "legs" },
    { name: "카프 레이즈", category: "strength", muscleGroup: "legs" },
    { name: "런지", category: "strength", muscleGroup: "legs" },

    // 근력 - 코어
    { name: "플랭크", category: "strength", muscleGroup: "core" },
    { name: "크런치", category: "strength", muscleGroup: "core" },
    { name: "레그 레이즈", category: "strength", muscleGroup: "core" },
    { name: "러시안 트위스트", category: "strength", muscleGroup: "core" },

    // 유산소
    { name: "트레드밀", category: "cardio", muscleGroup: "cardio" },
    { name: "트레드밀 인터벌", category: "cardio", muscleGroup: "cardio" },
    { name: "사이클", category: "cardio", muscleGroup: "cardio" },
    { name: "사이클 스프린트", category: "cardio", muscleGroup: "cardio" },
    { name: "버피", category: "cardio", muscleGroup: "cardio" },
    { name: "마운틴 클라이머", category: "cardio", muscleGroup: "cardio" },
    { name: "점프 로프", category: "cardio", muscleGroup: "cardio" },
    { name: "로잉 머신", category: "cardio", muscleGroup: "cardio" },

    // 유연성
    { name: "폼롤러 등·허벅지", category: "flexibility", muscleGroup: "full-body" },
    { name: "고관절 굴곡근 스트레칭", category: "flexibility", muscleGroup: "legs" },
    { name: "햄스트링 스트레칭", category: "flexibility", muscleGroup: "legs" },
    { name: "어깨 교차 스트레칭", category: "flexibility", muscleGroup: "shoulders" },
    { name: "고양이-소 스트레칭", category: "flexibility", muscleGroup: "back" },
    { name: "비둘기 자세", category: "flexibility", muscleGroup: "legs" },
    { name: "흉부 스트레칭", category: "flexibility", muscleGroup: "chest" },

    // 기타
    { name: "클라이밍 워밍업", category: "other", muscleGroup: "full-body" },
    { name: "볼더링", category: "other", muscleGroup: "full-body" },
    { name: "요가", category: "other", muscleGroup: "full-body" },
    { name: "필라테스", category: "other", muscleGroup: "full-body" },
];

export const EXERCISE_MAP = new Map(
    EXERCISES.map((ex) => [ex.name, ex])
);