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

    const [enabledDarkMode, setEnabledDarkMode] = useState(false);

    useEffect(() => {
        if (enabledDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
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