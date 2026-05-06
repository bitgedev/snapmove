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
        type="text"
        inputMode="numeric"
        value={duration === 0 ? "" : String(duration)}
        placeholder="시간 (분)"
        onChange={(e) => {
          const filtered = e.target.value.replace(/[^0-9]/g, "");
          onChange(filtered === "" ? 0 : parseInt(filtered, 10));
        }}
      />
      <span>분</span>
    </div>
  );
}
