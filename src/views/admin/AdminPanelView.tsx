import { assignAdmin, blockUser, deleteUser, getAllUsers, removeAdmin, unlockUser } from "@/api/AdminAPI";
import UsersTable from "@/components/admin/UsersTable";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import useUserActionMutation from "@/hooks/useUserActionMutation";
import { User } from "@/types/index";
import { UseMutateFunction, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const AdminPanelView = () => {

    const { t } = useTranslation();
    const [selectedUsers, setSelectedUsers] = useState<User['_id'][] | undefined>([]);
    const [dialogConfig, setDialogConfig] = useState({
        title: '',
        message: '',
        isOpen: false,
        onConfirm: () => { },
        onCancel: () => { }
    });

    const { data } = useQuery({
        queryFn: getAllUsers,
        queryKey: ['allUsers'],
    });

    const { mutate: blockUserMutation } = useUserActionMutation(blockUser);
    const { mutate: unlockUserMutation } = useUserActionMutation(unlockUser);
    const { mutate: assignAdminMutation } = useUserActionMutation(assignAdmin);
    const { mutate: removeAdminMutation } = useUserActionMutation(removeAdmin);
    const { mutate: deleteUserMutation } = useUserActionMutation(deleteUser);

    const handleUserAction = (actionName: string, mutationFn: UseMutateFunction<string | undefined, Error, string, unknown>) => {
        setDialogConfig({
            title: `${actionName}`,
            message: t("User_Message", { actionName: actionName.toLowerCase(), users: selectedUsers?.length }),
            isOpen: true,
            onConfirm: () => {
                setDialogConfig(prev => ({ ...prev, isOpen: false }));
                selectedUsers?.forEach(userId => mutationFn(userId));
            },
            onCancel: () => {
                setDialogConfig(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const handleBlockUsers = () => {
        handleUserAction(t("BlockUser_Title"), blockUserMutation);
    };

    const handleUnlockUsers = () => {
        handleUserAction(t("UnlockUser_Title"), unlockUserMutation);
    };

    const handleAssignAdmin = () => {
        handleUserAction(t("AssignAsAdmin_Title"), assignAdminMutation);
    };

    const handleRemoveAdmin = () => {
        handleUserAction(t("AssignAsUser_Title"), removeAdminMutation);
    };

    const handleDeleteUser = () => {
        handleUserAction(t("DeleteUser_Title"), deleteUserMutation);
    };

    return (
        <>
            <h1 className="text-center text-2xl font-medium text-text-light dark:text-text-dark my-5">
                {t("AdminPanel_Title1")}{''}
                <span className="text-secondary-light font-bold">
                    {t("AdminPanel_Title2")}
                </span>
            </h1>

            <div className="flex flex-col">
                <div className="flex gap-3">
                    <button type="button" className="rounded-lg w-10 h-10" onClick={handleBlockUsers}>
                        <svg xmlns="http://www.w3.org/2000/svg" className=" bi bi-person-fill-slash max-w-full max-h-full p-1 hover:bg-warning-light fill-secondary-light hover:fill-white rounded-lg border border-secondary-light hover:border-warning-light transition-colors shadow-sm" viewBox="0 0 16 16">
                            <path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465m-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                        </svg>
                    </button>

                    <button type="button" className="rounded-lg w-10 h-10" onClick={handleUnlockUsers}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-person-fill-check max-w-full max-h-full p-1 hover:bg-success-light fill-secondary-light hover:fill-white rounded-lg border border-secondary-light hover:border-success-light transition-colors shadow-sm" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                        </svg>
                    </button>

                    <button type="button" className="rounded-lg w-10 h-10" onClick={handleAssignAdmin}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-person-fill-up max-w-full max-h-full p-1 hover:bg-primary-light fill-secondary-light hover:fill-white rounded-lg border border-secondary-light hover:border-primary-light transition-colors shadow-sm" viewBox="0 0 16 16">
                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-5.854 1.5 1.5a.5.5 0 0 1-.708.708L13 11.707V14.5a.5.5 0 0 1-1 0v-2.793l-.646.647a.5.5 0 0 1-.708-.708l1.5-1.5a.5.5 0 0 1 .708 0M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                        </svg>
                    </button>

                    <button type="button" className="rounded-lg w-10 h-10" onClick={handleRemoveAdmin}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-person-fill-down max-w-full max-h-full p-1 hover:bg-gray-700 fill-secondary-light hover:fill-white rounded-lg border border-secondary-light hover:border-gray-700 transition-colors shadow-sm" viewBox="0 0 16 16">
                            <path d="M12.5 9a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7m.354 5.854 1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V10.5a.5.5 0 0 0-1 0v2.793l-.646-.647a.5.5 0 0 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                        </svg>
                    </button>

                    <button type="button" className="rounded-lg w-10 h-10" onClick={handleDeleteUser}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-trash3-fill max-w-full max-h-full p-1 hover:bg-error-light fill-secondary-light hover:fill-white rounded-lg border border-secondary-light hover:border-error-light transition-colors shadow-sm" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                        </svg>
                    </button>
                </div>

                <UsersTable usersList={data} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />

                <ConfirmationDialog
                    title={dialogConfig.title}
                    message={dialogConfig.message}
                    isOpen={dialogConfig.isOpen}
                    onClose={dialogConfig.onCancel}
                    onConfirm={dialogConfig.onConfirm}
                />

            </div>
        </>
    )
}

export default AdminPanelView;