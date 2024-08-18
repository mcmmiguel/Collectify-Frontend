import { FieldErrors, UseFormRegister } from "react-hook-form"
import { ItemFormData } from "@/types/index";
import { ErrorMessage } from "../ErrorMessage";
import { useTranslation } from "react-i18next";

type TaskFormProps = {
    errors: FieldErrors<ItemFormData>
    register: UseFormRegister<ItemFormData>
}

const ItemForm = ({ errors, register }: TaskFormProps) => {

    const { t } = useTranslation();

    return (
        <>
            <div className="flex flex-col gap-2">
                <label htmlFor="collectionName" className="font-normal text-xl text-text-light dark:text-text-dark">
                    {t("Item_Name")}
                </label>
                <input
                    id="itemName"
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    type="text"
                    placeholder="FIFA 2024"
                    {...register("itemName", {
                        required: t("Item_NameRequired"),
                    })}
                />
                {errors.itemName && (
                    <ErrorMessage>{errors.itemName.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="description" className="font-normal text-xl text-text-light dark:text-text-dark">
                    {t("Item_Description")}
                </label>
                <input
                    id="description"
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    type="text"
                    placeholder={t("Item_DescriptionPlaceholder")}
                    {...register("description")}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="image" className="font-normal text-xl block text-text-light dark:text-text-dark">
                    {t("Item_Image")}
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