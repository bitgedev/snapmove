"use client";

import { SetRecord } from "@/types";

interface Props {
  sets: SetRecord[];
  onChange: (sets: SetRecord[]) => void;
}
export default function SetTable({ sets, onChange }: Props) {
  const updateSet = (index: number, field: keyof SetRecord, value: string) => {
    const newArray = sets.map((s, i) =>
      i === index ? { ...s, [field]: Number(value) } : s,
    );
    onChange(newArray);
  };
  return (
    <table>
      <thead>
        <tr>
          <th>세트</th>
          <th>무게(kg)</th>
          <th>횟수</th>
        </tr>
      </thead>
      <tbody>
        {sets.map((set, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>
              <input
                type="number"
                inputMode="decimal"
                value={set.weight}
                placeholder="0"
                onChange={(e) => updateSet(i, "weight", e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                inputMode="numeric"
                value={set.reps}
                placeholder="0"
                onChange={(e) => updateSet(i, "reps", e.target.value)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
