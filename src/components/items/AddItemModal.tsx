import { Fragment } from 'react';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ItemForm from './ItemForm';
import { uploadImageToCloudinary } from '@/api/CollectionAPI';
import { createItem } from '@/api/ItemAPI';
import { ItemFormData } from '@/types/index';
import { useTranslation } from 'react-i18next';

type AddItemModalProps = {
    collectionCustomFields: {
        fieldName: string;
        fieldType: string;
    }[] | undefined
}

const AddItemModal = ({ collectionCustomFields }: AddItemModalProps) => {

    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const modalItem = queryParams.get('newItem');
    const show = modalItem ? true : false;

    const params = useParams();
    const collectionId = params.collectionId!;

    const transformedCustomFields = collectionCustomFields?.map(field => ({
        fieldName: field.fieldName,
        fieldType: field.fieldType as 'integer' | 'string' | 'boolean' | 'date' | '',
    }));

    const customFieldsInitialValues = collectionCustomFields?.map(field => ({
        fieldName: field.fieldName,
        value: '',
    }));

    const initalValues: ItemFormData = {
        itemName: '',
        description: '',
        image: '',
        customFields: customFieldsInitialValues || [],
    }

    const { register, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues: initalValues });

    const queryClient = useQueryClient();

    const createItemMutation = useMutation({
        mutationFn: createItem,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            queryClient.invalidateQueries({ queryKey: ['collection', collectionId] });
            reset();
            navigate(location.pathname, { replace: true });
        }
    });

    const uploadImageMutation = useMutation({
        mutationFn: uploadImageToCloudinary,
        onError: (error) => {
            toast.error('Error uploading image: ' + error.message);
        },
    });

    const handleCreateItem = async (formData: ItemFormData) => {
        let imageUrl = '';

        if (formData.image && formData.image[0]) {
            imageUrl = await uploadImageMutation.mutateAsync(formData.image[0]);
        }

        const itemData = {
            formData: {
                ...formData,
                image: imageUrl,
            },
            collectionId,
        };

        console.log(itemData);

        createItemMutation.mutate(itemData);
    };

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => navigate(location.pathname, { replace: true })}>
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

                    <div className="fixed inset-0 overflow-y-auto ">
                        <div className="flex min-h-full items-center justify-center p-4 text-center ">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-background-light text-left align-middle shadow-xl transition-all p-16 dark:bg-border-dark">
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl my-5 text-text-light dark:text-text-dark"
                                    >
                                        {t("CreateItem_Title")}
                                    </DialogTitle>

                                    <p className="text-xl font-bold text-text-light dark:text-text-dark"> {t("CreateItem_Subtitle1")} {''}
                                        <span className="text-secondary-dark dark:text-secondary-light-dark">{t("CreateItem_Subtitle2")}</span>
                                    </p>

                                    <form
                                        className='mt-10 space-y-3'
                                        noValidate
                                        onSubmit={handleSubmit(handleCreateItem)}
                                    >

                                        <ItemForm register={register} errors={errors} collectionCustomFields={transformedCustomFields} />

                                        <input
                                            type='submit'
                                            className={` bg-secondary-dark hover:bg-secondary-dark-dark w-full block p-3 text-text-dark font-bold rounded-lg cursor-pointer transition-colors uppercase ${createItemMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                                            value={t("CreateItem_Button")}
                                        />
                                    </form>

                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default AddItemModal;