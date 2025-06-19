import type {CalendarView} from "@/app/features/types/calendarTypes";
import type {Product} from "@/app/features/types/inventory";
import type {CalendarEventResponse, Item} from "@/app/hooks/types/EventTypes";
import type {Filters} from "@/app/features/calendar/header/FilterButtons";

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

interface AvailableProducts {
    title: string
    availableQuantity: number
}

export interface CalendarEntry {
    date: string
    availableProducts: AvailableProducts[]
}

export interface ExtendedItem extends Item {
    name: string
    quantity: number
}

function parseEventDetails(summary: string): Filters {
    const [, details] = summary.split("|").map(part => part.trim())
    const [brandModel, attributes] = details.split("(").map(part => part.trim())
    const [brand] = brandModel.split(" ")
    const [gender, material, hand] = attributes.replace(")", "").split(" - ").map(attr => attr.trim())

    return {
        brand: brand.trim(),
        gender: gender.trim(),
        material: material.trim(),
        hand: hand.trim(),
    }
}

function parseProductDetails(title: string): Filters {
    const [brandModel, attributes] = title.split("(").map(part => part.trim())
    const [brand] = brandModel.split(" ")
    const [gender, material, hand] = attributes.replace(")", "").split(" - ").map(attr => attr.trim())

    return {
        brand: brand.trim(),
        gender: gender.trim(),
        material: material.trim(),
        hand: hand.trim(),
    }
}

function isMatchingFilter(
    item: Item | Product,
    filters: Filters,
): boolean {
    let details: Filters
    if ("summary" in item) {
        details = parseEventDetails((item as Item).summary)
    } else {
        details = parseProductDetails((item as Product).title)
    }

    const activeFilterKeys = Object.keys(filters).filter(
        key => filters[key as keyof Filters] !== "none"
    )

    if (activeFilterKeys.length === 0) {
        return true
    } else if (activeFilterKeys.length === 1) {
        const key = activeFilterKeys[0] as keyof Filters
        return filters[key] === details[key]
    } else {
        return activeFilterKeys.every(
            key => filters[key as keyof Filters] === details[key as keyof typeof details]
        )
    }
}

function filterClubsToDisplay(
    products: Product[],
    calendarEvents: CalendarEventResponse,
    filters: Filters
): Item[] {
    const isMatchingProduct = (event: Item) => {
        const clubNameAndQuantity = event.summary.split("|")[1].trim()
        const clubNameWithoutQuantity = clubNameAndQuantity.split("Quantity :")[0].trim()
        const clubName = clubNameWithoutQuantity.endsWith("-")
            ? clubNameWithoutQuantity.slice(0, -1)
            : clubNameWithoutQuantity
        return products.some(product => product.title === clubName)
    }

    return calendarEvents.items
        .filter(isMatchingProduct)
        .filter(event => isMatchingFilter(event, filters))
}

function clubsAvailability(
    products: Product[],
    calendarEvents: CalendarEventResponse,
    daysToDisplay: Date[],
    filters: Filters
) {
    const formattedDays = daysToDisplay.map(date =>
        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    )

    const clubs = filterClubsToDisplay(products, calendarEvents, filters)

    const quantityClubEvents = clubs.map(event => {
        const splitSummary = event.summary.split("|")[1]
        const [name, quantityStr] = splitSummary.split("Quantity :")
        const quantity = quantityStr ? parseInt(quantityStr.trim()) : 1

        return {
            ...event,
            name: name,
            quantity: quantity
        } as ExtendedItem
    })

    const filteredProducts = products
        .filter(product => isMatchingFilter(product, filters))

    return calculateAvailableProducts(filteredProducts, quantityClubEvents, formattedDays)
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
            return current >= eventStart && current <= eventEnd
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
    filterClubsToDisplay,
    clubsAvailability,
    calculateAvailableProducts
}