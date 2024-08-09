import CollectionCard from "@/components/collections/CollectionCard";
import Fab from "@/components/collections/FAB"
import { useAuth } from "@/hooks/useAuth"

const MainView = () => {

    const { user } = useAuth();

    return (
        <>
            <CollectionCard />
            {user && <Fab />}
        </>
    )
}
export default MainView