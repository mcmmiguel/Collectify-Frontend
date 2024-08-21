import { OwnerCategoryCollection } from '@/types/index';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type CollectionCardProps = {
    collection: OwnerCategoryCollection;
}

const CollectionCard = ({ collection }: CollectionCardProps) => {

    const { t } = useTranslation();

    return (
        <div className="w-64 min-h-96 bg-background-light dark:bg-border-dark rounded-lg p-3 my-5 flex flex-col justify-between">
            <div className='h-36 w-full overflow-hidden rounded-lg'>
                <img
                    src={collection.image ? collection.image : '/image-default.jpg'}
                    alt={collection.collectionName}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>
            <div className="flex justify-between">
                <p className="block bg-background-light dark:bg-background-dark border border-secondary-dark text-secondary-dark rounded-lg px-3 py-0.5">
                    {collection.owner.name}
                </p>
            </div>
            <div>
                <Link to={`/collections/${collection._id}`} className="block text-text-light dark:text-text-dark font-bold text-xl">
                    {collection.collectionName}
                </Link>

                <p className='inline text-text-light dark:text-text-dark font-light text-lg'>{collection.category.categoryName}</p>

                <p className="text-text-light dark:text-text-dark my-3 break-words">
                    {collection.description}
                </p>
            </div>
            <Link
                to={`/collections/${collection._id}`}
                className="flex items-center justify-center gap-1 px-3 py-0.5 bg-background-dark dark:bg-background-light text-text-dark dark:text-text-light rounded-lg cursor-pointer"
            >
                {t("CollectionCard_Explore")} <ArrowUpRightIcon width={15} height={15} />
            </Link>

        </div>
    )
}
export default CollectionCard