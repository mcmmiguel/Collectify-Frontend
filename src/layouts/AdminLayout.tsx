import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/LoadingSpinner";
import AppLayout from "./AppLayout";
import { useAuth } from "@/hooks/useAuth";

const AdminLayout = () => {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !user?.isAdmin) {
            toast.error('Forbidden. You dont have admin access.');
            navigate('/', { replace: true });
        }
    }, [isLoading, user, navigate]);

    if (isLoading) return <LoadingSpinner />;

    return user && <AppLayout><Outlet /></AppLayout>;
}

export default AdminLayout;