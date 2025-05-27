import type {CalendarEventResponse} from "@/app/hooks/types/EventTypes";
import {useState} from "react";
import {CalendarButtons} from "@/app/features/calendar/header/CalendarButtons";
import type {CalendarView} from "@/app/features/types/calendarTypes";
import {Calendar} from "@/app/features/calendar/body/Calendar";


interface CalendarOverviewProps {
    calendarContent: CalendarEventResponse
}

export function CalendarOverview({calendarContent}: CalendarOverviewProps) {
    const [dateToDisplay, setDateToDisplay] = useState<Date>(new Date())
    const [view, setView] = useState<CalendarView>("month")

    return (
        <div className="flex flex-col gap-5 h-screen">
            <div className="sticky top-0 bg-white z-10">
                <CalendarButtons
                    dateToDisplay={dateToDisplay}
                    setDateToDisplay={setDateToDisplay}
                    setView={setView}
                    view={view}
                />
            </div>
            <div className="flex-grow overflow-y-auto">
                <Calendar
                    view={view}
                    dateToDisplay={dateToDisplay}
                    calendarContent={calendarContent}
                />
            </div>
        </div>
    )

}