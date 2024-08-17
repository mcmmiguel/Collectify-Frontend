import { Comment } from "@/types/index"
import { calculateDaysDifference } from '../../utils/dates';

const UserComment = ({ comment }: { comment: Comment }) => {
    return (
        <div className="bg-background-light dark:bg-border-dark my-5 p-3 rounded-lg w-full">
            <div className="flex gap-5">
                <p className="text-text-light dark:text-text-dark font-bold text-lg">Oso </p>
                <p className="text-text-light dark:text-text-dark font-light text-lg">{calculateDaysDifference(comment.createdAt)}</p>
            </div>
            <p className="text-text-light dark:text-text-dark mt-3">{comment.comment}</p>
        </div>
    )
}

export default UserComment;
