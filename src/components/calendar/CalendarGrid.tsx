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
                <div key={day}>{day}</div>
            ))}
            {cells.map((cell, index) => 
                cell===null ? <div key={index}></div> : <div key={index}>{cell}</div>
            )}
        </div>
    );
}