import { AuthUser, Collection } from "../types";

const hasOwnership = (collectionOwner: Collection['owner'], user: AuthUser | undefined) => (collectionOwner === user?._id) || user?.isAdmin;

export default hasOwnership;