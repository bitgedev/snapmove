"use client";
import { ExerciseCategory, MuscleGroup } from "@/types";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CATEGORY_TABS,
  ExerciseItem,
  EXERCISES,
  MUSCLE_GROUPS,
} from "@/lib/exercise";
import MuscleGroupBadge from "../shared/MuscleGroupBadge";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (exercise: ExerciseItem) => void;
}

export default function ExerciseDrawer({
  open,
  onOpenChange,
  onSelect,
}: Props) {
  const [category, setCategory] = useState<ExerciseCategory | "all">("all");
  const [muscleGroup, setMuscleGroup] = useState<MuscleGroup | null>(null);
  const [search, setSearch] = useState("");
  const filteredExercise = EXERCISES.filter((ex) => {
    const matchCategory = category === "all" || ex.category === category;
    const matchMuscle = !muscleGroup || ex.muscleGroup === muscleGroup;
    const normalize = (s: string) => s.normalize("NFC").trim();
    const matchSearch = normalize(ex.name).includes(normalize(search));
    return matchCategory && matchMuscle && matchSearch;
  });
  const hasExactMatch = filteredExercise.some((ex) => ex.name === search);
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>운동 추가</DrawerTitle>
          <DrawerDescription className="sr-only">운동을 검색하고 추가하세요</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-3 px-4 pb-6">
          <Input
            placeholder="운동 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Tabs
            value={category}
            onValueChange={(val) => {
              setCategory(val as ExerciseCategory | "all");
              setMuscleGroup(null);
            }}
          >
            <TabsList className="w-full">
              {CATEGORY_TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex-1 text-xs"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          {category === "strength" && (
            <div className="flex gap-1.5 overflow-x-auto px-1 py-1">
              {MUSCLE_GROUPS.map((chip) => (
                <button
                  key={chip.value}
                  onClick={() =>
                    setMuscleGroup(
                      muscleGroup === chip.value ? null : chip.value,
                    )
                  }
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all",
                    chip.color,
                    muscleGroup === chip.value
                      ? "ring-2 ring-offset-1 ring-current"
                      : "opacity-50 hover:opacity-100",
                  )}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          )}
          <div className="flex max-h-64 flex-col overflow-y-auto rounded-lg border">
            {filteredExercise.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">
                운동이 없어요
              </p>
            ) : (
              filteredExercise.map((ex, i) => (
                <div key={ex.name}>
                  {i > 0 && <Separator />}
                  <Button
                    variant="ghost"
                    className="w-full justify-between rounded-none px-3"
                    onClick={() => {
                      onSelect(ex);
                      onOpenChange(false);
                    }}
                  >
                    <span>{ex.name}</span>
                    {ex.muscleGroup && (
                      <MuscleGroupBadge muscleGroup={ex.muscleGroup} />
                    )}
                  </Button>
                </div>
              ))
            )}
          </div>
          {search !== "" && category !== "all" && !hasExactMatch && (
            <Button
              variant="outline"
              className="w-full border-dashed"
              onClick={() => {
                onSelect({
                  name: search,
                  category,
                  ...(muscleGroup ? { muscleGroup } : {}),
                });
                onOpenChange(false);
              }}
            >
              + &quot;{search}&quot;{" "}
              {CATEGORY_TABS.find((t) => t.value === category)?.label}에 추가
            </Button>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
