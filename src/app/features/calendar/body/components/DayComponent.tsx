import type {CalendarEntry} from "@/app/features/services/calendar/calendarService";
import {SingleEvent} from "@/app/features/calendar/body/components/SingleEvent";

interface DayComponentProps {
    date: Date;
    calendarEntries: CalendarEntry[]
}

export function DayComponent({date, calendarEntries}: DayComponentProps) {
    const isToday = new Date().toDateString() === date.toDateString();
    const dayOfWeek = (date.getDay() + 6) % 7; // Adjust to start on Monday

    const fullYear = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${fullYear}-${month}-${day}`;

    const matchingEntry = calendarEntries.find(entry => entry.date === formattedDate);

    return (
        <div
            className="w-full h-80 border border-gray-300 relative"
            style={{
                gridColumnStart: dayOfWeek + 1,
            }}
        >
            <div
                className={`absolute top-2 left-2 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 ${isToday ? "bg-blue-500 text-white font-bold" : "bg-white text-black"}`}
            >
                {date.getDate()}
            </div>
            {matchingEntry && <SingleEvent matchingEntry={matchingEntry}/>}
        </div>
    );
}