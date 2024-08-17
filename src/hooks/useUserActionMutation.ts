import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";


const useUserActionMutation = (action: (userId: string) => Promise<string | undefined>) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: action,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            toast.success('Action applied successfully');
            queryClient.invalidateQueries({ queryKey: ['allUsers'] });
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });
};

export default useUserActionMutation;