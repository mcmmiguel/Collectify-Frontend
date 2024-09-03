import { createSalesforceContact } from "@/api/SalesforceAPI";
import BackButton from "@/components/BackButton"
import SalesforceForm from "@/components/salesforce/SalesforceForm";
import { SalesforceContactForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const SalesforceView = () => {

    const { t } = useTranslation();

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    }

    const { register, formState: { errors }, handleSubmit } = useForm({ defaultValues: initialValues });

    const createContactMutation = useMutation({
        mutationFn: createSalesforceContact,
        onError: (error) => toast.error(error.message),
        onSuccess: () => toast.success(t("SalesforceContact_SuccessMessage"))
    });

    const handleForm = async (formData: SalesforceContactForm) => {
        createContactMutation.mutate(formData)
    };

    return (
        <>
            <BackButton to="/profile" />

            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black text-text-light dark:text-text-dark">{t("SalesforceContact_Title")}</h1>
                <p className="text-2xl font-light mt-5 text-text-light dark:text-text-dark">{t("SalesforceContact_Subtitle")}</p>

                <form
                    className="mt-5 space-y-6 p-6 rounded-lg border-border-light border dark:bg-background-dark"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >

                    <SalesforceForm register={register} errors={errors} />

                    <input
                        type="submit"
                        value={t("SalesforceContact_Send")}
                        disabled={createContactMutation.isPending}
                        className={`bg-secondary-dark hover:bg-secondary-dark-dark w-full block p-2 text-text-dark font-bold rounded-lg cursor-pointer transition-colors uppercase ${createContactMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                    />
                </form>
            </div>
        </>
    )
}

export default SalesforceView