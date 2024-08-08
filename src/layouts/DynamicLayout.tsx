import { Outlet } from "react-router-dom";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";
import PublicLayout from "./PublicLayout";
import AppLayout from "./AppLayout";

const DynamicLayout = () => {

    const { user, isLoading } = useAuth();

    if (isLoading) return <LoadingSpinner />;

    return user
        ? <AppLayout><Outlet /></AppLayout>
        : <PublicLayout><Outlet /></PublicLayout>;
}

export default DynamicLayout