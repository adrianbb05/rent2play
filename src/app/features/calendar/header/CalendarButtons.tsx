import type {Dispatch, SetStateAction} from "react";
import type {CalendarView} from "@/app/features/types/calendarTypes";
import {DateNavigationButtons} from "@/app/features/calendar/header/DateNavigationButtons.js";
import {ViewButtons} from "@/app/features/calendar/header/ViewButtons.js";

interface CalendarButtonsProps {
    dateToDisplay: Date
    setDateToDisplay: Dispatch<SetStateAction<Date>>
    view: CalendarView
    setView: Dispatch<SetStateAction<CalendarView>>
}

export function CalendarButtons({dateToDisplay, setDateToDisplay, setView, view}: CalendarButtonsProps) {
    const month = dateToDisplay.toLocaleString("default", {month: "long"})
    const fullYear = dateToDisplay.getFullYear()

    return (
        <div className="grid grid-cols-3 items-center">
            <DateNavigationButtons setDateToDisplay={setDateToDisplay} view={view}/>
            <h2 className="text-center">
                {view === "year" ? fullYear : `${month} ${fullYear}`}
            </h2>
            <ViewButtons setView={setView}/>
        </div>
    )
}


