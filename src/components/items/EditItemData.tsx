import { getItemById } from "@/api/ItemAPI";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom"
import EditItemModal from "./EditItemModal";

const EditItemData = () => {

    const params = useParams();
    const collectionId = params.collectionId!;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const itemId = queryParams.get('editItem')!;

    const { data, isError } = useQuery({
        queryKey: ['item', itemId],
        queryFn: () => getItemById({ collectionId, itemId }),
        enabled: !!itemId,
    });

    if (isError) return <Navigate to={'/404'} />

    if (data) return <EditItemModal data={data} itemId={itemId} />;
}
export default EditItemData