interface CalendarGridProps {
    currentMonth:Date;
    today:Date;
    workoutDates:Set<string>;
    selectedDate:Date|null;
    onSelectDate:(date:Date)=>void;
}
const dayOfTheWeek = ["일","월","화","수","목","금","토"];
export default function CalendarGrid({currentMonth, today, workoutDates, selectedDate, onSelectDate}:CalendarGridProps) {
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
                className="border-b border-border text-center text-sm text-muted-foreground font-medium py-2"
                key={day}>{day}</div>
            ))}
            {cells.map((cell, index) => {
                if(cell===null) return <div className="border-b border-border" key={index}></div>;
                const dateStr=`${year}-${String(month+1).padStart(2,"0")}-${String(cell).padStart(2,"0")}`;
                const hasWorkout = workoutDates.has(dateStr);
                //선택날짜
                const isSelected = selectedDate?.getFullYear()===year
                && selectedDate?.getMonth()===month 
                && selectedDate?.getDate()===cell;
                //오늘날짜
                const isToday = today.getFullYear()===year
                && today.getMonth()===month 
                && today.getDate()===cell;
                const circleClass = isToday
                    ? "bg-red-500 text-white"
                    : isSelected
                    ? "bg-brand-button text-white font-semibold"
                    : "";
                return (
                    <div key={index}
                        className="border-b border-border flex flex-col items-center h-12 justify-center cursor-pointer"
                        onClick={() => onSelectDate(new Date(year, month, cell))}
                    >
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${circleClass}`}>                                                            
                        {cell}       
                        </div>                                                                                      
                        <div className={`w-1.5 h-1.5 rounded-full bg-brand-button mx-auto mt-0.5 ${hasWorkout ? "" : "invisible"}`}></div>
                    </div>
                );
            })}
        </div>
    );
}