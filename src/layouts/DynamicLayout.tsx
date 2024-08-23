import { Outlet } from "react-router-dom";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";
import PublicLayout from "./PublicLayout";
import AppLayout from "./AppLayout";

const DynamicLayout = () => {

    const { user, isLoading, isError } = useAuth();

    if (isLoading) return <LoadingSpinner />;

    if (isError) return <PublicLayout><Outlet /></PublicLayout>;

    if (user) return <AppLayout><Outlet /></AppLayout>
}

export default DynamicLayout