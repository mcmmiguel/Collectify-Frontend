import { Link } from "react-router-dom"

export const NotFound = () => {
    return (
        <>
            <h1 className="font-black text-center text-4xl text-text-light dark:text-text-dark">Page not found</h1>
            <p className="mt-10 text-center text-text-light dark:text-text-dark">
                You might want comeback to {' '}
                <Link className="text-secondary-dark dark:text-secondary-light" to={'/'}>Collections</Link>
            </p>
        </>
    )
}