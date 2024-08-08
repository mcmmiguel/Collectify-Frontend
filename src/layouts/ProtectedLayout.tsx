import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useEffect } from 'react';
import AppLayout from './AppLayout';

const ProtectedLayout = () => {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !user) {
            navigate('/auth/login', { replace: true });
        }
    }, [isLoading, user, navigate]);

    if (isLoading) return <LoadingSpinner />;

    return user && <AppLayout><Outlet /></AppLayout>;
};

export default ProtectedLayout;