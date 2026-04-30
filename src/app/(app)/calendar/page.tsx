"use client"

import MonthNav from "@/components/calendar/MonthNav";
import { useState } from "react";

export default function CalendarPage() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const handlePrev = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    }
    const handleNext = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    }
    return (
        <main>
            <MonthNav currentMonth={currentMonth} onPrev={handlePrev} onNext={handleNext} />
        </main>
    );
}
