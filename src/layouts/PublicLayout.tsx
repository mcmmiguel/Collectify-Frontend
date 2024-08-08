import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import Logo from "@/components/Logo";
import { useTheme } from "@/hooks/useTheme";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const PublicLayout = ({ children }: { children: ReactNode }) => {

    const { enabledDarkMode, setEnabledDarkMode } = useTheme();

    return (
        <>
            <header className="py-5 bg-background-light dark:bg-background-dark border-b-border-dark">
                <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-40 flex justify-center lg:block">
                        <Logo />
                    </div>

                    <div className="flex justify-center">
                        <nav className="flex flex-col justify-center">
                            <p className="text-text-light dark:text-text-dark">Start to create your collections... for free</p>
                            <div className="flex justify-center gap-3">
                                <Link to={'/auth/register'} className="text-link-light hover:text-link-dark">Register</Link>
                                <p className="text-text-light dark:text-text-dark"> | </p>
                                <Link to={'/auth/login'} className="text-link-light hover:text-link-dark">Log In</Link>
                            </div>
                        </nav>

                        <div className="flex items-center justify-end w-14 gap-1">
                            <Menu>
                                <MenuButton>
                                    {enabledDarkMode
                                        ? <MoonIcon width={25} height={25} color="#3b82f6" />
                                        : <SunIcon width={25} height={25} color="#3b82f6" />
                                    }
                                </MenuButton>
                                <MenuItems anchor="bottom" className="bg-gray-light dark:bg-border-dark mt-2 p-2 rounded-lg">
                                    <MenuItem>
                                        <button className="flex gap-2 w-full data-[focus]:bg-blue-100 dark:data-[focus]:bg-background-dark px-2 py-1 rounded-lg text-text-light dark:text-text-dark transition-colors" onClick={() => setEnabledDarkMode(false)}>
                                            <SunIcon width={25} height={25} color="#3b82f6" />Light
                                        </button>
                                    </MenuItem>
                                    <MenuItem>
                                        <button className="flex gap-2 w-full data-[focus]:bg-blue-100 dark:data-[focus]:bg-background-dark px-2 py-1 rounded-lg text-text-light dark:text-text-dark transition-colors" onClick={() => setEnabledDarkMode(true)}>
                                            <MoonIcon width={25} height={25} color="#3b82f6" /> Dark
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>

                    </div>

                </div>
            </header>

            <section className="max-w-screen-xl mx-auto mt-10 p-5 dark:bg-background-dark">
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
export default PublicLayout