import {useState} from "react";

interface Props {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export function Login({setIsAuthenticated}: Props) {
    const [password, setPassword] = useState("");
    const predefinedPassword = import.meta.env.VITE_APP_PASSWORD;

    const handleLogin = () => {
        if (password === predefinedPassword) {
            setIsAuthenticated(true);
        } else {
            alert("Incorrect password!");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h1>
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleLogin}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded w-full transition duration-300"
                >
                    Login
                </button>
            </div>
        </div>
    );
}
