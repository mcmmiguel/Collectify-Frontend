import { Control, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";
import { CollectionFormData } from '@/types/index';
import { useTranslation } from "react-i18next";
import { Select } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/CategoryAPI";
import CustomFieldsForm from "./CustomFieldsForm";
import { useEffect } from "react";

type CollectionFormProps = {
    errors: FieldErrors<CollectionFormData>;
    register: UseFormRegister<CollectionFormData>;
    control?: Control<CollectionFormData>;
    setValue?: UseFormSetValue<CollectionFormData>;
    defaultCategoryValue?: CollectionFormData['category'];
    editMode: boolean;
}

const CollectionForm = ({ errors, register, setValue, defaultCategoryValue, control, editMode }: CollectionFormProps) => {

    const { t } = useTranslation();

    const { data, isSuccess } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    });

    useEffect(() => {
        if (isSuccess && setValue && editMode) {
            setValue('category', defaultCategoryValue || '');
        }
    }, [isSuccess, setValue, editMode, defaultCategoryValue]);

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
                <label htmlFor="category" className="text-sm uppercase font-bold text-text-light dark:text-text-dark">
                    {t("CreateCollection_Category")}
                </label>
                <Select
                    id="category"
                    className="w-full p-2  border border-gray-200 rounded-lg"
                    {...register("category", {
                        required: t("CreateCollection_CategoryRequired"),
                    })}
                >
                    <option value={''}>-- {t("CreateCollection_CategoryPlaceholder")} --</option>
                    {data?.map(category => <option key={category._id} value={category._id}>{category.categoryName}</option>)}
                </Select>

                {errors.category && (
                    <ErrorMessage>{errors.category.message}</ErrorMessage>
                )}
            </div>

            {!editMode &&
                <CustomFieldsForm register={register} control={control} />
            }

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