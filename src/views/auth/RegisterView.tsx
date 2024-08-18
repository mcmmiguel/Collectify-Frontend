import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage } from "@/components/ErrorMessage";
import { createAccount } from "@/api/AuthAPI";
import { UserRegisterForm } from "@/types/index";
import { useTranslation } from "react-i18next";

const RegisterView = () => {

    const { t } = useTranslation();

    const initialValues: UserRegisterForm = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    }

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegisterForm>({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: createAccount,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
        },
    })

    const password = watch('password');

    const handleRegister = (formData: UserRegisterForm) => mutate(formData);

    return (
        <>
            <h1 className="text-2xl text-center font-black text-text-light dark:text-text-dark">{t("Register_SignUp")}</h1>
            <p className="text-xl text-center font-light text-text-light dark:text-text-dark mt-2">
                {t("Register_CompleteTheForm")}
                <span className=" text-primary-light dark:text-primary-light-dark font-bold">{t("Register_CreateYourAccount")}</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-8 p-10 mt-2 rounded-lg border-border-light border dark:bg-background-dark"
                noValidate
            >


                <div className="flex flex-col gap-2">
                    <label
                        className="font-normal text-xl text-text-light dark:text-text-dark"
                    >{t("Register_Name")}</label>
                    <input
                        type="name"
                        placeholder="John Doe"
                        className="w-full p-3  border-gray-300 border rounded-lg"
                        {...register("name", {
                            required: t("Register_NameRequired"),
                        })}
                    />
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        className="font-normal text-xl text-text-light dark:text-text-dark"
                        htmlFor="email"
                    >{t("Register_Email")}</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="johndoe@gmail.com"
                        className="w-full p-3  border-gray-300 border rounded-lg"
                        {...register("email", {
                            required: t("Register_EmailRequired"),
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: t("Register_EmailInvalid"),
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        className="font-normal text-xl text-text-light dark:text-text-dark"
                    >{t("Register_Password")}</label>

                    <input
                        type="password"
                        placeholder={t("Register_PasswordPlaceholder")}
                        className="w-full p-3  border-gray-300 border rounded-lg"
                        {...register("password", {
                            required: t("Register_PasswordRequired"),
                            minLength: {
                                value: 6,
                                message: t("Register_PasswordLength")
                            }
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        className="font-normal text-xl text-text-light dark:text-text-dark"
                    >{t("Register_ConfirmPassword")}</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder={t("Register_ConfirmPassword")}
                        className="w-full p-3  border-gray-300 border rounded-lg"
                        {...register("password_confirmation", {
                            required: t("Register_ConfirmPasswordRequired"),
                            validate: value => value === password || t("Register_PasswordUnmath")
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value={t("Register_SignUp")}
                    className="bg-primary-light hover:bg-primary-dark w-full p-3  text-white dark:text-text-dark font-black text-xl cursor-pointer rounded-lg"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <p className="text-center text-text-light dark:text-text-dark font-normal">
                    {t("Register_Message")}{''}
                    <Link
                        to={'/auth/login'}
                        className="text-link-light hover:text-hover-link-light"
                    >
                        {t("Register_SignUp")}
                    </Link>
                </p>
            </nav>
        </>
    )
}
export default RegisterView