import { Collection, User } from "../types";

const hasOwnership = (collectionOwner: Collection['owner'], user: User | undefined) => (collectionOwner === user?._id) || user?.isAdmin;

export default hasOwnership;