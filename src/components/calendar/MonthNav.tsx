import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthNavProps {
    currentMonth:Date;
    onPrev:() => void;
    onNext:() => void;
}
export default function MonthNav({currentMonth, onPrev, onNext}:MonthNavProps) {
    return (
        <div className="flex justify-between items-center">
            <Button variant="ghost" size="icon" onClick={onPrev}><ChevronLeft/></Button>
            <span>{currentMonth.toLocaleDateString("ko-KR",{year:"numeric",month:"long"})}</span>
            <Button variant="ghost" size="icon" onClick={onNext}><ChevronRight/></Button>
        </div>
    );
}