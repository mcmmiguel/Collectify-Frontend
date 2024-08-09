import { ArrowUpRightIcon } from '@heroicons/react/24/outline';


const image = 'https://res.cloudinary.com/dmrhtcc5z/image/upload/v1723086987/collectify/logo-black_hx0n7d.png';

const CollectionCard = () => {

    return (
        <div className="w-64 min-h-80 bg-background-light dark:bg-border-dark rounded-lg p-3">
            <div className="flex justify-between">
                <p className="block bg-background-light dark:bg-background-dark border border-secondary-dark  text-secondary-dark rounded-lg px-3 py-0.5">Miguel Cobian</p>
                <button className="flex items-center gap-1 px-3 py-0.5 bg-background-dark dark:bg-background-light text-text-dark dark:text-text-light rounded-lg cursor-pointer">
                    Visit <ArrowUpRightIcon width={15} height={15} />
                </button>
            </div>
            <p className="text-text-light dark:text-text-dark font-bold text-xl my-3">Nombre de la colección</p>
            <div>TAGS</div>
            <p className="text-text-light dark:text-text-dark my-3" >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis, pariatur. Soluta obcaecati vero libero</p>
            <img
                src={image}
                alt="Imagen de collecion"
                className="h-1/3 w-full object-contain"
            />
        </div>
    )
}
export default CollectionCard