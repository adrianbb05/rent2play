import {useGoogleLogin} from '@react-oauth/google';
import axios from 'axios';
import type {Dispatch, SetStateAction} from "react";

const scope = import.meta.env.VITE_GOOGLE_SCOPE;

interface LoginButtonProps {
    setCalendarContent: Dispatch<SetStateAction<any>>;
}
export function LoginButton({setCalendarContent}: LoginButtonProps) {
    const login = useGoogleLogin(
        {
        scope: scope,
        onSuccess: async (tokenResponse) => {
            const accessToken = tokenResponse.access_token;
            const events = await axios.get(

                'https://www.googleapis.com/calendar/v3/calendars/primary/events',
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setCalendarContent(events.data);
        },
        onError: () => console.log('Login Failed'),
    });

    return <button onClick={() => login()}>Sign in with Google</button>;
};
