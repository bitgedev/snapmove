interface CalendarGridProps {
  currentMonth: Date;
  today: Date;
  workoutDates: Set<string>;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

const dayOfTheWeek = ["일", "월", "화", "수", "목", "금", "토"];

export default function CalendarGrid({
  currentMonth,
  today,
  workoutDates,
  selectedDate,
  onSelectDate,
}: CalendarGridProps) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  const cells = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: lastDayOfMonth }, (_, i) => i + 1),
  ];
  const totalCells = Math.ceil(cells.length / 7) * 7;
  const paddedCells = [
    ...cells,
    ...Array(totalCells - cells.length).fill(null),
  ];

  return (
    <div className="grid grid-cols-7">
      {dayOfTheWeek.map((day, i) => (
        <div
          className={`border-b border-border text-center text-sm font-medium py-2 ${i === 0 ? "text-red-400" : "text-muted-foreground"}`}
          key={day}
        >
          {day}
        </div>
      ))}
      {paddedCells.map((cell, index) => {
        if (cell === null)
          return <div className="border-b border-border" key={index} />;

        const isSunday = index % 7 === 0;
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(cell).padStart(2, "0")}`;
        const hasWorkout = workoutDates.has(dateStr);
        const isSelected =
          selectedDate?.getFullYear() === year &&
          selectedDate?.getMonth() === month &&
          selectedDate?.getDate() === cell;
        const isToday =
          today.getFullYear() === year &&
          today.getMonth() === month &&
          today.getDate() === cell;

        const circleClass = isToday
          ? "bg-red-500 text-white"
          : isSelected
            ? "bg-brand-button text-white font-semibold"
            : isSunday
              ? "text-red-400"
              : "";

        return (
          <div
            key={index}
            className="border-b border-border flex flex-col items-center h-14 justify-center cursor-pointer"
            onClick={() => onSelectDate(new Date(year, month, cell))}
          >
            <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${circleClass}`}>
              {cell}
            </div>
            <div className={`w-1.5 h-1.5 rounded-full bg-brand-button mx-auto mt-0.5 ${hasWorkout ? "" : "invisible"}`} />
          </div>
        );
      })}
    </div>
  );
}
