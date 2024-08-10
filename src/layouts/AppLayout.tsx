import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

const AppLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <header className="py-5 bg-background-light dark:bg-background-dark border-b-border-dark">
                <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-40 flex justify-center lg:block">
                        <Logo />
                    </div>

                    <NavMenu />
                </div>
            </header>

            <section className="max-w-screen-xl mx-auto mt-5 p-5 dark:bg-background-dark">
                {children}
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