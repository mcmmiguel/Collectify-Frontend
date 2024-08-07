import { z } from 'zod';

const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
});

type Auth = z.infer<typeof authSchema>;

export type UserLoginForm = Pick<Auth, 'email' | 'password'>;
export type UserRegisterForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>;