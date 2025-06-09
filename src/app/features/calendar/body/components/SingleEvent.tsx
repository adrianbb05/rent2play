import type {CalendarEntry} from "@/app/features/services/calendar/calendarService";

interface EventsOverviewProps {
    matchingEntry: CalendarEntry
}

export function SingleEvent({matchingEntry}: EventsOverviewProps) {
    return (
        <div className="flex flex-col gap-1 mt-12 px-2">
            {matchingEntry.availableProducts.map((product) => (
                <div
                    key={product.title}
                    className="bg-green-100 border border-green-300 rounded px-2 py-1 text-xs truncate"
                >
                    ({product.availableQuantity}) {product.title}
                </div>
            ))}
        </div>
    )

}