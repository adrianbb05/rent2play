interface DayComponentProps {
    date: Date
}

export function DayComponent({date}: DayComponentProps) {
    const isToday = new Date().toDateString() === date.toDateString();
    const dayOfWeek = (date.getDay() + 6) % 7; // Adjust to start on Monday

    return (
        <div
            className="w-full h-40 border border-gray-300 relative"
            style={{
                gridColumnStart: dayOfWeek + 1,
            }}
        >
            <div
                className={`absolute top-2 left-2 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 ${isToday ? "bg-blue-500 text-white font-bold" : "bg-white text-black"}`}
            >
                {date.getDate()}
            </div>
        </div>
    );
}