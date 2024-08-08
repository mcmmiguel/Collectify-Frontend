import { createContext, ReactNode } from "react";
import { User } from "../types";
import { getUser } from "@/api/AuthAPI";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type AuthProviderProps = {
    children: ReactNode;
}

export type AuthContextProps = {
    user?: User;
    error: Error | null;
    isError?: boolean;
    isLoading?: boolean;
    login: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data, isError, isLoading, error, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    const login = async () => {
        const { data: userData, error: refetchError } = await refetch(); //to get user data if i was not authenticated // Avoid the issue logout - index - login - index(public) Must be private;
        if (refetchError && refetchError.message !== 'Unauthorized') return toast.error(refetchError.message);
        if (userData) return navigate('/');
    }

    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN');
        navigate('/auth/login', { replace: true });
        queryClient.removeQueries({ queryKey: ['user'] });
    };

    return (
        <AuthContext.Provider value={{
            user: data,
            error,
            isError,
            isLoading,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}