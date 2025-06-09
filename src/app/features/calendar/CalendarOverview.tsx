import type {CalendarEventResponse} from "@/app/hooks/types/EventTypes";
import {useState} from "react";
import {CalendarButtons} from "@/app/features/calendar/header/CalendarButtons";
import type {CalendarView} from "@/app/features/types/calendarTypes";
import {Calendar} from "@/app/features/calendar/body/Calendar";
import type {Product} from "@/app/features/types/inventory";


interface CalendarOverviewProps {
    calendarContent: CalendarEventResponse
    products: Product[]
    skusToFilter: string[]
}

export function CalendarOverview({calendarContent, products, skusToFilter}: CalendarOverviewProps) {
    const [dateToDisplay, setDateToDisplay] = useState<Date>(new Date())
    const [view, setView] = useState<CalendarView>("month")
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
        <div className="flex flex-col gap-5 h-screen w-screen">
            <CalendarButtons
                dateToDisplay={dateToDisplay}
                setDateToDisplay={setDateToDisplay}
                setView={setView}
                view={view}
            />
            <div className="grid grid-cols-7 text-center font-bold bg-gray-200 py-2">
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="px-2">
                        {day}
                    </div>
                ))}
            </div>
            <div className="flex-grow overflow-y-auto">
                <Calendar
                    view={view}
                    dateToDisplay={dateToDisplay}
                    calendarEvents={calendarContent}
                    products={products}
                    skusToFilter={skusToFilter}
                />
            </div>
        </div>
    )

}