import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { AuthUser } from "../types";
import { getUser } from "@/api/AuthAPI";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type AuthProviderProps = {
    children: ReactNode;
}

export type AuthContextProps = {
    user?: AuthUser;
    error: Error | null;
    isError?: boolean;
    isLoading?: boolean;
    toastError: string | null;
    setToastError: Dispatch<SetStateAction<string>>;
    login: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const errorMessages = ['Unauthorized.', 'No autorizado.'];

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [toastError, setToastError] = useState('');

    const { data, isError, isLoading, error, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (isError) {
            navigate('/auth/login', { replace: true });
        }
    }, [isError, error, navigate, queryClient]);


    const login = async () => {
        const { data: userData, error: refetchError } = await refetch(); //to get user data if i was not authenticated // Avoid the issue logout - index - login - index(public) Must be private;
        if (refetchError && !errorMessages.includes(refetchError.message)) return toast.error(refetchError.message);
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
            toastError,
            setToastError,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}