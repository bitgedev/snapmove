import MuscleGroupBadge from "./MuscleGroupBadge";
import { Badge } from "@/components/ui/badge";
import type { ExerciseCategory, MuscleGroup } from "@/types";

const CATEGORY_STYLE: Record<ExerciseCategory, string> = {
  strength: "bg-indigo-100 text-indigo-700",
  cardio: "bg-orange-100 text-orange-700",
  flexibility: "bg-purple-100 text-purple-700",
  other: "bg-yellow-100 text-yellow-700",
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
  return (
    <>
      <Badge className={CATEGORY_STYLE[category]}>
        {CATEGORY_LABEL[category]}
      </Badge>
      {muscleGroup && <MuscleGroupBadge muscleGroup={muscleGroup} />}
    </>
  );
}
