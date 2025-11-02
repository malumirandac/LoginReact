import { createContext, useContext, useState } from "react";
//import { Alert } from "react-native";

interface User {
    id: string;
    name: string;
}

//tenemos una interfaz(tipo de dato) de typescript
interface AuthContextProps {
    user: User | null;
    login: (username: string, password: string) => void;
    logout: () => void;
}

//indicamos un arreglo de posibles usuarios
const EXPECTED_USERS = [
    { id: '1', name: 'user', password: '1234'},
    { id: '2', name: 'admin', password: 'admin'},
]

//este es el estado inicial del contexto, donde se indica que tendrá una interfaz AuthContextProps o nada
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

//creamos función para manejar el prop children
//AuthProvider es un componente
export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    const login = (username: string, password: string) => {
        const foundUser = EXPECTED_USERS.find( u => u.name === username && u.password === password);
    
        if (foundUser) {
            setUser({ id: foundUser.id, name: foundUser.name });
        } else {
            throw new Error("Login Failed: Invalid username or password");
        }
    }

    const logout = () => {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

//utilizamos un hook
export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}






