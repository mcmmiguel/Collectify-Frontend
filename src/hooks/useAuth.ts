import { getUser } from "@/api/AuthAPI"
import { useQuery } from "@tanstack/react-query"

export const useAuth = () => {

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false,
    })

    return {
        data,
        error,
        isError,
        isLoading,
    }
}