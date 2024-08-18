import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { fullCollectionSchema } from "../types";
import { z } from "zod";

export async function getCollectionsByOwner() {
    const url = '/collections/user';
    try {
        const { data } = await api(url);
        const response = z.array(fullCollectionSchema).safeParse(data);
        console.log(response);
        if (response.success) return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}