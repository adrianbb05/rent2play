import type {Dispatch, SetStateAction} from "react";
import type {CalendarView} from "@/app/features/types/calendarTypes";
import {DateNavigationButtons} from "@/app/features/calendar/header/DateNavigationButtons.js";
import {ViewButtons} from "@/app/features/calendar/header/ViewButtons.js";
import {FilterButtons, type Filters} from "@/app/features/calendar/header/FilterButtons";

interface CalendarButtonsProps {
    dateToDisplay: Date
    setDateToDisplay: Dispatch<SetStateAction<Date>>
    view: CalendarView
    setView: Dispatch<SetStateAction<CalendarView>>
    setFilters: Dispatch<SetStateAction<Filters>>
}

export function CalendarButtons({dateToDisplay, setDateToDisplay, setView, view, setFilters}: CalendarButtonsProps) {
    const month = dateToDisplay.toLocaleString("default", {month: "long"})
    const fullYear = dateToDisplay.getFullYear()

    return (
        <div className="flex flex-wrap items-center justify-between gap-2 sticky top-0 bg-white z-10 px-4 py-2">
            <DateNavigationButtons setDateToDisplay={setDateToDisplay} view={view}/>
            <h2 className="text-center flex-1 min-w-[120px]">
                {view === "year" ? fullYear : `${month} ${fullYear}`}
            </h2>
            <FilterButtons setFilters={setFilters}/>
            <ViewButtons setView={setView}/>
        </div>
    )
}


