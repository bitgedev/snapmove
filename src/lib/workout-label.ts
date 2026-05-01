import { ExerciseCategory } from "@/types";

export function getWorkoutLabel(categories: ExerciseCategory[]): string {
  const has = (c: ExerciseCategory) => categories.includes(c);
  const s = has("strength");
  const c = has("cardio");
  const f = has("flexibility");
  const o = has("other");

  // 전체 4종류
  if (s && c && f && o) return "🏆 오늘 진짜 다 했네요";

  // 3종류
  if (s && c && f) return "🔥 근력·유산소·회복까지, 완벽한 하루";
  if (s && c && o) return "⚡ 근력과 심폐를 동시에 잡았어요";
  if (s && f && o) return "💪 근력 키우고 회복까지 챙겼네요";
  if (c && f && o) return "🌀 몸을 구석구석 깨운 하루";

  // 2종류
  if (s && c) return "🔥 근력과 심폐를 함께 단련했네요";
  if (s && f) return "💪 근력 키우고 유연성까지 챙겼어요";
  if (s && o) return "🎯 다양하게 구성한 알찬 근력 운동";
  if (c && f) return "🌿 유산소 후 몸까지 잘 풀었네요";
  if (c && o) return "🫀 심폐를 중심으로 단련한 하루";
  if (f && o) return "🧘 몸의 균형을 되찾은 하루";

  // 1종류
  if (s) return "💪 오늘 근력 제대로 했네요";
  if (c) return "🫀 심폐까지 밀어붙인 하루";
  if (f) return "🧘 가동성과 유연성을 깨웠어요";
  if (o) return "✨ 새로운 도전을 시작했네요";

  return "👏 오늘도 수고했어요";
}
