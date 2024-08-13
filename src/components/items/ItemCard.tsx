import { Fragment } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { FullCollection, Item } from '@/types/index';
import imageDefault from '/image-default.jpg';
import { useAuth } from '@/hooks/useAuth';
import hasOwnership from '@/utils/policies';

type ItemCardProps = {
    item: Item;
    collection: FullCollection;
}

const ItemCard = ({ item, collection }: ItemCardProps) => {

    const navigate = useNavigate();

    const { user } = useAuth();

    return (
        <li className="flex justify-between gap-x-6 px-5 py-8 bg-background-light dark:bg-background-dark rounded-lg">
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
                    <Link to={`/projects/${item._id}`}
                        className="text-text-light dark:text-text-dark cursor-pointer hover:underline text-3xl font-bold"
                    >{item.itemName}</Link>
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
                                <button
                                    type='button'
                                    className='block px-3 py-1 text-sm leading-6 text-text-light dark:text-text-dark'
                                >
                                    Details
                                </button>
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
                                            onClick={() => navigate(location.pathname + `?deleteItem=${item._id}`)}
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
        </li>
    )
}
export default ItemCard