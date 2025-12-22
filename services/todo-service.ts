import { Task } from "@/constants/types";
import axios, { isAxiosError } from "axios";
import { API_URL } from "../config";

export interface GetTodosResponse {
    success: boolean;
    data: Task[]
    count: number;
}

export default function getTodoService({ token }: { token: string }) {
    const client = axios.create({
        baseURL: API_URL,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

async function getTodos(): Promise<GetTodosResponse> {
    try {
        const response = await client.get<GetTodosResponse>('/todos');
        return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            if (error.response.status === 401) {
                throw new Error("No autorizado. Por favor, inicia sesión nuevamente.");
            } 
        }
        console.log("Error al conectar con el servidor.", error);
        throw new Error("Error al conectar con el servidor, por favor intenta nuevamente mas tarde.");
    }
}   

    async function createTodo(task: Task): Promise<void> {
        try {
            await client.post('/todos', task);
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                if (error.response.status === 401) { 
                    throw new Error("No autorizado. Por favor, inicia sesión nuevamente.");
                }   
            }
            console.log("Error al conectar con el servidor.", error);
            throw new Error("Error al conectar con el servidor, por favor intenta nuevamente mas tarde.");
        }
    }

    async function deleteTodo(id: string): Promise<void> {
        try {
            await client.delete(`/todos/${id}`);
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                if (error.response.status === 401) {    
                    throw new Error("No autorizado. Por favor, inicia sesión nuevamente.");
                }
            }
            console.log("Error al conectar con el servidor.", error);
            throw new Error("Error al conectar con el servidor, por favor intenta nuevamente mas tarde.");
        }
    }

    async function updateTodo(task: Task): Promise<void> {
        try {
            await client.put(`/todos/${task.id}`, task);
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    throw new Error("No autorizado. Por favor, inicia sesión nuevamente.");
                }
            }
            console.log("Error al conectar con el servidor.", error);
            throw new Error("Error al conectar con el servidor, por favor intenta nuevamente mas tarde.");
        }
    }

    return {
        getTodos,
        createTodo,
        deleteTodo,
        updateTodo,
    }
}