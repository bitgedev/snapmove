import { Badge } from "@/components/ui/badge";
import { MUSCLE_GROUPS } from "@/lib/exercise";
import type { MuscleGroup } from "@/types";

interface Props {
  muscleGroup: MuscleGroup;
}

export default function MuscleGroupBadge({ muscleGroup }: Props) {
  const group = MUSCLE_GROUPS.find((g) => g.value === muscleGroup);
  return <Badge className={group?.color}>{group?.label}</Badge>;
}
