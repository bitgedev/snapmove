"use client";
import { ExerciseEntry } from "@/types";
import confetti from "canvas-confetti";
import { Fragment, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exercises: ExerciseEntry[];
  totalVolume: number;
  onComplete: (durationMin: number, photoFile?: File) => Promise<void>;
}
export default function FinishModal({
  open,
  onOpenChange,
  exercises,
  totalVolume,
  onComplete,
}: Props) {
  useEffect(() => {
    if (open) confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
  }, [open]);
  const totalMin = exercises.reduce(
    (total, ex) => total + (ex?.durationMinutes ?? 0),
    0,
  );

  return (
    <>
      <h2>🎉 운동 완료</h2>
      <div>
        <h3>총 볼륨</h3>
        <span>{totalVolume}</span>
      </div>
      <h3>운동 목록</h3>
      <ul>
        {exercises.map((ex) => (
          <Fragment key={ex.id}>
            <li>{ex.name}</li>
            {ex.sets?.length && <li>{ex.sets.length}세트</li>}
          </Fragment>
        ))}
      </ul>
      {totalMin > 0 ? (
        <>
          <h3>
            <label>소요 시간 (분)</label>
          </h3>
          <div>{totalMin}</div>
        </>
      ) : (
        ""
      )}
      <h3>
        <label>사진 (선택)</label>
      </h3>
      <div>
        <Input type="file" />+ 파일 선택
      </div>
      <div>
        <button>취소</button>
        <button>저장하기</button>
      </div>
    </>
  );
}
