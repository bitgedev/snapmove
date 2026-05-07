"use client";
import { ExerciseRecord } from "@/types";
import confetti from "canvas-confetti";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ExerciseBadge from "@/components/shared/ExerciseBadge";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exercises: ExerciseRecord[];
  totalVolume: number;
  onComplete: (durationMinutes: number) => Promise<void>;
}

export default function FinishModal({
  open,
  onOpenChange,
  exercises,
  totalVolume,
  onComplete,
}: Props) {
  const [durationMinutes, setDurationMinutes] = useState(0);

  const calculatedDuration = useMemo(
    () => exercises.reduce((sum, ex) => sum + (ex.durationMinutes ?? 0), 0),
    [exercises],
  );

  useEffect(() => {
    if (open) {
      setDurationMinutes(calculatedDuration);
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const totalSets = exercises.flatMap((ex) => ex.sets ?? []).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="max-w-sm gap-5">
        <DialogHeader>
          <DialogTitle className="text-center text-base">
            오늘의 움직임, 스냅 완료! 🏆
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            고생하셨습니다. 오늘의 노력을 기록으로 남겨볼게요.
          </DialogDescription>
        </DialogHeader>

        {/* 통계 */}
        <div className="grid grid-cols-3 divide-x rounded-xl bg-muted/60 py-3">
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[11px] text-muted-foreground">운동 종류</span>
            <span className="text-xl font-semibold">{exercises.length}</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[11px] text-muted-foreground">총 세트</span>
            <span className="text-xl font-semibold">{totalSets}</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[11px] text-muted-foreground">총 볼륨</span>
            <span className="text-xl font-semibold">
              {totalVolume.toLocaleString()}
              <span className="ml-0.5 text-xs font-normal">kg</span>
            </span>
          </div>
        </div>

        {/* 운동 목록 */}
        <div className="flex max-h-40 flex-col gap-1.5 overflow-y-auto">
          {exercises.map((ex) => (
            <div
              key={ex.id}
              className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{ex.name}</span>
                <ExerciseBadge
                  category={ex.category}
                  muscleGroup={ex.muscleGroup}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {ex.sets
                  ? `${ex.sets.length}세트`
                  : ex.durationMinutes
                    ? `${ex.durationMinutes}분`
                    : ""}
              </span>
            </div>
          ))}
        </div>

        {/* 소요 시간 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <label className="text-sm font-medium">소요 시간</label>
            {calculatedDuration > 0 &&
              durationMinutes !== calculatedDuration && (
                <button
                  className="text-[11px] text-brand-button hover:underline"
                  onClick={() => setDurationMinutes(calculatedDuration)}
                >
                  자동계산 복원 ({calculatedDuration}분)
                </button>
              )}
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              inputMode="numeric"
              value={durationMinutes === 0 ? "" : String(durationMinutes)}
              onChange={(e) => {
                const filtered = e.target.value.replace(/[^0-9]/g, "");
                setDurationMinutes(
                  filtered === "" ? 0 : parseInt(filtered, 10),
                );
              }}
              placeholder={
                calculatedDuration > 0
                  ? `${calculatedDuration}분 (자동계산)`
                  : "시간 직접 입력"
              }
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground">분</span>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex flex-col items-center gap-2">
          <button
            className="w-full rounded-2xl bg-mint-gradient py-3 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90 active:scale-95"
            onClick={() => onComplete(durationMinutes)}
          >
            다음 →
          </button>
          <button
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => onOpenChange(false)}
          >
            취소
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
