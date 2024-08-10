import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";
import { CollectionFormData } from '@/types/index';

type CollectionFormProps = {
    errors: FieldErrors<CollectionFormData>;
    register: UseFormRegister<CollectionFormData>;
}

const CollectionForm = ({ errors, register }: CollectionFormProps) => {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="collectionName" className="text-sm uppercase font-bold">
                    Collection Name
                </label>
                <input
                    id="collectionName"
                    className="w-full p-2  border border-gray-200 rounded-lg"
                    type="text"
                    placeholder="Xbox Games"
                    {...register("collectionName", {
                        required: "The collection name is required",
                    })}
                />

                {errors.collectionName && (
                    <ErrorMessage>{errors.collectionName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="description" className="text-sm uppercase font-bold">
                    Description
                </label>
                <input
                    id="description"
                    className="w-full p-2  border border-gray-200 rounded-lg"
                    type="text"
                    placeholder="My favorite ones"
                    {...register("description", {
                        required: "The description is required",
                    })}
                />

                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="image" className="text-sm uppercase font-bold block">
                    Upload an image
                </label>
                <input
                    type="file"
                    {...register('image')}
                    className="bg-background-light p-2 text-text-light rounded-lg"
                />
            </div>
        </>
    )
}
export default CollectionForm