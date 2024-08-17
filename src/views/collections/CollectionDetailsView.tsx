import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from '@heroicons/react/20/solid';
import LoadingSpinner from "@/components/LoadingSpinner";
import { getFullCollection } from "@/api/CollectionAPI";
import { useAuth } from "@/hooks/useAuth";
import AddItemModal from "@/components/items/AddItemModal";
import ItemCard from "@/components/items/ItemCard";
import hasOwnership from "@/utils/policies";
import EditItemData from "@/components/items/EditItemData";
import CollectionToolBar from "@/components/collections/CollectionToolBar";

const CollectionDetailsView = () => {

    const navigate = useNavigate();

    const params = useParams();
    const collectionId = params.collectionId!;

    const { user } = useAuth();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['collection', collectionId],
        queryFn: () => getFullCollection(collectionId),
    });

    if (isLoading) return <LoadingSpinner />;

    if (isError) return <Navigate to={'/404'} />

    if (data) return (
        <>
            <div
                className="relative h-64 bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center rounded-lg"
                style={{
                    backgroundImage: `linear-gradient(0deg, rgba(70, 70, 70, 0) 0%, rgba(140, 140, 140, 0.7) 100%), url(${data.image})`, backgroundPosition: '50% 50%'
                }}
            >
                {hasOwnership(data.owner, user) &&
                    <CollectionToolBar collectionId={collectionId} />
                }
                <div className="absolute inset-0 bg-black opacity-50 rounded-lg pointer-events-none"></div>

                <h1 className="relative text-5xl font-black text-text-dark text-center z-10">
                    {data.collectionName}
                </h1>
                <p className="relative text-2xl font-light text-text-dark z-10 mt-5">
                    {data.description}
                </p>
            </div>

            {hasOwnership(data.owner, user) &&
                <>
                    <nav className="relative my-5 flex gap-3">
                        <button
                            type="button"
                            className="fixed bottom-10 right-10 bg-secondary-dark hover:bg-secondary-light-dark text-text-dark text-xl font-bold rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-colors z-30"
                            onClick={() => navigate('?newItem=true')}
                        >
                            <PlusIcon width={25} height={25} />
                        </button>
                    </nav>
                </>
            }

            {data.items &&
                <ul role="list" className="divide-y-2 divide-border-light dark:divide-border-dark border border-border-light dark:border-border-dark mt-10 bg-background-light dark:bg-background-dark shadow-lg rounded-lg">
                    {data.items.map(item => <ItemCard key={item._id} item={item} collection={data} />)}
                </ul>
            }

            <AddItemModal />
            <EditItemData />
        </>
    )
}
export default CollectionDetailsView