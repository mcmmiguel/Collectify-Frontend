import { createContext, useEffect, useState } from "react";

type ThemeProviderProps = {
    children: React.ReactNode;
}

export type ThemeContextProps = {
    enabledDarkMode: boolean;
    setEnabledDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}


export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {

    const [enabledDarkMode, setEnabledDarkMode] = useState(localStorage.getItem('theme') === 'dark');

    useEffect(() => {
        if (enabledDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light')
        }
    }, [enabledDarkMode]);

    return (
        <ThemeContext.Provider value={{
            enabledDarkMode,
            setEnabledDarkMode,
        }}>
            {children}
        </ThemeContext.Provider>
    )
};