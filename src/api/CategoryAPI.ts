import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { categorySchema } from "../types";
import { z } from "zod";

export async function getCategories() {
    try {
        const url = '/public/collections/categories';
        const { data } = await api(url);
        const response = z.array(categorySchema).safeParse(data);
        if (response.success) return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}