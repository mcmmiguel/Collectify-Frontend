import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";
import { useAuth } from "@/hooks/useAuth";
import { ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const AppLayout = ({ children }: { children: ReactNode }) => {

    const { t } = useTranslation();
    const { toastError, setToastError } = useAuth();

    useEffect(() => {
        if (toastError) {
            toast.error(toastError);
            setToastError('');
        }
    }, [toastError, setToastError]);

    return (
        <>
            <header className="py-5 bg-background-light dark:bg-background-dark border-b-border-dark">
                <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-40 flex justify-center lg:block">
                        <Link to={'/'}>
                            <Logo />
                        </Link>
                    </div>

                    <NavMenu />
                </div>
            </header>

            <section className="max-w-screen-xl mx-auto mt-5 p-5 dark:bg-background-dark">
                {children}
            </section>

            <footer className="py-5">
                <p className="text-center text-text-light dark:text-text-dark">{t("Footer") + new Date().getFullYear()}</p>
            </footer>

            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}
export default AppLayout