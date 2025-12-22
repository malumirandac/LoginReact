import { API_URL } from "@/config";
import axios from "axios";

interface UploadResponse {
    success: boolean;
    data: {
        url: string;
        key: string;
        size: number;
        contentType: string;
    };
}

export default function getImageUploadService({ token }: { token: string }) {
    const client = axios.create({
        baseURL: API_URL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    function handleServiceError(error: unknown): never {
        console.error("Error conectando al servidor", error);
        throw new Error("Error al conectar con el servidor, por favor intenta nuevamente mas tarde.");
    }

    async function uploadImage(imageData: FormData): Promise<string> {
        try {
            const response = await client.post<UploadResponse>('/images', imageData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.data.url;
        } catch (error) {
            handleServiceError(error);
        }
    }

    return {
        uploadImage,
    }
}