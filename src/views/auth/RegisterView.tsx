import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage } from "@/components/ErrorMessage";
import { createAccount } from "@/api/AuthAPI";
import { UserRegisterForm } from "@/types/index";

const RegisterView = () => {
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
            <h1 className="text-2xl text-center font-black text-text-light dark:text-text-dark">Sign Up</h1>
            <p className="text-xl text-center font-light text-text-light mt-5">
                Complete the form to{''}
                <span className=" text-primary-light font-bold"> create your account.</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-8 p-10 mt-5 rounded-lg border-border-light border dark:bg-background-dark"
                noValidate
            >


                <div className="flex flex-col gap-2">
                    <label
                        className="font-normal text-xl"
                    >Name</label>
                    <input
                        type="name"
                        placeholder="John Doe"
                        className="w-full p-3  border-gray-300 border rounded-lg"
                        {...register("name", {
                            required: "Name is required",
                        })}
                    />
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-xl"
                        htmlFor="email"
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
                        placeholder="Register password"
                        className="w-full p-3  border-gray-300 border rounded-lg"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: 'The password must have at least 6 characters long'
                            }
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-xl"
                    >Confirm password</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Confirm your password"
                        className="w-full p-3  border-gray-300 border rounded-lg"
                        {...register("password_confirmation", {
                            required: "Confirm your password is required",
                            validate: value => value === password || 'The passwords do not match'
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Sign Up'
                    className="bg-primary-light hover:bg-primary-dark w-full p-3  text-white dark:text-text-dark font-black text-xl cursor-pointer rounded-lg"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    className="text-center text-text-light dark:text-text-dark font-normal"
                    to={'/auth/login'}
                >
                    Do you already have an account? Sign in!
                </Link>
            </nav>
        </>
    )
}
export default RegisterView