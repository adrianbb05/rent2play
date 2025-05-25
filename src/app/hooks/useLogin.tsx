import {useGoogleLogin} from '@react-oauth/google';
import axios from 'axios';
import type {Dispatch, SetStateAction} from "react";
import type {Calendar, CalendarListResponse} from "@/app/hooks/types/googleCalendarTypes";

const scope = import.meta.env.VITE_GOOGLE_SCOPE;
const rent2PlayCalendarSummary = import.meta.env.VITE_RENT2PLAY_CALENDAR_SUMMARY;

interface LoginButtonProps {
    setCalendarContent: Dispatch<SetStateAction<any>>;
}

export function LoginButton({setCalendarContent}: LoginButtonProps) {
    const login = useGoogleLogin({
        scope: scope,
        onSuccess: async (tokenResponse) => {
            const accessToken = tokenResponse.access_token;
            const calendarsResponse = await fetchCalendarsList(accessToken)
            const filteredRent2PlayCalendar: Calendar = filterCalendars(calendarsResponse.data)
            const calendarResponse = await fetchCalendarById(filteredRent2PlayCalendar, accessToken)
            setCalendarContent(calendarResponse)
        },
        onError: () => console.error('Login Failed'),
    });

    return <button onClick={() => login()}>Sign in with Google</button>
}

async function fetchCalendarsList(accessToken: string) {
    return await axios.get(
        'https://www.googleapis.com/calendar/v3/users/me/calendarList',
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    )
}

async function fetchCalendarById(calendar: Calendar, accessToken: string) {
    return await axios.get(
        `https://www.googleapis.com/calendar/v3/calendars/${calendar.id}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    )
}
function filterCalendars(calendars: CalendarListResponse) {
    return calendars.items
        .filter(calendar => calendar.summary === rent2PlayCalendarSummary)[0]
}