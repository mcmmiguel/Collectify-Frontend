import { Fragment, useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import imageDefault from '/image-default.jpg';
import { useAuth } from '@/hooks/useAuth';
import hasOwnership from '@/utils/policies';
import { FullCollection, Item, Like } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteItem } from '@/api/ItemAPI';
import { toast } from 'react-toastify';
import { HeartIcon } from '@heroicons/react/24/outline';
import socket from '@/lib/socket';

type ItemCardProps = {
    item: Item;
    collection: FullCollection;
}

const ItemCard = ({ item, collection }: ItemCardProps) => {

    const [comments, setComments] = useState<Comment[]>([]);
    const [likes, setLikes] = useState<Like[]>([]);

    const navigate = useNavigate();

    const params = useParams();
    const collectionId = params.collectionId!;

    const { user } = useAuth();

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: deleteItem,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['collection', collectionId] })
            toast.success(data);
        }
    });

    useEffect(() => {
        socket.emit("joinItemRoom", item._id);

        socket.on("loadLikes", (data: { itemId: string, likes: Like[] }) => {
            if (data.itemId === item._id) {
                setLikes(data.likes);
            }
        });

        socket.on("loadComments", (data: { itemId: string, comments: Comment[] }) => {
            if (data.itemId === item._id) {
                setComments(data.comments);
            }
        });

        return () => {
            socket.off("loadComments");
            socket.off("loadLikes");
        };
    }, [item._id]);

    return (
        <li className="flex relative justify-between gap-x-6 px-5 py-8 bg-background-light dark:bg-background-dark rounded-lg">
            <div className="flex min-w-0 gap-x-4">
                <div className='w-32 h-32 flex-shrink-0 self-center'>
                    <img className='w-full h-full object-contain rounded-lg' src={item.image ? item.image : imageDefault} alt={item.itemName} />
                </div>
                <div className="min-w-0 flex-auto space-y-2">
                    <div className='mb-2'>
                        {hasOwnership(collection.owner, user) &&
                            <p className='font-bold text-xs uppercase bg-transparent text-primary-light dark:text-primary-light-dark border-2 border-primary-light dark:border-primary-light-dark rounded-lg inline-block py-1 px-5'>Manager</p>
                        }
                    </div>
                    <Link
                        to={`/collections/${collectionId}/items/${item._id}`}
                        className="text-text-light dark:text-text-dark cursor-pointer hover:underline text-3xl font-bold"
                    >
                        {item.itemName}
                    </Link>
                    <p className="text-sm text-text-light dark:text-text-dark">
                        {item.description}
                    </p>
                </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-6">
                <Menu as="div" className="relative flex-none">
                    <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">opciones</span>
                        <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                    </MenuButton>
                    <Transition as={Fragment} enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <MenuItems
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-background-light dark:bg-border-dark py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                        >
                            <MenuItem>
                                <Link
                                    to={`/collections/${collectionId}/items/${item._id}`}
                                    type='button'
                                    className='block px-3 py-1 text-sm leading-6 text-text-light dark:text-text-dark'
                                >
                                    View
                                </Link>
                            </MenuItem>

                            {hasOwnership(collection.owner, user) && (
                                <>
                                    <MenuItem>
                                        <button
                                            type='button'
                                            className='block px-3 py-1 text-sm leading-6 text-text-light dark:text-text-dark'
                                            onClick={() => navigate(location.pathname + `?editItem=${item._id}`)}
                                        >
                                            Edit
                                        </button>
                                    </MenuItem>
                                    <MenuItem>
                                        <button
                                            type='button'
                                            className='block px-3 py-1 text-sm leading-6 text-error-light dark:text-error-dark'
                                            onClick={() => mutate({ collectionId, itemId: item._id })}
                                        >
                                            Delete
                                        </button>
                                    </MenuItem>
                                </>
                            )}

                        </MenuItems>
                    </Transition>
                </Menu>
            </div>

            <div className='flex gap-5 absolute bottom-2 right-10'>
                <div className='flex items-center gap-1'>
                    <HeartIcon width={20} height={20} color='transparent' className='fill-background-dark dark:fill-background-light' />
                    <p className='text-text-light dark:text-text-dark font-light text-lg'>{likes.length}</p>
                </div>

                <div className='flex items-center gap-1'>
                    <ChatBubbleBottomCenterIcon width={20} height={20} color='transparent' className='fill-background-dark dark:fill-background-light' />
                    <p className='text-text-light dark:text-text-dark font-light text-lg'>{comments.length}</p>
                </div>
            </div>
        </li>
    )
}
export default ItemCard