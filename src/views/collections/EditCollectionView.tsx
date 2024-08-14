import { getFullCollection } from "@/api/CollectionAPI";
import EditCollectionForm from "@/components/collections/EditCollectionForm";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom"

const EditCollectionView = () => {

    const params = useParams();
    const collectionId = params.collectionId!;

    const { data, isLoading, isError } = useQuery({
        queryKey: ['editCollection', collectionId],
        queryFn: () => getFullCollection(collectionId),
        retry: 1
    });

    if (isLoading) return <LoadingSpinner />;

    if (isError) return <Navigate to={'/404'} />;

    if (data) return <EditCollectionForm data={data} collectionId={collectionId} />;
}
export default EditCollectionView