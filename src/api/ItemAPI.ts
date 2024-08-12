import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Collection, ItemFormData } from "../types";

type ItemAPI = {
    formData: ItemFormData;
    collectionId: Collection['_id'];
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