import { getAllCollections } from "@/api/CollectionAPI";
import CollectionCard from "@/components/collections/CollectionCard";
import Fab from "@/components/collections/FAB";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const AllCollectionsView = () => {

    const { user } = useAuth();

    const { data, isLoading } = useQuery({
        queryKey: ['allCollections'],
        queryFn: getAllCollections,
    });

    return (
        <>
            <h1 className="text-center text-2xl font-medium text-text-light dark:text-text-dark my-5">
                Get inspired by the {''}
                <span className="text-secondary-light font-bold">
                    community's collections.
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