interface CalendarGridProps {
    currentMonth:Date;
    workoutDates:Set<string>;
    selectedDate:Date|null;
    onSelectDate:(date:Date)=>void;
}
const dayOfTheWeek = ["일","월","화","수","목","금","토"];
export default function CalendarGrid({currentMonth, workoutDates, selectedDate, onSelectDate}:CalendarGridProps) {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfWeek = new Date(year, month, 1).getDay()
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    const cells = [
        ...Array(firstDayOfWeek).fill(null),
        ...Array.from({length:lastDayOfMonth}, (_, i) => i+ 1),
    ]; 
    return (
        <div className="grid grid-cols-7">
            {dayOfTheWeek.map((day)=> (
                <div
                className="text-center text-sm text-muted-foreground font-medium py-2"
                key={day}>{day}</div>
            ))}
            {cells.map((cell, index) => {
                if(cell===null) return <div key={index}></div>;
                const dateStr=`${year}-${String(month+1).padStart(2,"0")}-${String(cell).padStart(2,"0")}`;
                const hasWorkout = workoutDates.has(dateStr);
                return (<div key={index} className="flex flex-col items-center h-12 justify-center">
                    {cell}
                    {hasWorkout && <div className="w-1.5 h-1.5 rounded-full bg-[#0D9488] mx-auto mt-0.5"></div>}
                </div>);
            })}
        </div>
    );
}