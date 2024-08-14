import { z } from 'zod';

// AUTH
const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
});

type Auth = z.infer<typeof authSchema>;

export type UserLoginForm = Pick<Auth, 'email' | 'password'>;
export type UserRegisterForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>;



// USERS
export const userSchema = authSchema.pick({
    name: true,
    email: true,
}).extend({
    _id: z.string(),
    isBlocked: z.boolean(),
    isAdmin: z.boolean(),
});

export type User = z.infer<typeof userSchema>;

// COMMENTS
export const commentSchema = z.object({
    item: z.string(),
    author: z.string(),
    comment: z.string(),
});



// LIKES
export const likeSchema = z.object({
    item: z.string(),
    author: z.string(),
});


// ITEMS
export const itemSchema = z.object({
    _id: z.string(),
    itemName: z.string(),
    description: z.optional(z.string()),
    image: z.optional(z.string()),
    itemCollection: z.string(),
    comments: z.array(
        commentSchema,
    ),
    likes: z.array(
        likeSchema,
    ),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type Item = z.infer<typeof itemSchema>;
export type ItemFormData = Pick<Item, 'itemName' | 'description' | 'image'>;


// COLLECTIONS
export const collectionSchema = z.object({ //Collection without populated items and owner name
    _id: z.string(),
    collectionName: z.string(),
    description: z.optional(z.string()),
    owner: z.string(),
    items: z.optional(z.array(
        z.string(),
    )),
    image: z.optional(z.string()),
});

export const collectionWithOwner = collectionSchema.pick({ //Collection with owner name but whithout populated items
    _id: true,
    collectionName: true,
    description: true,
    image: true,
    items: true,
}).extend({
    owner: userSchema.pick({
        _id: true,
        name: true,
    }),
})

export const fullCollectionSchema = collectionSchema.pick({ //Collection with populated items
    _id: true,
    collectionName: true,
    description: true,
    image: true,
    owner: true,
}).extend({
    items: z.optional(z.array(
        itemSchema,
    )),
})

export const allCollectionsSchema = z.array( //AllCollectionsView
    collectionWithOwner.pick({
        _id: true,
        collectionName: true,
        description: true,
        image: true,
        items: true,
        owner: true,
    })
);


export type Collection = z.infer<typeof collectionSchema>;
export type CollectionWithOwner = z.infer<typeof collectionWithOwner>;
export type FullCollection = z.infer<typeof fullCollectionSchema>;
export type CollectionFormData = Pick<Collection, 'collectionName' | 'description' | 'image'>;









// CLOUDINARY IMAGES
export type ImageFormData = {
    image: File[];
};
