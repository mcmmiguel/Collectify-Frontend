import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "../ErrorMessage";
import { SalesforceContactForm } from "@/types/index";

type SalesforceFormProps = {
    errors: FieldErrors<SalesforceContactForm>;
    register: UseFormRegister<SalesforceContactForm>;
}

const SalesforceForm = ({ errors, register }: SalesforceFormProps) => {

    const { t } = useTranslation();

    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="firstName" className="text-sm uppercase font-bold text-text-light dark:text-text-dark">
                    {t("SalesforceContact_firstName")}
                </label>
                <input
                    id="firstName"
                    className="w-full p-2  border border-gray-200 rounded-lg"
                    type="text"
                    placeholder="John"
                    {...register("firstName", {
                        required: t("SalesforceContact_FieldRequired"),
                    })}
                />

                {errors.firstName && (
                    <ErrorMessage>{errors.firstName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="lastName" className="text-sm uppercase font-bold text-text-light dark:text-text-dark">
                    {t("SalesforceContact_lastName")}
                </label>
                <input
                    id="lastName"
                    className="w-full p-2  border border-gray-200 rounded-lg"
                    type="text"
                    placeholder="Doe"
                    {...register("lastName", {
                        required: t("SalesforceContact_FieldRequired"),
                    })}
                />

                {errors.lastName && (
                    <ErrorMessage>{errors.lastName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="email" className="text-sm uppercase font-bold text-text-light dark:text-text-dark">
                    {t("Login_Email")}
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="johndoe@gmail.com"
                    className="w-full p-3  border-gray-300 border rounded-lg"
                    {...register("email", {
                        required: t("Login_EmailRequired"),
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: t("Register_EmailRequired"),
                        },
                    })}
                />

                {errors.email && (
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
            </div>


            <div className="mb-5 space-y-3">
                <label htmlFor="phone" className="text-sm uppercase font-bold text-text-light dark:text-text-dark">
                    {t("SalesforceContact_Phone")}
                </label>

                <input
                    id="phone"
                    type="tel"
                    placeholder="(226)-115-1414"
                    className="w-full p-3  border-gray-300 border rounded-lg"
                    {...register("phone", {
                        required: t("SalesforceContact_FieldRequired"),
                        minLength: {
                            value: 10,
                            message: t("SalesforceContact_PhoneLength")
                        },
                        maxLength: {
                            value: 10,
                            message: t("SalesforceContact_PhoneLength"),
                        },
                    })}
                />
                {errors.phone && (
                    <ErrorMessage>{errors.phone.message}</ErrorMessage>
                )}
            </div>

        </>
    )
}
export default SalesforceForm