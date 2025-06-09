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
        for (let month = 0; month < 12; month++) {
            const daysInMonth = getDaysInMonth(startDate)
            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(startDate.getFullYear(), month, day)
                days.push(date)
            }
        }
    }

    return days
}

export interface CalendarEntry {
    date: string;
    availableProducts: { title: string; availableQuantity: number }[];
}

export interface ExtendedItem extends Item {
    name: string;
    quantity: number;
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
        const clubNameAndQuantity = event.summary.split("|")[1].trim()
        const clubNameWithoutQuantity = clubNameAndQuantity.split("Quantity :")[0].trim()
        let clubName = clubNameWithoutQuantity
        if (clubNameWithoutQuantity.charAt(clubNameWithoutQuantity.length - 1) === "-") {
            clubName = clubNameWithoutQuantity.slice(0, -1)
        }
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
            name: content[0],
            quantity: quantity
        } as ExtendedItem
    })


    return calculateAvailableProducts(products, quantityClubEvents, formattedDaysToDisplay)
}

function calculateAvailableProducts(
    products: Product[],
    quantityClubEvents: ExtendedItem[],
    formattedDaysToDisplay: string[]
): CalendarEntry[] {
    return formattedDaysToDisplay.map(date => {
        const dailyReservations = quantityClubEvents.filter(event => {
            const eventStartDate = new Date(event.start.date);
            const eventEndDate = new Date(event.end.date);
            const currentDate = new Date(date);

            return currentDate >= eventStartDate && currentDate <= eventEndDate;
        });

        const availableProducts = products.map(product => {
            const productReservations = dailyReservations.filter(event => {
                return event.name.trim().toLowerCase() === product.title.trim().toLowerCase()
            })

            const totalReservedQuantity = productReservations.reduce((sum, event) => sum + event.quantity, 0)
            
            return {
                ...product,
                availableQuantity: Math.max(product.quantity - totalReservedQuantity, 0),
            }
        })

        return {
            date,
            availableProducts,
        }
    })
}