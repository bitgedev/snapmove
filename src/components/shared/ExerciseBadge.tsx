import MuscleGroupBadge from "./MuscleGroupBadge";
import { Badge } from "@/components/ui/badge";
import type { ExerciseCategory, MuscleGroup } from "@/types";

const CATEGORY_STYLE: Record<ExerciseCategory, string> = {
  strength: "bg-gray-100 text-gray-600",
  cardio: "bg-orange-100 text-orange-700",
  flexibility: "bg-purple-100 text-purple-700",
  other: "bg-slate-100 text-slate-600",
};

const CATEGORY_LABEL: Record<ExerciseCategory, string> = {
  strength: "근력",
  cardio: "유산소",
  flexibility: "유연성",
  other: "기타",
};

interface Props {
  category: ExerciseCategory;
  muscleGroup?: MuscleGroup;
}

export default function ExerciseBadge({ category, muscleGroup }: Props) {
  if (muscleGroup) return <MuscleGroupBadge muscleGroup={muscleGroup} />;
  return (
    <Badge className={CATEGORY_STYLE[category]}>
      {CATEGORY_LABEL[category]}
    </Badge>
  );
}
