import { useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LoadingSpinner from "@/components/LoadingSpinner";
import AppLayout from "./AppLayout";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";

const AdminLayout = () => {
    const { user, isLoading, setToastError, isError } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if ((user && !user.isAdmin)) {
            setToastError(t("Error_AdminAccess"));
            navigate('/', { replace: true });
        }
    }, [user, navigate, setToastError]);

    useLayoutEffect(() => {
        if (isError) {
            navigate('/', { replace: true });
        }
    }, [user, isError, navigate, setToastError])

    if (isLoading) return <LoadingSpinner />;

    if (user?.isAdmin) return <AppLayout> <Outlet /> </AppLayout>;
}

export default AdminLayout;