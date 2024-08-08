import { Outlet, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";
import { useEffect, useState } from "react";
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from "@/components/LoadingSpinner";
import { ToastContainer } from "react-toastify";

const AppLayout = () => {

    const [enabledDarkMode, setEnabledDarkMode] = useState(false);

    useEffect(() => {
        if (enabledDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [enabledDarkMode]);

    const navigate = useNavigate();

    const { data, isLoading, isError, error } = useAuth();

    useEffect(() => {
        if (isError) {
            const errorMessage = error?.message === 'Unauthorized' ? undefined : error?.message;
            navigate('/auth/login', { state: { error: errorMessage } });
        }
    }, [isError, error, navigate]);

    if (isLoading) return <LoadingSpinner />;

    if (data) return (
        <>
            <header className="bg-background-light dark:bg-background-dark border-b-border-dark">
                <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-64 flex justify-center lg:block">
                        <Logo darkMode={enabledDarkMode ? true : false} />
                    </div>

                    <NavMenu checked={enabledDarkMode} onChange={setEnabledDarkMode} name={data.name} />
                </div>
            </header>

            <hr />

            <section className="max-w-screen-xl mx-auto mt-10 p-5 dark:bg-background-dark">
                <Outlet />
            </section>

            <footer className="py-5">
                <p className="text-center text-text-light dark:text-text-dark">All rights reserved. {new Date().getFullYear()}</p>
            </footer>

            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}
export default AppLayout