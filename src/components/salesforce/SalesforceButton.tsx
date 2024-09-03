import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


export const SalesforceButton = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <button
            className="bg-secondary-dark hover:bg-secondary-dark-dark py-2 px-3 rounded-lg fixed bottom-28 right-10 z-50"
            onClick={() => navigate('/profile/salesforce/send-contact')}
        >
            <div className='flex justify-between items-center gap-2'>
                <InformationCircleIcon className='w-8 h-8 text-white font-bold' />
                <p className='text-text-dark'>{t("Profile_SalesforceButton")}</p>
            </div>
        </button>
    )
}