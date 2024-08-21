import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Collection, Item, ItemFormData, itemSchema, itemWithCollectionSchema } from "../types";
import { z } from "zod";

type ItemAPI = {
    formData: ItemFormData;
    collectionId: Collection['_id'];
    itemId: Item['_id'];
}

export async function createItem({ formData, collectionId }: Pick<ItemAPI, 'formData' | 'collectionId'>) {
    try {
        const url = `/collections/${collectionId}/items`;
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getLatestItems() {
    try {
        const url = `public/collections/latest-items`;
        const { data } = await api(url);
        const response = z.array(itemWithCollectionSchema).safeParse(data);
        if (response.success) return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getMostPopularItems() {
    try {
        const url = `public/collections/popular-items`;
        const { data } = await api(url);
        const response = z.array(itemWithCollectionSchema).safeParse(data);
        if (response.success) return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getItemById({ collectionId, itemId }: Pick<ItemAPI, 'collectionId' | 'itemId'>) {
    try {
        const url = `public/collections/${collectionId}/items/${itemId}`;
        const { data } = await api(url);
        const response = itemSchema.safeParse(data);
        if (response.success) return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateItem({ collectionId, itemId, formData }: Pick<ItemAPI, 'collectionId' | 'itemId' | 'formData'>) {
    try {
        const url = `collections/${collectionId}/items/${itemId}`;
        const { data } = await api.put<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteItem({ collectionId, itemId }: Pick<ItemAPI, 'collectionId' | 'itemId'>) {
    try {
        const url = `collections/${collectionId}/items/${itemId}`;
        const { data } = await api.delete<string>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}