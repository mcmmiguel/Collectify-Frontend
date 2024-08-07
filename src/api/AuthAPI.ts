import { isAxiosError } from 'axios';
import { UserLoginForm, UserRegisterForm } from '../types/index';
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

export async function login(formData: UserLoginForm) {
    try {
        const url = '/auth/login';
        const { data } = await api.post<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}