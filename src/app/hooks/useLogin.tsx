import {useEffect} from 'react';
import {useGoogleLogin} from '@react-oauth/google';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import type {Dispatch, SetStateAction} from "react";
import type {Calendar, CalendarListResponse} from "@/app/hooks/types/CalendarTypes";
import type {CalendarEventResponse} from "@/app/hooks/types/EventTypes";
import CryptoJS from 'crypto-js';

const scope = import.meta.env.VITE_GOOGLE_SCOPE;
const rent2PlayCalendarSummary = import.meta.env.VITE_RENT2PLAY_CALENDAR_SUMMARY;
const LOCAL_STORAGE_TOKEN_KEY = 'encrypted_token';
const googleSecretEncryptionKey = import.meta.env.VITE_GOOGLE_SECRET_ENCRYPTION_KEY;

interface LoginButtonProps {
    setCalendarContent: Dispatch<SetStateAction<CalendarEventResponse | null>>;
}

export function LoginButton({setCalendarContent}: LoginButtonProps) {
    useEffect(() => {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
        if (accessToken) {
            fetchCalendarData(accessToken, setCalendarContent);
        }
    }, [setCalendarContent]);

    const login = useGoogleLogin({
        scope: scope,
        onSuccess: async (tokenResponse) => {
            const accessToken = tokenResponse.access_token;
            // Encrypt the access token before saving
            const encryptedToken = CryptoJS.AES.encrypt(accessToken, googleSecretEncryptionKey).toString();
            localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, encryptedToken);
            fetchCalendarData(accessToken, setCalendarContent);
        },
        onError: () => console.error('Login Failed'),
    });

    if (localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)) {
        return null;
    }

    return (
        <button
            onClick={() => login()}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200"
        >
            <FcGoogle className="text-xl" />
            <span>Sign in with Google</span>
        </button>
    );
}

async function fetchCalendarData(accessToken: string, setCalendarContent: Dispatch<SetStateAction<CalendarEventResponse | null>>) {
    try {
        const calendarsResponse = await fetchCalendarsList(accessToken);
        const filteredRent2PlayCalendar: Calendar = filterCalendars(calendarsResponse.data);
        const calendarResponse = await fetchCalendarById(filteredRent2PlayCalendar, accessToken);
        const calendarEventResponse = calendarResponse.data as CalendarEventResponse;
        setCalendarContent(calendarEventResponse);
    } catch (error) {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
        setCalendarContent(null);
        console.error('Failed to fetch calendar data', error);
    }
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
        `https://www.googleapis.com/calendar/v3/calendars/${calendar.id}/events`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
}

function filterCalendars(calendars: CalendarListResponse) {
    return calendars.items
        .filter(calendar => calendar.summary === rent2PlayCalendarSummary)[0]
}