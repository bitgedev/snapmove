import { Badge } from "@/components/ui/badge";

interface Props {
  sets: number;
  reps: number;
}

export default function StatBadge({ sets, reps }: Props) {
  return (
    <Badge variant="outline">
      {sets} x {reps}
    </Badge>
  );
}
