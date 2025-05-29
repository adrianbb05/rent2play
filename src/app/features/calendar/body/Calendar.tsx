import type {CalendarView} from "@/app/features/types/calendarTypes";
import type {CalendarEventResponse} from "@/app/hooks/types/EventTypes";
import {generateDays} from "../../services/calender/calendarService";
import {DayComponent} from "@/app/features/calendar/body/components/DayComponent";
import {MonthComponent} from "@/app/features/calendar/body/components/MonthComponent";

interface CalendarProps {
    view: CalendarView
    dateToDisplay: Date
    calendarContent: CalendarEventResponse
}

export function Calendar({view, dateToDisplay, calendarContent}: CalendarProps) {
    const daysToDisplay = generateDays(dateToDisplay, view)

    if (view !== "year") {
        return (
            <div className="grid grid-cols-7 gap-0 min-w-full">
                {daysToDisplay.map((day, index) => (
                    <DayComponent key={index} date={day} />
                ))}
            </div>
        )
    } else {
        return (
            <div className="grid grid-cols-1 gap-4 min-2-full">
                {Array.from({length: 12}).map((_, monthIndex) => {
                    const monthDate = new Date(dateToDisplay.getFullYear(), monthIndex, 1)
                    return <MonthComponent key={monthIndex} dateToDisplay={monthDate}/>
                })}
            </div>
        )
    }
}

