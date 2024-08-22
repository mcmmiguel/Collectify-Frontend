import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { Item, ItemFormData } from '@/types/index';
import { useForm } from 'react-hook-form';
import ItemForm from './ItemForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateItem } from '@/api/ItemAPI';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

type EditItemModalProps = {
    data: Item;
    itemId: Item['_id'];
    collectionCustomFields: {
        fieldName: string;
        fieldType: string;
    }[] | undefined
}

export default function EditItemModal({ data, itemId, collectionCustomFields }: EditItemModalProps) {

    const navigate = useNavigate();
    const { t } = useTranslation();

    const params = useParams();
    const collectionId = params.collectionId!;

    const transformedCustomFields = collectionCustomFields?.map(field => ({
        fieldName: field.fieldName,
        fieldType: field.fieldType as 'integer' | 'string' | 'boolean' | 'date' | '',
    }));

    const customFieldsInitialValues = collectionCustomFields?.map((field, index) => ({
        fieldName: field.fieldName,
        value: (data.customFields) && data.customFields[index].value,
    }));

    const initialValues: ItemFormData = {
        itemName: data.itemName,
        description: data.description,
        image: data.image,
        customFields: customFieldsInitialValues || [],
    }

    const { register, formState: { errors }, handleSubmit, reset } = useForm<ItemFormData>({ defaultValues: initialValues });

    const queryClient = useQueryClient();

    const updateItemMutation = useMutation({
        mutationFn: updateItem,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['item', itemId] });
            queryClient.invalidateQueries({ queryKey: ['collection', collectionId] });
            toast.success(data);
            reset();
            navigate(location.pathname, { replace: true })
        }
    });

    const handleEditItem = (formData: ItemFormData) => {
        const data = { collectionId, itemId, formData };
        updateItemMutation.mutate(data);
    }

    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-background-light dark:bg-border-dark text-left align-middle shadow-xl transition-all p-16">
                                <DialogTitle
                                    as="h3"
                                    className="font-black text-4xl my-5 text-text-light dark:text-text-dark"
                                >
                                    {t("EditItem_Title")}
                                </DialogTitle>

                                <p className="text-xl font-bold text-text-light dark:text-text-dark">{t("EditItem_Subtitle1")}
                                    <span className="text-secondary-light dark:secondary-light-dark">{t("EditItem_Subtitle2")}</span>
                                </p>

                                <form
                                    className="mt-10 space-y-3"
                                    onSubmit={handleSubmit(handleEditItem)}
                                    noValidate
                                >

                                    <ItemForm register={register} errors={errors} collectionCustomFields={transformedCustomFields} />

                                    <input
                                        type='submit'
                                        className={`bg-secondary-dark hover:bg-secondary-dark-dark w-full block p-3 text-text-dark font-bold rounded-lg cursor-pointer transition-colors uppercase ${updateItemMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                                        value={t("EditItem_Button")}
                                    />
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}