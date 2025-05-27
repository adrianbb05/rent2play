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
            }
            return newDate
        })
    }

    return (
        <div>
            <Button onClick={handleSubtractDate}>
                {"<"}
            </Button>
            <Button onClick={() => setDateToDisplay(new Date())}>
                Today
            </Button>
            <Button onClick={handleIncreaseDate}>
                {">"}
            </Button>
        </div>
    )
}

