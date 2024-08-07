import { ReactNode } from "react"

export const ErrorMessage = ({ children }: { children: ReactNode }) => {
    return (
        <div className="text-center bg-red-100 text-error-light dark:text-error-dark font-bold p-3 uppercase text-sm rounded-lg">
            {children}
        </div>
    )
}