import { FieldErrors, UseFormRegister } from "react-hook-form"
import { ItemFormData } from "@/types/index";
import { ErrorMessage } from "../ErrorMessage";

type TaskFormProps = {
    errors: FieldErrors<ItemFormData>
    register: UseFormRegister<ItemFormData>
}

const ItemForm = ({ errors, register }: TaskFormProps) => {
    return (
        <>
            <div className="flex flex-col gap-2">
                <label htmlFor="collectionName" className="font-normal text-xl text-text-light dark:text-text-dark">
                    Item Name
                </label>
                <input
                    id="itemName"
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    type="text"
                    placeholder="FIFA 2024"
                    {...register("itemName", {
                        required: "The Item name is required",
                    })}
                />
                {errors.itemName && (
                    <ErrorMessage>{errors.itemName.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="description" className="font-normal text-xl text-text-light dark:text-text-dark">
                    Description
                </label>
                <input
                    id="description"
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    type="text"
                    placeholder="Describe your item"
                    {...register("description")}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="image" className="font-normal text-xl block text-text-light dark:text-text-dark">
                    Upload an image
                </label>
                <input
                    type="file"
                    {...register('image')}
                    className="bg-background-light p-3 text-text-light rounded-lg"
                />
            </div>
        </>
    )
}

export default ItemForm;