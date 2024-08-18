import { useEffect, useState } from "react";
import i18n from "../locales/translation";

const useLanguage = () => {

    const [englishEnabled, setEnglishEnabled] = useState(localStorage.getItem('language') === 'en');

    useEffect(() => {
        if (englishEnabled) {
            i18n.changeLanguage('en');
            localStorage.setItem('language', 'en');
        } else {
            i18n.changeLanguage('es');
            localStorage.setItem('language', 'es');
        }
    }, [englishEnabled]);

    return {
        englishEnabled,
        setEnglishEnabled
    }
}
export default useLanguage;