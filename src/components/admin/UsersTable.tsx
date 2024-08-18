import { User } from "@/types/index";
import { calculateDaysDifference } from "@/utils/dates";
import { useTranslation } from "react-i18next";

type UsersTableProps = {
    usersList: User[] | undefined;
    selectedUsers: User['_id'][] | undefined;
    setSelectedUsers: React.Dispatch<React.SetStateAction<User['_id'][] | undefined>>;
}

const UsersTable = ({ usersList, selectedUsers, setSelectedUsers }: UsersTableProps) => {

    const { t } = useTranslation();

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedUsers(usersList?.map(user => user._id));
        } else {
            setSelectedUsers([]);
        }
    };

    const handleSelectUser = (userId: User['_id']) => {
        setSelectedUsers(prevSelectedUsers => {
            if (prevSelectedUsers?.includes(userId)) {
                return prevSelectedUsers.filter(id => id !== userId);
            } else {
                return [...prevSelectedUsers!, userId];
            }
        });
    };

    return (
        <table className="mt-5 border border-border-light rounded-lg border-separate" style={{ borderSpacing: "0px 10px" }}>
            <thead>
                <tr className="text-center">
                    <td className='mx-5 my-2 border-b border-border-light'>
                        <input
                            type="checkbox"
                            id='masterCheckbox'
                            onChange={handleSelectAll}
                            checked={usersList?.length === selectedUsers?.length}
                        />
                    </td>

                    <th className="px-5 py-3 text-text-light dark:text-text-dark border-b border-border-light">ID</th>
                    <th className="px-5 py-3 text-text-light dark:text-text-dark border-b border-border-light">{t("AdminPanel_TableName")}</th>
                    <th className="px-5 py-3 text-text-light dark:text-text-dark border-b border-border-light">{t("AdminPanel_TableEmail")}</th>
                    <th className="px-5 py-3 text-text-light dark:text-text-dark border-b border-border-light">{t("AdminPanel_TableTime")}</th>
                    <th className="px-5 py-3 text-text-light dark:text-text-dark border-b border-border-light">{t("AdminPanel_TableAccess")}</th>
                    <th className="px-5 py-3 text-text-light dark:text-text-dark border-b border-border-light">{t("AdminPanel_TableStatus")}</th>
                </tr>
            </thead>
            <tbody>
                {usersList?.map(user => (
                    <tr key={user._id} className="text-center">
                        <td>
                            <input
                                className='mx-5 my-2'
                                type="checkbox"
                                name={user._id.toString()}
                                id={user._id.toString()}
                                onChange={() => handleSelectUser(user._id)}
                                checked={selectedUsers?.includes(user._id)}
                            />
                        </td>
                        <td className="py-3 text-text-light dark:text-text-dark">{user._id}</td>
                        <td className="py-3 text-text-light dark:text-text-dark">{user.name}</td>
                        <td className="py-3 text-text-light dark:text-text-dark">{user.email}</td>
                        <td className='py-3 text-text-light dark:text-text-dark'>{calculateDaysDifference(user.createdAt)}</td>
                        <td className="py-3 text-text-light dark:text-text-dark">{user.isAdmin ? t("AdminPanel_Admin") : t("AdminPanel_User")}</td>
                        <td className={`text-center ${user.isBlocked ? 'text-error-light' : 'text-success-light'}`}>{user.isBlocked ? t("AdminPanel_Blocked") : t("AdminPanel_Active")}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default UsersTable;