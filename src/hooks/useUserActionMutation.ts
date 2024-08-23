import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";


const useUserActionMutation = (action: (userId: string) => Promise<string | undefined>) => {

    const queryClient = useQueryClient();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: async (userIds: string[]) => {
            await Promise.allSettled(userIds.map(id => action(id)));
        },
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            toast.success(t("ActionApplied"));
            queryClient.invalidateQueries({ queryKey: ['allUsers'] });
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });
};

export default useUserActionMutation;