import type {DefaultReminder} from "@/app/hooks/types/CalendarTypes";

export interface CalendarEventResponse {
    kind: string
    etag: string
    summary: string
    description: string
    updated: string
    timeZone: string
    accessRole: string
    defaultReminders: DefaultReminder[]
    nextSyncToken: string
    items: Item[]
}

export interface Item {
    kind: string
    etag: string
    id: string
    status: string
    htmlLink: string
    created: string
    updated: string
    summary: string
    description: string
    location: string
    creator: Creator
    organizer: Organizer
    start: Start
    end: End
    iCalUID: string
    sequence: number
    attendees?: Attendee[]
    reminders: Reminders
    eventType: string
    quantity ?: number
}

export interface Creator {
    email: string
    displayName: string
    self: boolean
}

export interface Organizer {
    email: string
    displayName: string
    self: boolean
}

export interface Start {
    date: string
}

export interface End {
    date: string
}

export interface Attendee {
    email: string
    displayName: string
    responseStatus: string
}

export interface Reminders {
    useDefault: boolean
}
