import axios, { isAxiosError } from "axios";
import { API_URL } from "../config";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    data: {
        token: string;
    }
}

export type RegisterPayload = LoginPayload;

export type RegisterResponse = LoginResponse;

export default function getAuthService() {
    const client = axios.create({
        baseURL: `${API_URL}/auth`,
    })

    async function login(loginPayload: LoginPayload): Promise<LoginResponse> {
        try {
            const response = await client.post<LoginResponse>("/login", loginPayload)
            return response.data
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    throw new Error("Credenciales invalidas. Por favor, verifica tu usuario y contraseña.");
                } 
            }
            console.log("error al iniciar sesión");
            throw new Error("Error al conectar con el servidor, por favor intenta nuevamente mas tarde.");
        }
    }

    async function register(registerPayload: RegisterPayload): Promise<RegisterResponse> {
        try {
            const response = await client.post<RegisterResponse>("/register", registerPayload)
            return response.data
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                if (error.response.status === 409) {
                    throw new Error("El usuario ya existe. Por favor, intenta con otro.");
                } 
            }
            throw new Error("Error al conectar con el servidor, por favor intenta nuevamente mas tarde.");
        }
}
    return {
        login,
        register,
    }
}