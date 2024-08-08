import { FolderPlusIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';

const Fab = () => {

    const navigate = useNavigate();

    return (
        <button
            className="bg-secondary-dark hover:bg-secondary-dark-dark py-2 px-3 rounded-lg fixed bottom-10 right-10 "
            onClick={() => navigate('/collections/create')}
        >
            <div className='flex justify-between items-center gap-2'>
                <FolderPlusIcon className='w-8 h-8 text-white font-bold' />
                <p className='text-text-dark'>New Collection</p>
            </div>
        </button>
    )
}
export default Fab;