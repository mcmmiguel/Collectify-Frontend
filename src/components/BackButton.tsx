import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

type BackButtonProps = {
    to: string;
    color?: 'white' | 'blue';
}

const BackButton = ({ to, color = 'blue' }: BackButtonProps) => {
    return (
        <nav>
            <Link
                to={to}
                className={`flex items-center border ${color === 'blue' ? "border-primary-light text-primary-light" : "border-white text-text-dark"}  w-fit p-2  gap-3 rounded-lg`}
            >
                <ArrowLeftIcon width={35} height={35} className={`${color === 'blue' ? "fill-primary-light" : "fill-white"} `} />
            </Link>
        </nav>
    )
}

export default BackButton;