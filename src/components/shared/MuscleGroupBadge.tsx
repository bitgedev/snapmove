import { Badge } from "@/components/ui/badge";
import type { MuscleGroup } from "@/types";

const colorMap: Record<MuscleGroup, string> = {
  chest: "bg-red-100 text-red-700",
  back: "bg-blue-100 text-blue-700",
  shoulders: "bg-violet-100 text-violet-700",
  arms: "bg-rose-100 text-rose-700",
  legs: "bg-amber-100 text-amber-700",
  core: "bg-green-100 text-green-700",
  cardio: "bg-pink-100 text-pink-700",
  "full-body": "bg-slate-100 text-slate-600",
};

interface Props {
  muscleGroup: MuscleGroup;
}

const labelMap: Record<MuscleGroup, string> = {
  chest: "가슴",
  back: "등",
  shoulders: "어깨",
  arms: "팔",
  legs: "하체",
  core: "복근",
  cardio: "유산소",
  "full-body": "전신",
};

export default function MuscleGroupBadge({ muscleGroup }: Props) {
  return (
    <Badge className={colorMap[muscleGroup]}>
      {labelMap[muscleGroup]}
    </Badge>
  );
}
