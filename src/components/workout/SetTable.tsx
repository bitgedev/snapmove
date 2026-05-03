"use client";

import { SetEntry } from "@/types";

interface Props {
  sets: SetEntry[];
  onChange: (sets: SetEntry[]) => void;
  category: "strength" | "other";
}
export default function SetTable({ sets, onChange, category }: Props) {
  const updateSet = (
    index: number,
    field: Exclude<keyof SetEntry, "id">,
    value: string | boolean,
  ) => {
    const newArray = sets.map((s, i) =>
      i === index ? { ...s, [field]: value } : s,
    );
    onChange(newArray);
  };
  return (
    <table>
      <thead>
        <tr>
          <th>세트</th>
          {category === "strength" && <th>무게(kg)</th>}
          <th>횟수</th>
          <th>완료</th>
        </tr>
      </thead>
      <tbody>
        {sets.map((set, i) => (
          <tr key={i} className={set.done ? "opacity-50" : ""}>
            <td>{i + 1}</td>
            {category === "strength" && (
              <td>
                <input
                  type="number"
                  inputMode="decimal"
                  value={set.w}
                  placeholder="0"
                  onChange={(e) => updateSet(i, "w", e.target.value)}
                />
              </td>
            )}
            <td>
              <input
                type="number"
                inputMode="numeric"
                value={set.r}
                onChange={(e) => updateSet(i, "r", e.target.value)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={set.done}
                onChange={(e) => updateSet(i, "done", e.target.checked)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
