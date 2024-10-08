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
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const authUserSchema = authSchema.pick({
    name: true,
    email: true,
}).extend({
    _id: z.string(),
    isBlocked: z.boolean(),
    isAdmin: z.boolean(),
});

export const allUsersSchema = z.array(
    userSchema.pick({
        _id: true,
        name: true,
        email: true,
        isBlocked: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
    }),
);

export type AuthUser = z.infer<typeof authUserSchema>;
export type User = z.infer<typeof userSchema>;

// COMMENTS
export const commentSchema = z.object({
    item: z.string(),
    author: z.object({
        _id: z.string(),
        name: z.string(),
    }),
    comment: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type Comment = z.infer<typeof commentSchema>;
export type CommentFormData = Pick<Comment, 'comment'>;


// LIKES
export const likeSchema = z.object({
    item: z.string(),
    author: z.object({
        _id: z.string(),
        name: z.string(),
    }),
});

export type Like = z.infer<typeof likeSchema>;

const customFieldSchema = z.object({
    fieldName: z.string(),
    value: z.union([z.string(), z.number(), z.boolean(), z.date()]),
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
    customFields: z.optional(z.array(customFieldSchema)),
});

export const itemWithCollectionSchema = itemSchema.pick({
    _id: true,
    itemName: true,
    description: true,
    image: true,
    comments: true,
    likes: true,
    createdAt: true,
    updatedAt: true,
}).extend({
    itemCollection: z.object({
        _id: z.string(),
        collectionName: z.string(),
        owner: z.object({
            _id: z.string(),
            name: z.string(),
        })
    }),
})

export type Item = z.infer<typeof itemSchema>;
export type ItemWithCollection = z.infer<typeof itemWithCollectionSchema>;
export type ItemFormData = Pick<Item, 'itemName' | 'description' | 'image'> & {
    customFields?: {
        fieldName: string;
        value: string | number | boolean | Date | undefined;
    }[];
};


// CATEGORIES
export const categorySchema = z.object({
    _id: z.string(),
    categoryName: z.string()
});

export const categoryIdSchema = categorySchema.pick({
    _id: true,
})

export type Category = z.infer<typeof categorySchema>;


// COLLECTIONS
export const collectionSchema = z.object({ //Collection without populated items and owner name
    _id: z.string(),
    collectionName: z.string(),
    description: z.optional(z.string()),
    category: z.string(),
    owner: z.string(),
    items: z.optional(z.array(
        z.string(),
    )),
    image: z.optional(z.string()),
});

export const ownerCategoryCollection = collectionSchema.pick({
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
    category: categorySchema,
});

export const fullCollectionSchema = collectionSchema.pick({ //Collection with populated items
    _id: true,
    collectionName: true,
    description: true,
    image: true,
}).extend({
    items: z.optional(z.array(
        itemSchema,
    )),
    owner: userSchema.pick({
        _id: true,
        name: true,
    }),
    category: categorySchema,
    customFields: z.optional(z.array(
        z.object({ fieldName: z.string(), fieldType: z.string() }),
    )),
});

export type CustomField = {
    fieldName: string;
    fieldType: 'number' | 'string' | 'boolean' | 'date' | '';
};

export type CustomItemField = {
    fieldName: string;
    value: string | number | boolean | Date | '';
};

export type Collection = z.infer<typeof collectionSchema>;
export type OwnerCategoryCollection = z.infer<typeof ownerCategoryCollection>;
export type FullCollection = z.infer<typeof fullCollectionSchema>;
export type CollectionFormData = Pick<Collection, 'collectionName' | 'description' | 'image' | 'category'> & {
    customFields?: CustomField[];
};


// CLOUDINARY IMAGES
export type ImageFormData = {
    image: File[];
};


// SALESFORCE
export const salesforceContact = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phone: z.string(),
});

export type SalesforceContact = z.infer<typeof salesforceContact>;
export type SalesforceContactForm = Pick<SalesforceContact, 'firstName' | 'lastName' | 'email' | 'phone'>;
