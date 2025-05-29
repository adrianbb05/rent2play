import {Button} from "@/components/ui/button";
import type {Dispatch, SetStateAction} from "react";
import type {CalendarView} from "@/app/features/types/calendarTypes";

interface DateNavigationButtonsProps {
    setDateToDisplay: Dispatch<SetStateAction<Date>>
    view: CalendarView
}

export function DateNavigationButtons({setDateToDisplay, view}: DateNavigationButtonsProps) {
    const handleSubtractDate = () => {
        setDateToDisplay((prevDate) => {
            const newDate = new Date(prevDate)
            if (view === "month") {
                newDate.setMonth(newDate.getMonth() - 1)
            } else if (view === "week") {
                newDate.setDate(newDate.getDate() - 7)
            } else if (view === "2-weeks") {
                newDate.setDate(newDate.getDate() - 14)
            } else if (view === "year") {
                newDate.setFullYear(newDate.getFullYear() - 1)
            }
            return newDate
        })
    }

    const handleIncreaseDate = () => {
        setDateToDisplay((prevDate) => {
            const newDate = new Date(prevDate)
            if (view === "month") {
                newDate.setMonth(newDate.getMonth() + 1)
            } else if (view === "week") {
                newDate.setDate(newDate.getDate() + 7)
            } else if (view === "2-weeks") {
                newDate.setDate(newDate.getDate() + 14)
            } else if (view === "year") {
                newDate.setFullYear(newDate.getFullYear() + 1)
            }
            return newDate
        })
    }

    return (
        <div className="flex items-center justify-center">
            <Button
                variant="outline"
                onClick={handleSubtractDate}
            >
                {"<"}
            </Button>
            <Button
                variant="outline"
                onClick={() => setDateToDisplay(new Date())}
            >
                Today
            </Button>
            <Button
                variant="outline"
                onClick={handleIncreaseDate}
            >
                {">"}
            </Button>
        </div>
    )
}

