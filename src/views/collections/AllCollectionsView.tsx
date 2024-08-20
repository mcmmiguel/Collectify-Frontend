import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "@/components/LoadingSpinner";
import Fab from "@/components/collections/FAB";
import { useAuth } from "@/hooks/useAuth";
import CollectionCard from "@/components/collections/CollectionCard";
import { getAllCollections } from "@/api/CollectionAPI";

const AllCollectionsView = () => {

    const { user } = useAuth();
    const { t } = useTranslation();

    const { data, isLoading } = useQuery({
        queryKey: ['allCollections'],
        queryFn: getAllCollections,
    });

    return (
        <>
            <h1 className="text-center text-2xl font-medium text-text-light dark:text-text-dark my-5">
                {t("AllCollectionsView_TitleText_1st")} {''}
                <span className="text-secondary-light font-bold">
                    {t("AllCollectionsView_TitleText_2st")}
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
            {user && <Fab />}
        </>

    )
}
export default AllCollectionsView