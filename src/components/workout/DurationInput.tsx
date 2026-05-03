"use client";
import { Input } from "@/components/ui/input";
interface Props {
  duration: number; //분단위
  onChange: (minutes: number) => void;
}
export default function DurationInput({ duration, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        inputMode="numeric"
        value={duration}
        placeholder="시간 (분)"
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span>분</span>
    </div>
  );
}
