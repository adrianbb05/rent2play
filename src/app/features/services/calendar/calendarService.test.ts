import {
    clubsAvailability,
} from './calendarService';
import type {Product} from "@/app/features/types/inventory";
import type {Item} from "@/app/hooks/types/EventTypes";
import type {Filters} from "@/app/features/calendar/header/FilterButtons";
import {generateDays} from "@/app/features/services/calendar/dateUtils";

const mockProducts = [
    {title: 'Callaway Rogue (Men - Graphite - Right Hand)', quantity: 5} as Product,
];

const customEvents = [
    {
        summary: '#1230 | Callaway Rogue (Men - Graphite - Right Hand) - Quantity : 2 | Fulfilled',
        start: {date: '2024-06-10'},
        end: {date: '2024-06-10'}
    } as Item,
    {
        summary: '#1231 | Callaway Rogue (Men - Graphite - Right Hand) | Fulfilled',
        start: {date: '2024-06-10'},
        end: {date: '2024-06-10'}
    } as Item
]

const mockFilters = {
    brand: 'none',
    gender: 'none',
    material: 'none',
    hand: 'none'
} as Filters;

describe('calendarService', () => {
    test('clubsAvailability calculates available products per day', () => {
        const days = generateDays(new Date('2024-06-10'), 'week');
        const result = clubsAvailability(mockProducts, customEvents, days, mockFilters);
        expect(result[0].availableProducts[0].availableQuantity).toBe(2);
    });
});