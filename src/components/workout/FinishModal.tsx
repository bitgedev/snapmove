"use client";
import { ExerciseRecord } from "@/types";
import confetti from "canvas-confetti";
import { Fragment, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exercises: ExerciseRecord[];
  totalVolume: number;
  onComplete: (durationMinutes: number, photoFile?: File) => Promise<void>;
}
export default function FinishModal({
  open,
  onOpenChange,
  exercises,
  totalVolume,
  onComplete,
}: Props) {
  const [photoFile, setPhotoFile] = useState<File | undefined>();
  const [durationMinutes, setDurationMinutes] = useState<number>(0);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (open) confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
  }, [open]);
  useEffect(() => {
    if (!photoFile) {
      setPreviewUrl("");
      return;
    }
    const objectUrl = URL.createObjectURL(photoFile);
    setPreviewUrl(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    }
  }, [photoFile]);

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
      <>
        <h3>
          <label>소요 시간 (분)</label>
        </h3>
      </>
      <h3>
        <label>사진 (선택)</label>
      </h3>
      {/* 퀵 버튼 */}
      <div>
        {[15, 30, 60, 90].map((min) => (
          <button
            key={min}
            onClick={() => setDurationMinutes(min)}
            className={
              durationMinutes === min
                ? "bg-teal-600 text-white"
                : "border"
            }
          >
            {min}분
          </button>
        ))}
      </div>

      {/* 직접 입력 */}
      <Input
        type="number"
        min={1}
        value={durationMinutes ?? ""}
        onChange={(e) => {
          const val = e.target.valueAsNumber;
          setDurationMinutes(isNaN(val) ? 0 : val);
        }}
        placeholder="직접 입력"
      />
      <div>
        <Input type="file" accept="image/*" capture="environment" onChange={(e) => {
          if (e.target.files && e.target.files?.[0]) {
            setPhotoFile(e.target.files[0]);
          }
        }} />
        {previewUrl && (
          <img src={previewUrl} alt="Preview" />
        )}
      </div>
      <div>
        <button>취소</button>
        <button onClick={() => onComplete(durationMinutes, photoFile)}>저장하기</button>
      </div >
    </>
  );
}
