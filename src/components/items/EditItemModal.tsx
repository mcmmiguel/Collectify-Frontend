import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { Item, ItemFormData } from '@/types/index';
import { useForm } from 'react-hook-form';
import ItemForm from './ItemForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateItem } from '@/api/ItemAPI';
import { toast } from 'react-toastify';

type EditItemModalProps = {
    data: Item;
    itemId: Item['_id'];
}

export default function EditItemModal({ data, itemId }: EditItemModalProps) {

    const navigate = useNavigate();

    const params = useParams();
    const collectionId = params.collectionId!;

    const { register, formState: { errors }, handleSubmit, reset } = useForm<ItemFormData>({
        defaultValues: {
            itemName: data.itemName,
            description: data.description,
            image: data.image,
        }
    });

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
                            <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                <DialogTitle
                                    as="h3"
                                    className="font-black text-4xl  my-5"
                                >
                                    Editar Tarea
                                </DialogTitle>

                                <p className="text-xl font-bold">Realiza cambios a una tarea en {''}
                                    <span className="text-secondary-light dark:bg-secondary-light-dark">este formulario</span>
                                </p>

                                <form
                                    className="mt-10 space-y-3"
                                    onSubmit={handleSubmit(handleEditItem)}
                                    noValidate
                                >

                                    <ItemForm register={register} errors={errors} />

                                    <input
                                        type='submit'
                                        className={`bg-secondary-dark hover:bg-secondary-dark-dark w-full block p-3 text-text-dark font-bold rounded-lg cursor-pointer transition-colors uppercase ${updateItemMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                                        value={"Save changes"}
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