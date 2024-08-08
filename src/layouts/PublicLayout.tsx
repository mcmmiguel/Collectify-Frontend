import Logo from "@/components/Logo"
import { ReactNode } from "react"
import { ToastContainer } from "react-toastify"

const PublicLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <div className="min-h-screen">
                <div className="py-10 lg:py-5 mx-auto w-[450px]">
                    <div className="h-20 flex justify-center">
                        <Logo darkMode={false} />
                    </div>

                    <h1>PUBLIC</h1>

                    <div className="mt-3" >
                        {children}
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
export default PublicLayout