import {Button} from "@/components/ui/button";
import type {Dispatch, SetStateAction} from "react";
import type {CalendarView} from "@/app/features/types/calendarTypes";

interface ViewButtonsProps {
    setView: Dispatch<SetStateAction<CalendarView>>
    view: CalendarView
}

export function ViewButtons({setView, view}: ViewButtonsProps) {
    return (
        <div>
            <Button
                variant={view === "week" ? "default" : "outline"}
                onClick={() => setView("week")}
            >
                Week
            </Button>
            <Button
                variant={view === "2-weeks" ? "default" : "outline"}
                onClick={() => setView("2-weeks")}>
               Bi-Weekly
            </Button>
            <Button
                variant={view === "month" ? "default" : "outline"}
                onClick={() => setView("month")}
            >
                Month
            </Button>
            <Button
                variant={view === "year" ? "default" : "outline"}
                onClick={() => setView("year")}
            >
               Year
            </Button>
        </div>
    )
}