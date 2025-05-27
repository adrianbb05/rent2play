import type {CalendarView} from "@/app/features/types/calendarTypes";

interface DayComponentProps {
    date: Date
    view: CalendarView
}

export function DayComponent({date, view}: DayComponentProps) {
    return (
        <div className="w-24 h-24 border border-gray-300 flex items-center justify-center bg-gray-100">
            {view === "year" ? date.toLocaleString("default", {month: "short"}) : date.getDate()}
        </div>
    )
}