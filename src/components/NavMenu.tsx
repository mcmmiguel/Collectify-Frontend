import { Fragment } from 'react'
import { Popover, Transition, Switch, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

type NavMenuProps = {
    checked: boolean;
    onChange: ((checked: boolean) => void);
}

const NavMenu = ({ checked, onChange }: NavMenuProps) => {

    const { user, logout } = useAuth();

    return (
        <Popover className="relative">
            <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-primary-light">
                <Bars3Icon className='w-8 h-8 text-white ' />
            </PopoverButton>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <PopoverPanel className="absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
                    <div className="w-full lg:w-56 shrink rounded-xl bg-background-light dark:bg-gray-700 p-4 text-sm font-semibold leading-6 text-text-light dark:text-text-dark shadow-lg ring-1 ring-gray-900/5">
                        <p className='text-center'>Hello: {user?.name}</p>
                        <Link
                            to='/profile'
                            className='block p-2 dark:text-text-dark hover:text-hover-link-light hover:dark:text-hover-link-dark'
                        >Profile</Link>
                        <Link
                            to='/admin'
                            className='block p-2 dark:text-text-dark hover:text-hover-link-light hover:dark:text-hover-link-dark'
                        >Admin panel</Link>
                        <button
                            className='block p-2 dark:text-text-dark hover:text-hover-link-light hover:dark:text-hover-link-dark'
                            type='button'
                            onClick={logout}
                        >
                            Log out
                        </button>

                        <hr />

                        <div className='p-2 flex justify-between items-center '>
                            <p>Dark mode</p>
                            <Switch
                                checked={checked}
                                onChange={onChange}
                                className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
                            >
                                <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                            </Switch>
                        </div>
                    </div>
                </PopoverPanel>
            </Transition>
        </Popover>
    )
}

export default NavMenu;