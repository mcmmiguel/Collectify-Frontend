import { Collection } from '@/types/index';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

type CollectionCardProps = {
    collection: Collection;
}

const CollectionCard = ({ collection }: CollectionCardProps) => {

    return (
        <div className="w-64 min-h-96 bg-background-light dark:bg-border-dark rounded-lg p-3 my-5 flex flex-col justify-between">
            <div className="flex justify-between">
                <p className="block bg-background-light dark:bg-background-dark border border-secondary-dark  text-secondary-dark rounded-lg px-3 py-0.5">Owner</p>
                <Link
                    to={`/collections/${collection._id}`}
                    className="flex items-center gap-1 px-3 py-0.5 bg-background-dark dark:bg-background-light text-text-dark dark:text-text-light rounded-lg cursor-pointer"
                >
                    Explore <ArrowUpRightIcon width={15} height={15} />
                </Link>
            </div>
            <div>
                <p className="text-text-light dark:text-text-dark font-bold text-xl my-3">
                    {collection.collectionName}
                </p>
                <p className="text-text-light dark:text-text-dark my-3 break-words">
                    {collection.description}
                </p>
            </div>
            <div className='h-52 overflow-hidden rounded-lg'>
                <p>TAGS</p>
                <img
                    src={collection.image ? collection.image : '/image-default.jpg'}
                    alt={collection.collectionName}
                    className="w-full h-full object-contain rounded-lg"
                />
            </div>
        </div>
    )
}
export default CollectionCard