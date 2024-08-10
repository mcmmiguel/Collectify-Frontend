import { Fragment } from 'react';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ItemForm from './ItemForm';
import { ItemFormData } from '@/types/index';

const AddItemModal = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const modalItem = queryParams.get('newItem');
    const show = modalItem ? true : false;

    const initalValues: ItemFormData = {
        itemName: '',
        description: '',
        image: '',
    }

    const { register, formState: { errors }, handleSubmit } = useForm({ defaultValues: initalValues });

    const handleCreateItem = (formData: ItemFormData) => console.log(formData);

    return (
        <>
            <Transition appear show={show} as={Fragment}>
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
                                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16 dark:bg-border-dark">
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl my-5 text-text-light dark:text-text-dark"
                                    >
                                        New Item
                                    </DialogTitle>

                                    <p className="text-xl font-bold text-text-light dark:text-text-dark">Complete the form and create  {''}
                                        <span className="text-secondary-dark dark:text-secondary-light-dark">an item</span>
                                    </p>

                                    <form
                                        className='mt-10 space-y-3'
                                        noValidate
                                        onSubmit={handleSubmit(handleCreateItem)}
                                    >

                                        <ItemForm register={register} errors={errors} />

                                        <input
                                            type='submit'
                                            className={` bg-secondary-dark hover:bg-secondary-dark-dark w-full block p-3 text-text-dark font-bold rounded-lg cursor-pointer transition-colors uppercase`}
                                            value={"Save Item"}
                                        // ${createCollectionMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}
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