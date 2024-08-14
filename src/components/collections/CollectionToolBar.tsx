import { Link } from "react-router-dom";
import { ArrowLeftIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import { Collection } from "@/types/index";

type CollectionToolBarProps = {
    collectionId: Collection['_id'];
}

const CollectionToolBar = ({ collectionId }: CollectionToolBarProps) => {
    return (
        <div className="w-full absolute z-10 top-5 flex justify-between items-center px-5">
            <Link to={'/collections'}
                type="button"
            >
                <ArrowLeftIcon width={35} height={35} color="white" />
            </Link>

            <div className="flex gap-8 items-center">
                <Link to={`/collections/${collectionId}/edit`}>
                    <PencilSquareIcon width={35} height={35} color="white" />
                </Link>

                <button
                    type="button"
                >
                    <TrashIcon width={35} height={35} color="white" />
                </button>
            </div>
        </div>
    )
}
export default CollectionToolBar