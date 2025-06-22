import type { CalendarView } from "@/app/features/types/calendarTypes";

export function generateDays(dateToDisplay: Date, view: CalendarView) {
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const days: Date[] = [];
    const startDate = new Date(dateToDisplay);
    if (view === "week") {
        for (let i = 0; i < 7; i++) {
            const day = new Date(startDate);
            day.setDate(startDate.getDate() + i);
            days.push(day);
        }
    } else if (view === "2-weeks") {
        for (let i = 0; i < 14; i++) {
            const day = new Date(startDate);
            day.setDate(startDate.getDate() + i);
            days.push(day);
        }
    } else if (view === "month") {
        const daysInMonth = getDaysInMonth(startDate);
        for (let i = 1; i <= daysInMonth; i++) {
            const day = new Date(startDate);
            day.setDate(i);
            days.push(day);
        }
    } else if (view === "year") {
        for (let month = 0; month < 12; month++) {
            const daysInMonth = getDaysInMonth(startDate);
            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(startDate.getFullYear(), month, day);
                days.push(date);
            }
        }
    }

    return days;
}

