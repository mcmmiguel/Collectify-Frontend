import { isAxiosError } from 'axios';
import { authUserSchema, UserLoginForm, UserRegisterForm } from '../types/index';
import api from '@/lib/axios';

export async function createAccount(formData: UserRegisterForm) {
    try {
        const url = '/auth/register';
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function loginAPI(formData: UserLoginForm) {
    try {
        const url = '/auth/login';
        const { data } = await api.post<string>(url, formData);
        localStorage.setItem('AUTH_TOKEN', data);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getUser() {
    try {
        const url = '/auth/user';
        const { data } = await api<string>(url);
        const response = authUserSchema.safeParse(data);
        if (response.success) return response.data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}