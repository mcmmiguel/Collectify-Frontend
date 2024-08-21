import api from "@/lib/axios";
import { Collection, CollectionFormData, fullCollectionSchema, ownerCategoryCollection } from "../types";
import axios, { isAxiosError } from "axios";
import { z } from "zod";

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
        const response = z.array(ownerCategoryCollection).safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getLargestCollections() {
    try {
        const url = '/public/collections/largest-collections';
        const { data } = await api(url);
        const response = z.array(ownerCategoryCollection).safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getFullCollection(id: Collection['_id']) {
    try {
        const url = `/public/collections/${id}`;
        const { data } = await api(url);
        const response = fullCollectionSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

type CollectionApiType = {
    formData: CollectionFormData;
    collectionId: Collection['_id'];
}

export async function updateCollection({ formData, collectionId }: CollectionApiType) {
    try {
        const url = `/collections/${collectionId}`;
        const { data } = await api.put<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteCollection(collectionId: Collection['_id']) {
    try {
        const url = `/collections/${collectionId}`;
        const { data } = await api.delete<string>(url);
        return data;
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