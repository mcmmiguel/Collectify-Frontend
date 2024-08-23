import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage } from "@/components/ErrorMessage";
import { loginAPI } from "@/api/AuthAPI";
import { UserLoginForm } from "@/types/index";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "@/components/LoadingSpinner";

const LoginView = () => {

    const { t } = useTranslation();

    const initialValues: UserLoginForm = {
        email: '',
        password: '',
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { login, isLoading } = useAuth();

    const { mutate, isPending } = useMutation({
        mutationFn: loginAPI,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            login();
        }
    });

    const handleLogin = (formData: UserLoginForm) => mutate(formData);

    if (isLoading) return <LoadingSpinner />

    return (
        <>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-8 p-10 rounded-lg border-border-light border dark:bg-background-dark"
                noValidate
            >
                <div className="flex flex-col gap-2">
                    <label
                        className="font-normal text-xl text-text-light dark:text-text-dark"
                    >{t("Login_Email")}</label>

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

                <div className="flex flex-col gap-2">
                    <label
                        className="font-normal text-xl text-text-light dark:text-text-dark"
                    >{t("Login_Password")}</label>

                    <input
                        type="password"
                        placeholder={t("Login_PasswordPlaceholder")}
                        className="w-full p-3  border-gray-300 border rounded-lg"
                        {...register("password", {
                            required: t("Login_PasswordRequired"),
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value={t("Login_SignIn")}
                    disabled={isPending}
                    className="bg-primary-light hover:bg-primary-dark w-full p-3  text-white dark:text-text-dark font-black text-xl cursor-pointer rounded-lg"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <p className="text-center text-text-light dark:text-text-dark font-normal">
                    {t("Login_Message")} {''}
                    <Link
                        to={'/auth/register'}
                        className="text-link-light hover:text-hover-link-light"
                    >
                        {t("Register_SignUp")}
                    </Link>
                </p>
            </nav>
        </>
    )
}
export default LoginView