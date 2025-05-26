import type {CalendarEventResponse} from "@/app/hooks/types/EventTypes";

interface CalendarOverviewProps {
    calendarContent: CalendarEventResponse
}
export function CalendarOverview({calendarContent}: CalendarOverviewProps) {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Calendar Overview</h1>
            <div className="space-y-4">
                {calendarContent.items.map((event) => (
                    <div key={event.id} className="p-4 border rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold">Summary: {event.summary}</h2>
                        <p>Description: {event.description}</p>
                        <p className="text-sm text-gray-500">Start: {event.start.date}</p>
                        <p className="text-sm text-gray-500">End: {event.end.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );

}