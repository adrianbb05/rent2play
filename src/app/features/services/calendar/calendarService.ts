import type { Product } from "@/app/features/types/inventory";
import type { Item } from "@/app/hooks/types/EventTypes";
import type { Filters } from "@/app/features/calendar/header/FilterButtons";
import { filterClubsToDisplay, isMatchingFilter } from "./filterUtils";

interface AvailableProducts {
    title: string;
    availableQuantity: number;
}

export interface CalendarEntry {
    date: string;
    availableProducts: AvailableProducts[];
}

export interface ExtendedItem extends Item {
    name: string;
    quantity: number;
}

function clubsAvailability(
    products: Product[],
    calendarEvents: Item[],
    daysToDisplay: Date[],
    filters: Filters
) {
    const formattedDays = daysToDisplay.map(date =>
        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    );

    const clubs = filterClubsToDisplay(products, calendarEvents, filters);

    const quantityClubEvents = clubs.map(event => {
        const splitSummary = event.summary.split("|")[1];
        const [nameWithoutQuantity, quantityStr] = splitSummary.split("Quantity :");
        const quantity = quantityStr ? parseInt(quantityStr.trim()) : 1;
        const trimmedName = nameWithoutQuantity.trim();
        const name =  trimmedName.endsWith("-")
            ? trimmedName.slice(0, -1)
            : trimmedName;

        return {
            ...event,
            name: name.trim(),
            quantity: quantity
        } as ExtendedItem;
    });
    console.log(quantityClubEvents)
    const filteredProducts = products
        .filter(product => isMatchingFilter(product, filters));

    return calculateAvailableProducts(filteredProducts, quantityClubEvents, formattedDays);
}

function calculateAvailableProducts(
    products: Product[],
    quantityClubEvents: ExtendedItem[],
    formattedDays: string[]
): CalendarEntry[] {
    return formattedDays.map(date => {
        const dailyReservations = quantityClubEvents.filter(event => {
            const eventStart = new Date(event.start.date)
            const eventEnd = new Date(event.end.date)
            const current = new Date(date)
            return current >= eventStart && current < eventEnd
        })

        const availableProducts = products.map(product => {
            const reserved = dailyReservations.filter(event =>
                event.name.trim().toLowerCase() === product.title.trim().toLowerCase()
            )
            const totalReserved = reserved.reduce((sum, event) => sum + event.quantity, 0)
            return {
                title: product.title,
                availableQuantity: Math.max(product.quantity - totalReserved, 0),
            }
        })

        return {
            date: date,
            availableProducts: availableProducts,
        }
    })
}

export {
    clubsAvailability,
    calculateAvailableProducts
}
