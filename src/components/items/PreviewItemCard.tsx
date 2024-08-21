import { ItemWithCollection } from "@/types/index"
import { Link } from "react-router-dom";

type PreviewItemCardProps = {
    item: ItemWithCollection;
}

const PreviewItemCard = ({ item }: PreviewItemCardProps) => {
    return (
        <Link to={`/collections/${item.itemCollection._id}/items/${item._id}`}>
            <div
                className="p-5 relative h-64 bg-cover bg-center bg-no-repeat flex flex-col justify-end rounded-lg"
                style={{
                    backgroundImage: `linear-gradient(0deg, rgba(70, 70, 70, 0) 0%, rgba(140, 140, 140, 0.7) 100%), url(${item.image})`, backgroundPosition: '50% 50%'
                }}
            >
                <div className="absolute inset-0 bg-black opacity-50 rounded-lg pointer-events-none"></div>
                <h1 className="text-2xl font-black text-text-dark z-10">
                    {item.itemName}
                </h1>
                <p className="text-xl font-light text-text-dark z-10 mt-3">
                    {item.itemCollection.collectionName}
                </p>
                <p className="text-xl font-light text-text-dark z-10 mt-3">
                    By {item.itemCollection.owner.name}
                </p>
            </div>
        </Link>
    )
}
export default PreviewItemCard