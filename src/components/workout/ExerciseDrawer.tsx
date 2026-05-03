"use client";
import { ExerciseCategory, MuscleGroup } from "@/types";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Tabs, TabsList } from "@base-ui/react/tabs";
import { useState } from "react";
import { getMockSessionsByMonth } from "@/lib/mock-data";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (exercise: {
    name: string;
    category: ExerciseCategory;
    muscleGroup: MuscleGroup;
  }) => void;
}

export default function ExerciseDrawer({
  open,
  onOpenChange,
  onSelect,
}: Props) {
  const [category, setCategory] = useState<ExerciseCategory>("strength");
  const [muscleGroup, setMuscleGroup] = useState<MuscleGroup | null>(null);
  const [search, setSearch] = useState("");
  getMockSessionsByMonth;
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>운동 추가</DrawerTitle>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
