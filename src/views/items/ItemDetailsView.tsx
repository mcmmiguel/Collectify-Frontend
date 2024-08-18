import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ArrowLeftIcon, HeartIcon, PaperAirplaneIcon } from "@heroicons/react/20/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import UserComment from "@/components/comments/UserComment";
import { getItemById } from "@/api/ItemAPI";
import socket from "@/lib/socket";
import { useAuth } from "@/hooks/useAuth";
import defaultImage from '/image-default.jpg';
import { CommentFormData, Comment, Like } from "@/types/index";
import { useTranslation } from "react-i18next";

const ItemDetailsView = () => {

    const { t } = useTranslation();

    const initialValues: CommentFormData = {
        comment: '',
    }

    const [comments, setComments] = useState<Comment[]>([]);
    const [likes, setLikes] = useState<Like[]>([]);

    const [isLiked, setIsLiked] = useState(false);

    const params = useParams();
    const collectionId = params.collectionId!;
    const itemId = params.itemId!;

    const { user } = useAuth();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['item', itemId],
        queryFn: () => getItemById({ collectionId, itemId }),
    });

    const { register, handleSubmit, reset, watch } = useForm({ defaultValues: initialValues });

    const commentField = watch('comment');

    const handleCreateComment = (formData: CommentFormData) => {
        if (!formData.comment) return;
        socket.emit("createComment", { item: itemId, comment: formData.comment, author: user?._id });
        reset();
    }

    const handleLike = () => {
        if (isLiked) {
            socket.emit('deleteLike', { item: itemId, author: user?._id });
            setIsLiked(!isLiked);
        } else {
            socket.emit("createLike", { item: itemId, author: user?._id });
            setIsLiked(!isLiked);
        }
    }

    useEffect(() => {
        const liked = likes.some(like => like.author._id === user?._id);
        setIsLiked(liked);
    }, [likes, user?._id]);

    useEffect(() => {
        socket.emit("joinItemRoom", itemId);

        socket.on("loadLikes", (data: { itemId: string, likes: Like[] }) => {
            if (data.itemId === itemId) {
                setLikes(data.likes);
            }
        });

        socket.on("likeDeleted", () => {
            socket.emit("loadLikes", itemId);
        });

        socket.on("loadComments", (data: { itemId: string, comments: Comment[] }) => {
            if (data.itemId === itemId) {
                setComments(data.comments);
            }
        });

        socket.on("comment", (newComment: Comment) => {
            if (newComment.item === itemId) {
                setComments((prevComments) => [...prevComments, newComment]);
            }
        });

        return () => {
            socket.off("loadComments");
            socket.off("comment");
            socket.off("loadLikes");
            socket.off("likeDeleted");
        };
    }, [itemId]);

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <Navigate to={`/collections/${collectionId}`} />

    if (data) return (
        <>
            <div className="flex justify-between items-center mb-10">
                <Link
                    to={`/collections/${collectionId}`}
                    className="flex items-center border border-primary-light w-fit p-2 text-primary-light gap-3 rounded-lg"
                >
                    <ArrowLeftIcon width={35} height={35} className="fill-primary-light" />
                </Link>

                {user &&
                    <button type="button" onClick={handleLike}>
                        {isLiked
                            ? <HeartIcon width={45} height={45} className="fill-primary-light" />
                            : <HeartOutline width={45} height={45} color="#3b82f6" />
                        }
                    </button>
                }
            </div>

            <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="col-span-1 rounded-lg max-h-96 relative">
                    <img
                        className="w-full h-full object-contain rounded-lg  object-top "
                        src={data.image || defaultImage}
                        alt={data.itemName}
                    />
                </div>

                <div className="col-span-2">
                    <h1 className="text-5xl font-black text-text-light dark:text-text-dark">
                        {data.itemName}
                    </h1>
                    <p className="text-2xl font-light text-text-light dark:text-text-dark mt-5">
                        {data.description}
                    </p>
                </div>
            </div>

            <p className="text-text-light dark:text-text-dark font-bold text-2xl my-5">{t("ItemView_AddAComment")}</p>

            {user &&
                <form
                    className='mt-5 space-y-3'
                    noValidate
                    onSubmit={handleSubmit(handleCreateComment)}
                >
                    <div className="flex gap-4 p-3 w-full border border-border-light rounded-lg items-center">
                        <input
                            id="comment"
                            {...register('comment')}
                            placeholder={t("ItemView_CommentAs", { name: user.name })}
                            className="w-full h-full focus:outline-none bg-transparent"
                        />

                        <button type="submit" disabled={commentField.length === 0}>
                            <PaperAirplaneIcon width={35} height={35} className={`${commentField.length === 0 ? "fill-border-light" : "fill-secondary-light"}`} />
                        </button>
                    </div>
                </form>
            }

            {comments.length === 0
                ? <p className="text-text-light dark:text-text-dark font-bold text-lg my-5">{t("ItemView_NoComments")}</p>
                : (
                    comments.map((comment, index) => (
                        <UserComment key={index} comment={comment} />
                    ))
                )}

        </>
    )
}
export default ItemDetailsView;