import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthNavProps {
  currentMonth: Date;
  onPrev: () => void;
  onNext: () => void;
  sessionCount: number;
}

export default function MonthNav({
  currentMonth,
  onPrev,
  onNext,
  sessionCount,
}: MonthNavProps) {
  return (
    <div className="flex items-center justify-between px-2 py-3">
      <Button variant="ghost" size="lg" className="px-3" onClick={onPrev}>
        <ChevronLeft className="size-5" />
      </Button>
      <div className="text-center">
        <p className="text-lg font-semibold">
          {currentMonth.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
          })}
        </p>
        <p className="text-xs text-gray-400">
          이번 달{" "}
          <span className="font-bold text-teal-600">{sessionCount}회</span>{" "}
          운동했어요
        </p>
      </div>
      <Button variant="ghost" size="lg" className="px-3" onClick={onNext}>
        <ChevronRight className="size-5" />
      </Button>
    </div>
  );
}
