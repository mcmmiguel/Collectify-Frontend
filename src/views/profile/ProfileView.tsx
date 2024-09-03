import { getCollectionsByOwner } from "@/api/ProfileAPI";
import CollectionCard from "@/components/collections/CollectionCard";
import Fab from "@/components/collections/FAB";
import LoadingSpinner from "@/components/LoadingSpinner";
import { SalesforceButton } from "@/components/salesforce/SalesforceButton";
import { useAuth } from "@/hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next";

const ProfileView = () => {

    const { user } = useAuth();
    const { t } = useTranslation();

    const { data, isLoading } = useQuery({
        queryKey: ['userCollections', user?._id],
        queryFn: getCollectionsByOwner,
    });

    return (
        <>
            <h1 className="text-center text-2xl font-medium text-text-light dark:text-text-dark my-5">
                {t("Profile_Title1")}{''}
                <span className="text-secondary-light font-bold">
                    {t("Profile_Title2")}
                </span>
            </h1>

            {isLoading
                ? <LoadingSpinner />
                // TODO COnsiderar agregar un texto para cuando no haya colecciones
                : (
                    <div className="flex flex-col items-center md:grid md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-y-10">
                        {data?.map(collection => <CollectionCard key={collection._id} collection={collection} />)}
                    </div>
                )
            }

            <SalesforceButton />
            <Fab />

            {data?.length === 0 && <p className="text-center text-text-light dark:text-text-dark">{t("Profile_NoCollections")}</p>}

        </>
    )
}
export default ProfileView