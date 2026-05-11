"use client";

import CalendarGrid from "@/components/calendar/CalendarGrid";
import DayDetailCard from "@/components/calendar/DayDetailCard";
import MonthNav from "@/components/calendar/MonthNav";
import { getWorkoutLogsByMonth } from "@/lib/supabase/workout";
import type { ExerciseCategory, MuscleGroup, WorkoutSession } from "@/types";
import { useEffect, useState } from "react";

const TODAY = new Date();

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => new Date());
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getWorkoutLogsByMonth(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
    ).then((logs) => {
      setSessions(
        logs.map((log) => ({
          id: log.id,
          date: log.date,
          durationMinutes: log.duration_minutes,
          exercises: log.exercises.map((ex, i) => ({
            id: `${log.id}-${i}`,
            name: ex.name,
            category: ex.category as ExerciseCategory,
            muscleGroup: ex.muscleGroup as MuscleGroup | undefined,
            sets: ex.sets,
            durationMinutes: ex.durationMinutes,
          })),
        })),
      );
      setIsLoading(false);
    });
  }, [currentMonth]);

  const handlePrev = () =>
    setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1));
  const handleNext = () =>
    setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1));

  const workoutDates = new Set(sessions.map((s) => s.date.slice(0, 10)));

  return (
    <div>
      <MonthNav
        currentMonth={currentMonth}
        onPrev={handlePrev}
        onNext={handleNext}
        sessionCount={sessions.length}
      />
      <CalendarGrid
        currentMonth={currentMonth}
        today={TODAY}
        workoutDates={workoutDates}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      <DayDetailCard selectedDate={selectedDate} sessions={sessions} loading={isLoading} />
    </div>
  );
}
