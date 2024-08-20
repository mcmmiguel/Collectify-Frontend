import { useEffect, useState } from "react";
import i18n from "../locales/translation";
import { useQueryClient } from "@tanstack/react-query";

const useLanguage = () => {

    const [englishEnabled, setEnglishEnabled] = useState(localStorage.getItem('language') === 'en');
    const queryClient = useQueryClient();

    useEffect(() => {
        if (englishEnabled) {
            i18n.changeLanguage('en');
            localStorage.setItem('language', 'en');
        } else {
            i18n.changeLanguage('es');
            localStorage.setItem('language', 'es');
        }
    }, [englishEnabled]);

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ['categories'] });
    }, [englishEnabled, queryClient]);

    return {
        englishEnabled,
        setEnglishEnabled
    }
}
export default useLanguage;