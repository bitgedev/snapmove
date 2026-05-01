"use client";

import CalendarGrid from "@/components/calendar/CalendarGrid";
import DayDetailCard from "@/components/calendar/DayDetailCard";
import MonthNav from "@/components/calendar/MonthNav";
import { getMockSessionsByMonth } from "@/lib/mock-data";
import { useState } from "react";

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [today] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handlePrev = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };
  const handleNext = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };
  //CalendarGrid에서 클릭한 날짜를 넘겨받음
  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };
  //현재 달의 세션만 필터링해서 가져오기. getMonth는 0부터 시작하므로 +1하기
  const sessions = getMockSessionsByMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
  );
  const workoutDates = new Set(sessions.map((s) => s.date.slice(0, 10)));

  return (
    <main>
      <MonthNav
        currentMonth={currentMonth}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <CalendarGrid
        currentMonth={currentMonth}
        today={today}
        workoutDates={workoutDates}
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
      />
      <DayDetailCard selectedDate={selectedDate} sessions={sessions} />
    </main>
  );
}
