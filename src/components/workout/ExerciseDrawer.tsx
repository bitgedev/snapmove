"use client";
import { ExerciseCategory, MuscleGroup } from "@/types";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { EXERCISES } from "@/lib/exercise";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (exercise: {
    name: string;
    category: ExerciseCategory;
    muscleGroup: MuscleGroup;
  }) => void;
}

const CATEGORY_TABS = [
  { value: "all", label: "전체" },
  { value: "strength", label: "근력" },
  { value: "cardio", label: "유산소" },
  { value: "flexibility", label: "유연성" },
  { value: "other", label: "기타" },
] as const;

const MUSCLE_GROUPS = [
  { value: "chest", label: "가슴" },
  { value: "back", label: "등" },
  { value: "shoulders", label: "어깨" },
  { value: "arms", label: "팔" },
  { value: "legs", label: "하체" },
  { value: "core", label: "코어" },
] as const;

export default function ExerciseDrawer({
  open,
  onOpenChange,
  onSelect,
}: Props) {
  const [category, setCategory] = useState<ExerciseCategory | "all">("all");
  const [muscleGroup, setMuscleGroup] = useState<MuscleGroup | null>(null);
  const [search, setSearch] = useState("");
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>운동 추가</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-3 px-4 pb-6">
          <Input value={search} onChange={(e) => setSearch(e.target.value)} />
          <div className="flex gap-2 overflow-x-auto">
            {CATEGORY_TABS.map((tab) => (
              <button key={tab.value}>
                {tab.label}
              </button>
            ))}
          </div>
          {category === "strength" && (
            <div className="flex gap-2 overflow-x-auto">
              {MUSCLE_GROUPS.map((chip) => (
                <button key={chip.value}>{chip.label}</button>
              ))}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
