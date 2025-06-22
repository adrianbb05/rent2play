import type {CalendarView} from "@/app/features/types/calendarTypes";
import type {CalendarEventResponse} from "@/app/hooks/types/EventTypes";
import {clubsAvailability} from "@/app/features/services/calendar/calendarService";
import {DayComponent} from "@/app/features/calendar/body/components/DayComponent";
import {MonthComponent} from "@/app/features/calendar/body/components/MonthComponent";
import type {Product} from "@/app/features/types/inventory";
import type {Filters} from "@/app/features/calendar/header/FilterButtons";
import {generateDays} from "@/app/features/services/calendar/dateUtils";

interface CalendarProps {
    view: CalendarView
    dateToDisplay: Date
    calendarEvents: CalendarEventResponse
    skusToFilter: string[]
    products: Product[]
    filters: Filters
}

export function Calendar({view, dateToDisplay, calendarEvents, products, filters}: CalendarProps) {
    if (view !== "year") {
        const daysToDisplay = generateDays(dateToDisplay, view)
        const calendarEntries = clubsAvailability(products, calendarEvents.items, daysToDisplay, filters)
        return (
            <div className="grid grid-cols-7 gap-0 min-w-full">
                {daysToDisplay.map((day, index) => (
                    <DayComponent
                        key={index}
                        date={day}
                        calendarEntries={calendarEntries}
                    />
                ))}
            </div>
        )
    } else {
        return (
            <div className="grid grid-cols-1 gap-4 min-2-full">
                {Array.from({length: 12}).map((_, monthIndex) => {
                    const monthDate = new Date(dateToDisplay.getFullYear(), monthIndex, 1)
                    const daysToGenerate = generateDays(monthDate, view)
                    const calendarEntries = clubsAvailability(products, calendarEvents.items, daysToGenerate, filters)
                    return <MonthComponent
                        key={monthIndex}
                        monthDate={monthDate}
                        calendarEntries={calendarEntries}
                    />
                })}
            </div>
        )
    }
}

