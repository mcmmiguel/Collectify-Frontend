import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import { Collection } from "@/types/index";
import ConfirmationDialog from "../ConfirmationDialog";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCollection } from "@/api/CollectionAPI";
import { toast } from "react-toastify";

type CollectionToolBarProps = {
    collectionId: Collection['_id'];
}

const CollectionToolBar = ({ collectionId }: CollectionToolBarProps) => {

    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: deleteCollection,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            navigate('/collections');
            queryClient.invalidateQueries({ queryKey: ['allCollections'] });
            toast.success(data);
        },
    });

    const handleDeleteConfirmation = () => {
        mutate(collectionId);
    };

    return (
        <>
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
                        onClick={() => setIsOpen(true)}
                    >
                        <TrashIcon width={35} height={35} color="white" />
                    </button>
                </div>
            </div>

            <ConfirmationDialog
                title="Delete collection?"
                message="Are you sure you want to delete this collection? All of your data will be permanently removed."
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={handleDeleteConfirmation}
            />
        </>
    )
}
export default CollectionToolBar