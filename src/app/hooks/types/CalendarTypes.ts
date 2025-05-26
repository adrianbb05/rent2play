export interface CalendarListResponse {
    kind: string
    etag: string
    nextSyncToken: string
    items: Calendar[]
}

export interface Calendar {
    kind: string
    etag: string
    id: string
    summary: string
    description?: string
    timeZone: string
    colorId: string
    backgroundColor: string
    foregroundColor: string
    selected: boolean
    accessRole: string
    defaultReminders: DefaultReminder[]
    conferenceProperties: ConferenceProperties
    notificationSettings?: NotificationSettings
    primary?: boolean
    summaryOverride?: string
}

export interface DefaultReminder {
    method: string
    minutes: number
}

interface ConferenceProperties {
    allowedConferenceSolutionTypes: string[]
}

interface NotificationSettings {
    notifications: Notification[]
}

interface Notification {
    type: string
    method: string
}