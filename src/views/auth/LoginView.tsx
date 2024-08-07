import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { ErrorMessage } from "@/components/ErrorMessage"
import { login } from "@/api/AuthAPI"
import { UserLoginForm } from "@/types/index"
import { toast } from "react-toastify"

const LoginView = () => {
    const initialValues: UserLoginForm = {
        email: '',
        password: '',
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: login,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            navigate('/');
        }
    });

    const handleLogin = (formData: UserLoginForm) => mutate(formData);

    return (
        <>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-8 p-10 rounded-lg border-border-light border dark:bg-background-dark"
                noValidate
            >
                <div className="flex flex-col gap-2">
                    <label
                        className="font-normal text-xl"
                    >Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="johndoe@gmail.com"
                        className="w-full p-3  border-gray-300 border rounded-lg"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid email",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Type your password"
                        className="w-full p-3  border-gray-300 border rounded-lg"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Sign in'
                    className="bg-primary-light hover:bg-primary-dark w-full p-3  text-white dark:text-text-dark font-black text-xl cursor-pointer rounded-lg"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    className="text-center text-text-light dark:text-text-dark font-normal"
                    to={'/auth/register'}
                >
                    You don't have an account? Sign Up!
                </Link>
            </nav>
        </>
    )
}
export default LoginView