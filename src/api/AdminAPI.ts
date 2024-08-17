import api from "@/lib/axios";
import { allUsersSchema, User } from "../types";
import { isAxiosError } from "axios";

export async function getAllUsers() {
    try {
        const url = '/admin';
        const { data } = await api(url);
        const response = allUsersSchema.safeParse(data);
        if (response.success) return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function blockUser(userId: User['_id']) {
    try {
        const url = `/admin/block-user/${userId}`;
        const { data } = await api.patch<string>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function unlockUser(userId: User['_id']) {
    try {
        const url = `/admin/unlock-user/${userId}`;
        const { data } = await api.patch<string>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function assignAdmin(userId: User['_id']) {
    try {
        const url = `/admin/assign-admin/${userId}`;
        const { data } = await api.patch<string>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function removeAdmin(userId: User['_id']) {
    try {
        const url = `/admin/remove-admin/${userId}`;
        const { data } = await api.patch<string>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteUser(userId: User['_id']) {
    try {
        const url = `/admin/${userId}`;
        const { data } = await api.delete<string>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}