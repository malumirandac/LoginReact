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
    console.log("auth-service: API_URL =", API_URL);
    if (isAxiosError(error)) {
        console.log("auth-service: axios error message =", error.message);
        if (error.response) {
            console.log("auth-service: response status =", error.response.status);
            console.log("auth-service: response data =", error.response.data);
            if (error.response.status === 401) {
                throw new Error("Credenciales invalidas. Por favor, verifica tu usuario y contraseña.");
            }
        } else if (error.request) {
            console.log("auth-service: no response received, request =", error.request);
        }
    } else {
        console.log("auth-service: non-axios error =", error);
    }
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