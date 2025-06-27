import {GoogleOAuthProvider} from "@react-oauth/google";
import {LoginButton} from "./app/hooks/useLogin";
import {Login} from "./app/login/Login";
import {useState} from "react";
import {Rent2PlayTabs} from "@/app/features/Rent2PlayTabs";
import type {CalendarEventResponse} from "@/app/hooks/types/EventTypes";
import { Toaster } from "@/components/ui/sonner";

const clientId = import.meta.env.VITE_CLIENT_ID;

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [calendarContent, setCalendarContent] = useState<CalendarEventResponse | null>(null)


    if (!isAuthenticated) {
        return (
            <>
                <Login setIsAuthenticated={setIsAuthenticated}/>
                <Toaster />
            </>
        );
    }

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <Toaster />
            {calendarContent === null ?
                <div className="min-h-screen bg-gradient-to-r flex items-center justify-center">
                    <LoginButton setCalendarContent={setCalendarContent}/>
                </div> :
                <Rent2PlayTabs calendarContent={calendarContent}/>
            }
        </GoogleOAuthProvider>
    )
}