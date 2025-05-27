interface MonthComponentProps {
    dateToDisplay: Date
}

export function MonthComponent({dateToDisplay}: MonthComponentProps) {
    const year = dateToDisplay.getFullYear()
    const month = dateToDisplay.getMonth()

    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const days = Array.from({length: daysInMonth}, (_, i) => new Date(year, month, i + 1))

    return (
        <div className="grid grid-cols-7 gap-2">
            {Array.from({length: firstDayOfMonth}).map((_, index) => (
                <div key={`empty-${index}`} />
            ))}

            {days.map((day, index) => (
                <div
                    key={index}
                    className="w-24 h-24 border border-gray-300 flex items-center justify-center bg-gray-100"
                >
                    {day.getDate()}
                </div>
            ))}
        </div>
    )
}