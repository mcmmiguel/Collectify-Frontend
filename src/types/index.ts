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



// COLLECTIONS
export const collectionSchema = z.object({
    _id: z.string(),
    collectionName: z.string(),
    description: z.optional(z.string()),
    items: z.optional(z.array(
        z.string(),
    )),
    image: z.optional(z.string()),
    owner: z.string(),
});

export const allCollectionsSchema = z.array(
    collectionSchema.pick({
        _id: true,
        collectionName: true,
        description: true,
        image: true,
        owner: true,
        items: true,
    })
);
export type Collection = z.infer<typeof collectionSchema>;
export type CollectionFormData = Pick<Collection, 'collectionName' | 'description' | 'image'>;





// CLOUDINARY IMAGES
export type ImageFormData = {
    image: File[];
};
