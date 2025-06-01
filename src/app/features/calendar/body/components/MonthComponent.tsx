import {DayComponent} from "@/app/features/calendar/body/components/DayComponent";
import type {CalendarEntry} from "@/app/features/services/calender/calendarService";

interface MonthComponentProps {
    dateToDisplay: Date
    calendarEntries: CalendarEntry[]
}

export function MonthComponent({dateToDisplay, calendarEntries}: MonthComponentProps) {
    const year = dateToDisplay.getFullYear()
    const month = dateToDisplay.getMonth()

    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const days = Array.from({length: daysInMonth}, (_, i) => new Date(year, month, i + 1))
    const monthName = dateToDisplay.toLocaleString("default", {month: "long"})

    return (
        <div>
            <h3 className="text-center font-bold mb-4">{monthName}</h3>
            <div className="grid grid-cols-7 gap-0">
                {Array.from({length: firstDayOfMonth}).map((_, index) => (
                    <div key={`empty-${index}`}/>
                ))}
                {days.map((day) => (
                    <DayComponent key={day.getTime()} date={day} calendarEntries={calendarEntries}/>
                ))}
            </div>
        </div>
    )
}