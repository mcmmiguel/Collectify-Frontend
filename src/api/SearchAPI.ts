import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { itemSchema } from "../types";

export async function searchItems(searchQuery: string) {
    try {
        const url = `/search?q=${searchQuery}`;
        const { data } = await api(url);
        const response = itemSchema.safeParse(data);
        if (response.success) return response.data;
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}