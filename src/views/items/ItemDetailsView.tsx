import { getItemById } from "@/api/ItemAPI";
import LoadingSpinner from "@/components/LoadingSpinner";
import { CommentFormData } from "@/types/index";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";

const ItemDetailsView = () => {

    const initialValues: CommentFormData = {
        comment: '',
    }

    const params = useParams();
    const collectionId = params.collectionId!;
    const itemId = params.itemId!;

    const { data, isLoading, isError } = useQuery({
        queryKey: ['item', itemId],
        queryFn: () => getItemById({ collectionId, itemId }),
    });

    const { register, handleSubmit } = useForm({ defaultValues: initialValues });

    const handleCreateComment = (formData: CommentFormData) => {
        if (!formData.comment) return;

        console.log(formData);
    }

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <Navigate to={`/collections/${collectionId}`} />

    if (data) return (
        <>
            <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="col-span-1 rounded-lg h-96">
                    <img
                        className="w-full h-full object-contain rounded-lg"
                        src={data.image}
                        alt={data.itemName}
                    />
                </div>

                <div className="col-span-2">
                    <h1 className="text-5xl font-black text-text-light dark:text-text-dark">
                        {data.itemName}
                    </h1>
                    <p className="text-2xl font-light text-text-light dark:text-text-dark mt-5">
                        {data.description}
                    </p>
                </div>
            </div>

            <hr />
            <h2>Comment Section</h2>
            <form
                className='mt-10 space-y-3'
                noValidate
                onSubmit={handleSubmit(handleCreateComment)}
            >
                <div className="flex flex-col items-start gap-5">

                    <input
                        id="comment"
                        type="text"
                        {...register('comment')}
                        placeholder="What do you think about this item?"
                        className="w-full h-24 p-3 border border-border-light rounded-lg"
                    />

                    <input
                        type='submit'
                        className={` bg-secondary-dark hover:bg-secondary-dark-dark px-5 py-3 text-text-dark font-bold rounded-lg cursor-pointer transition-colors uppercase shadow-lg`}
                        value={"Comment"}
                    />
                </div>
            </form>

        </>
    )
}
export default ItemDetailsView;