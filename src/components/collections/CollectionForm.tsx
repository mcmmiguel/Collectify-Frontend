import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";
import { CollectionFormData } from '@/types/index';
import { useTranslation } from "react-i18next";

type CollectionFormProps = {
    errors: FieldErrors<CollectionFormData>;
    register: UseFormRegister<CollectionFormData>;
}

const CollectionForm = ({ errors, register }: CollectionFormProps) => {

    const { t } = useTranslation();

    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="collectionName" className="text-sm uppercase font-bold text-text-light dark:text-text-dark">
                    {t("CreateCollection_Name")}
                </label>
                <input
                    id="collectionName"
                    className="w-full p-2  border border-gray-200 rounded-lg"
                    type="text"
                    placeholder={t("CreateCollection_NamePlaceholder")}
                    {...register("collectionName", {
                        required: t("CreateCollection_NameRequired"),
                    })}
                />

                {errors.collectionName && (
                    <ErrorMessage>{errors.collectionName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="description" className="text-sm uppercase font-bold text-text-light dark:text-text-dark">
                    {t("CreateCollection_Description")}
                </label>
                <input
                    id="description"
                    className="w-full p-2  border border-gray-200 rounded-lg"
                    type="text"
                    placeholder={t("CreateCollection_DescriptionPlaceholder")}
                    {...register("description", {
                        required: t("CreateCollection_DescriptionRequired"),
                    })}
                />

                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="image" className="text-sm uppercase font-bold text-text-light dark:text-text-dark block">
                    {t("CreateCollection_Image")}
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