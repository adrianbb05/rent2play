import type {CalendarView} from "@/app/features/types/calendarTypes";
import type {Product} from "@/app/features/types/inventory";
import type {CalendarEventResponse, Item} from "@/app/hooks/types/EventTypes";

export function generateDays(dateToDisplay: Date, view: CalendarView) {
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        return new Date(year, month + 1, 0).getDate()
    }

    const days: Date[] = []
    const startDate = new Date(dateToDisplay)
    if (view === "week") {
        for (let i = 0; i < 7; i++) {
            const day = new Date(startDate)
            day.setDate(startDate.getDate() + i)
            days.push(day)
        }
    } else if (view === "2-weeks") {
        for (let i = 0; i < 14; i++) {
            const day = new Date(startDate)
            day.setDate(startDate.getDate() + i)
            days.push(day)
        }
    } else if (view === "month") {
        const daysInMonth = getDaysInMonth(startDate)
        for (let i = 1; i <= daysInMonth; i++) {
            const day = new Date(startDate)
            day.setDate(i)
            days.push(day)
        }
    } else if (view === "year") {
        for (let i = 0; i < 12; i++) {
            const month = new Date(startDate)
            month.setMonth(i)
            days.push(month)
        }
    }

    return days
}

export interface CalendarEntry {
    date: string;
    availableProducts: { title: string; availableQuantity: number }[];
}

export function clubsAvailability(
    products: Product[],
    calendarEvents: CalendarEventResponse,
    daysToDisplay: Date[]
) {
    const formattedDaysToDisplay = daysToDisplay.map(date =>
        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    );
    const events = calendarEvents.items
    const clubsEvents = events.filter(event => {
        const clubName = event.summary.split("|")[1].trim()
        return products.some(product => product.title === clubName)
    })

    const quantityClubEvents = clubsEvents.map(event => {
        const splitSummary = event.summary.split("|")[1]
        const content = splitSummary.split("Quantity :")
        const clubQuantity = content[1]
        let quantity = 1
        if (clubQuantity) {
            quantity = parseInt(content[1].trim())
        }
        return {
            ...event,
            quantity: quantity
        } as Item
    })

    return calculateAvailableProducts(products, quantityClubEvents, formattedDaysToDisplay)
}

function calculateAvailableProducts(
    products: Product[],
    quantityClubEvents: Item[],
    formattedDaysToDisplay: string[]
): CalendarEntry[] {
    return formattedDaysToDisplay.map(date => {
        const dailyReservations = quantityClubEvents.filter(event => event.start.date === date)

        const availableProducts = products.map(product => {
            const productReservations = dailyReservations.filter(event => {
                const eventName = event.summary.split("|")[1].trim()
                return eventName === product.title
            })

            const totalReservedQuantity = productReservations.reduce((sum, event) => sum + (event.quantity || 1), 0)

            return {
                ...product,
                availableQuantity: Math.max(product.quantity - totalReservedQuantity, 1),
            };
        });

        return {
            date,
            availableProducts,
        }
    })
}