import getAuthService from "@/services/auth-service";
import { clearSessionFromStorage, loadSessionFromStorage, saveSessionToStorage } from "@/utils/storage";
import { router } from "expo-router";
import { decodeJwt } from "jose";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
    id: string
    email: string
    token: string
}

export interface JwtPayload {
    sub: string;
    email: string;
}

interface AuthContextProps {
    user: User | null;
    login: (username: string, password: string) => Promise<string | void>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        loadSessionFromStorage()
        .then((loadedUser) => {
            if (loadedUser) {
                setUser(loadedUser);
            }       
        });
    }, []); 

    useEffect(() => {
        if (user) {
            router.replace("/(tabs)");
        }
    }, [user]); 


    const login = async (username: string, password: string) => {
    const authClient = getAuthService()

    setLoading(true);

    try {
        const loginResponse = await authClient.login({ email: username, password: password });
        const token = loginResponse.data.token;
        const decodedToken = decodeJwt<JwtPayload>(token);

        const loggedInUser: User = {
            id: decodedToken.sub,
            email: decodedToken.email,
            token,
        }

        setUser(loggedInUser);
        await saveSessionToStorage(loggedInUser);

        return token;
    } catch (error) {
        
        throw error;
    } finally {
        setLoading(false);
    }
}

    const logout = () => {
        setUser(null);
        clearSessionFromStorage();
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}






