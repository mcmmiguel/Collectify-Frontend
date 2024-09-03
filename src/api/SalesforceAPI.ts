import api from "@/lib/axios";
import { SalesforceContactForm } from "../types";
import { isAxiosError } from "axios";

export async function createSalesforceContact(formData: SalesforceContactForm) {
    const url = '/salesforce/create-contact';
    try {
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}