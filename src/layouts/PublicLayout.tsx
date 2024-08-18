import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { LanguageIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import Logo from "@/components/Logo";
import { useTheme } from "@/hooks/useTheme";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import useLanguage from "@/hooks/useLanguage";

const PublicLayout = ({ children }: { children: ReactNode }) => {

    const { t } = useTranslation();
    const { setEnglishEnabled } = useLanguage();
    const { enabledDarkMode, setEnabledDarkMode } = useTheme();

    return (
        <>
            <header className="py-5 bg-background-light dark:bg-background-dark border-b-border-dark">
                <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-40 flex justify-center lg:block">
                        <Link to={'/'}>
                            <Logo />
                        </Link>
                    </div>

                    <div className="flex justify-center">
                        <nav className="flex flex-col justify-center">
                            <p className="text-text-light dark:text-text-dark">{t("PublicLayout_ActionText")}</p>
                            <div className="flex justify-center gap-3">
                                <Link to={'/auth/register'} className="text-link-light hover:text-link-dark">{t("PublicLayout_RegisterButton")}</Link>
                                <p className="text-text-light dark:text-text-dark"> | </p>
                                <Link to={'/auth/login'} className="text-link-light hover:text-link-dark">{t("PublicLayout_LoginButton")}</Link>
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
                                            <SunIcon width={25} height={25} color="#3b82f6" />{''}
                                            {t("ThemeLight_Text")}
                                        </button>
                                    </MenuItem>
                                    <MenuItem>
                                        <button className="flex gap-2 w-full data-[focus]:bg-blue-100 dark:data-[focus]:bg-background-dark px-2 py-1 rounded-lg text-text-light dark:text-text-dark transition-colors" onClick={() => setEnabledDarkMode(true)}>
                                            <MoonIcon width={25} height={25} color="#3b82f6" />{''}
                                            {t("ThemeDark_Text")}
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                        <div className="flex items-center justify-end w-10 gap-1">
                            <Menu>
                                <MenuButton>
                                    <LanguageIcon width={25} height={25} color="#3b82f6" />
                                </MenuButton>
                                <MenuItems anchor="bottom" className="bg-gray-light dark:bg-border-dark mt-2 p-2 rounded-lg">
                                    <MenuItem>
                                        <button className="flex text-center gap-2 w-full data-[focus]:bg-blue-100 dark:data-[focus]:bg-background-dark px-2 py-1 rounded-lg text-text-light dark:text-text-dark transition-colors" onClick={() => setEnglishEnabled(false)}>
                                            ES
                                        </button>
                                    </MenuItem>
                                    <MenuItem>
                                        <button className="flex text-center gap-2 w-full data-[focus]:bg-blue-100 dark:data-[focus]:bg-background-dark px-2 py-1 rounded-lg text-text-light dark:text-text-dark transition-colors" onClick={() => setEnglishEnabled(true)}>
                                            EN
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>

                    </div>

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
export default PublicLayout