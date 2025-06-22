import type { Filters } from "@/app/features/calendar/header/FilterButtons";
import type { Item } from "@/app/hooks/types/EventTypes";
import type { Product } from "@/app/features/types/inventory";

export function parseEventDetails(summary: string): Filters {
    const [, details] = summary.split("|").map(part => part.trim());
    const [brandModel, attributes] = details.split("(").map(part => part.trim());
    const [brand] = brandModel.split(" ");
    const [gender, material, hand] = attributes.replace(")", "").split(" - ").map(attr => attr.trim());

    return {
        brand: brand.trim(),
        gender: gender.trim(),
        material: material.trim(),
        hand: hand.trim(),
    };
}

export function parseProductDetails(title: string): Filters {
    const [brandModel, attributes] = title.split("(").map(part => part.trim());
    const [brand] = brandModel.split(" ");
    const [gender, material, hand] = attributes.replace(")", "").split(" - ").map(attr => attr.trim());

    return {
        brand: brand.trim(),
        gender: gender.trim(),
        material: material.trim(),
        hand: hand.trim(),
    };
}

export function isMatchingFilter(
    item: Item | Product,
    filters: Filters,
): boolean {
    let details: Filters;
    if ("summary" in item) {
        details = parseEventDetails((item as Item).summary);
    } else {
        details = parseProductDetails((item as Product).title);
    }

    const activeFilterKeys = Object.keys(filters).filter(
        key => filters[key as keyof Filters] !== "none"
    );

    if (activeFilterKeys.length === 0) {
        return true;
    } else if (activeFilterKeys.length === 1) {
        const key = activeFilterKeys[0] as keyof Filters;
        return filters[key] === details[key];
    } else {
        return activeFilterKeys.every(
            key => filters[key as keyof Filters] === details[key as keyof typeof details]
        );
    }
}

export function filterClubsToDisplay(
    products: Product[],
    calendarEvents: Item[],
    filters: Filters
): Item[] {
    const isMatchingProduct = (event: Item) => {
        const clubNameAndQuantity = event.summary.split("|")[1].trim();
        const clubNameWithoutQuantity = clubNameAndQuantity.split("Quantity :")[0].trim();
        const clubName = clubNameWithoutQuantity.endsWith("-")
            ? clubNameWithoutQuantity.slice(0, -1)
            : clubNameWithoutQuantity;
        return products.some(product => product.title.trim() === clubName.trim());
    };

    return calendarEvents
        .filter(isMatchingProduct)
        .filter(event => isMatchingFilter(event, filters));
}

