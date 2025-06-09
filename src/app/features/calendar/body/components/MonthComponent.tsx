import {DayComponent} from "@/app/features/calendar/body/components/DayComponent";
import type {CalendarEntry} from "@/app/features/services/calendar/calendarService";

interface MonthComponentProps {
    monthDate: Date
    calendarEntries: CalendarEntry[]
}

export function MonthComponent({monthDate, calendarEntries}: MonthComponentProps) {
    const year = monthDate.getFullYear()
    const month = monthDate.getMonth()

    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const days = Array.from({length: daysInMonth}, (_, i) => new Date(year, month, i + 1))
    const monthName = monthDate.toLocaleString("default", {month: "long"})

    return (
        <div>
            <h3 className="text-center font-bold mb-4">{monthName}</h3>
            <div className="grid grid-cols-7 gap-0">
                {Array.from({length: firstDayOfMonth}).map((_, index) => (
                    <div key={`empty-${index}`}/>
                ))}
                {days.map((day, index) => (
                    <DayComponent
                        key={month + index}
                        date={day}
                        calendarEntries={calendarEntries}/>
                ))}
            </div>
        </div>
    )
}