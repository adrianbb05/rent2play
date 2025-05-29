import type {Dispatch, SetStateAction} from "react";
import type {CalendarView} from "@/app/features/types/calendarTypes";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group";

interface ViewButtonsProps {
    setView: Dispatch<SetStateAction<CalendarView>>
}

export function ViewButtons({setView}: ViewButtonsProps) {
    return (
        <div className="flex items-center justify-center">
            <ToggleGroup type="single">
                <ToggleGroupItem
                    variant="outline"
                    value="week"
                    className="px-4 py-2"
                    onClick={() => setView("week")}
                >
                    Week
                </ToggleGroupItem>
                <ToggleGroupItem
                    variant="outline"
                    value="2-weeks"
                    className="px-4 py-2"
                    onClick={() => setView("2-weeks")}
                >
                    Bi-Weekly
                </ToggleGroupItem>
                <ToggleGroupItem
                    variant="outline"
                    value="month"
                    className="px-4 py-2"
                    onClick={() => setView("month")}
                >
                    Month
                </ToggleGroupItem>
                <ToggleGroupItem
                    variant="outline"
                    value="year"
                    className="px-4 py-2"
                    onClick={() => setView("year")}
                >
                    Year
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
    )
}