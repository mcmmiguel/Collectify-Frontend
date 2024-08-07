import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Logo from "@/components/Logo";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <>
            <div className="min-h-screen">
                <div className="py-10 lg:py-5 mx-auto w-[450px]">
                    <div className="h-20 flex justify-center">
                        <Logo />
                    </div>

                    <div className="mt-5" >
                        <Outlet />
                    </div>
                </div>
            </div>

            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />


        </>
    )
}
export default AuthLayout