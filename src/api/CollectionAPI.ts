import api from "@/lib/axios";
import { allCollectionsSchema, CollectionFormData } from "../types";
import axios, { isAxiosError } from "axios";

export async function createCollection(formData: CollectionFormData) {
    try {
        const url = '/collections/create-collection';
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getAllCollections() {
    try {
        const url = '/public/collections';
        const { data } = await api(url);
        const response = allCollectionsSchema.safeParse(data);
        return response;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function uploadImageToCloudinary(file: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUDNAME}/image/upload`;
    const response = await axios.post(url, formData);
    return response.data.secure_url;
}