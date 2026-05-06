"use client";

import { SetRecord } from "@/types";

interface Props {
  sets: SetRecord[];
  onChange: (sets: SetRecord[]) => void;
}
export default function SetTable({ sets, onChange }: Props) {
  const updateSet = (index: number, field: keyof SetRecord, value: string) => {
    const filtered = field === "weight"
      ? value.replace(/[^0-9.]/g, "")
      : value.replace(/[^0-9]/g, "");
    const newArray = sets.map((s, i) =>
      i === index ? { ...s, [field]: Number(filtered) } : s,
    );
    onChange(newArray);
  };
  return (
    <table className="text-sm">
      <thead>
        <tr className="text-muted-foreground">
          <th className="w-8 py-1 text-center font-medium">세트</th>
          <th className="w-28 py-1 text-center font-medium">무게(kg)</th>
          <th className="w-28 py-1 text-center font-medium">횟수</th>
        </tr>
      </thead>
      <tbody>
        {sets.map((set, i) => (
          <tr key={i}>
            <td className="py-1 text-center text-muted-foreground">{i + 1}</td>
            <td className="px-1 py-1">
              <input
                type="text"
                inputMode="decimal"
                value={set.weight === 0 ? "" : String(set.weight)}
                placeholder="0"
                className="w-full rounded border px-2 py-1 text-center"
                onChange={(e) => updateSet(i, "weight", e.target.value)}
              />
            </td>
            <td className="px-1 py-1">
              <input
                type="text"
                inputMode="numeric"
                value={set.reps === 0 ? "" : String(set.reps)}
                placeholder="0"
                className="w-full rounded border px-2 py-1 text-center"
                onChange={(e) => updateSet(i, "reps", e.target.value)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
