import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

type ConfirmationDialogProps = {
    title: string;
    message: string;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmationDialog = ({ title, message, isOpen, onClose, onConfirm }: ConfirmationDialogProps) => {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="flex flex-col items-center gap- max-w-lg space-y-4 bg-background-light dark:bg-border-dark p-12 rounded-lg shadow-lg">
                    <DialogTitle className="font-bold text-2xl text-text-light dark:text-text-dark">{title}</DialogTitle>
                    <Description className="text-text-light dark:text-text-dark text-center">{message}</Description>
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-success-light dark:bg-success-dark text-white rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className="px-4 py-2 bg-error-light dark:bg-error-dark text-white rounded-lg"
                        >
                            Confirm
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default ConfirmationDialog;
