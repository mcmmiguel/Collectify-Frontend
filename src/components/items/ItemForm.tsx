import { FieldErrors, UseFormRegister } from "react-hook-form"
import { CustomField, ItemFormData } from "@/types/index";
import { ErrorMessage } from "../ErrorMessage";
import { useTranslation } from "react-i18next";

type ItemFormProps = {
    errors: FieldErrors<ItemFormData>
    register: UseFormRegister<ItemFormData>;
    collectionCustomFields: CustomField[] | undefined;
}

const customFieldInputs: Record<CustomField['fieldType'], string> = {
    'integer': 'number',
    'string': 'text',
    'boolean': 'checkbox',
    'date': 'date',
    '': 'text'
};

const ItemForm = ({ errors, register, collectionCustomFields }: ItemFormProps) => {

    const { t } = useTranslation();
    console.log(collectionCustomFields);

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

            {collectionCustomFields && (
                collectionCustomFields.map((field, index) => (
                    <div key={index} className="flex flex-col gap-2">
                        <label htmlFor={field.fieldName} className="font-normal text-xl text-text-light dark:text-text-dark">
                            {field.fieldName}
                        </label>
                        <input
                            id={field.fieldName}
                            className={`${field.fieldType === 'boolean' ? 'mr-auto' : 'w-full'} p-3 border border-gray-200 rounded-lg`}
                            type={customFieldInputs[field.fieldType]}
                            placeholder={t("Item_DescriptionPlaceholder")}
                            {...register(`customFields.${index}.value`, {
                                required: field.fieldType !== 'boolean' ? `This field is required` : undefined,
                                setValueAs: (value) => {
                                    if (field.fieldType === 'boolean') {
                                        return value === true;
                                    } else if (field.fieldType === 'date') {
                                        return value.slice(0, 10);
                                    } else {
                                        return value;
                                    }
                                }
                            })}
                            defaultValue={field.fieldType === 'date' ? `customFields.${index}.value.slice(0, 10)` : `customFields.${index}.value`}
                            defaultChecked={field.fieldType === 'boolean' ? undefined : undefined}
                        />

                        {errors.customFields && errors.customFields[index]?.value && field.fieldType !== 'boolean' && (
                            <ErrorMessage>{errors.customFields[index]?.value?.message}</ErrorMessage>
                        )}
                    </div>
                ))
            )}

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