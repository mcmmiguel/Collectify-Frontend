import Fab from "@/components/collections/FAB"
import { useAuth } from "@/hooks/useAuth"

const MainView = () => {

    const { user } = useAuth();

    return (
        <>
            {user && <Fab />}
        </>
    )
}
export default MainView