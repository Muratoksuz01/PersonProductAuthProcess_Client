import z from "zod";

export const userShema = z.object({
    id: z.number(),
    name: z.string(),
    surname: z.string(),
    password: z.string(),
    number: z.string(),
    profileImg: z.string(),
    isAdmin: z.boolean()
})
export type User = z.infer<typeof userShema>
const serviceResponse = z.object({

    success: z.boolean().optional(),
    message: z.string().optional(),
    data: z.object().optional()

})
export type ServiceResponse = z.infer<typeof serviceResponse>
export const signUpUserShemaForm = z.object({
    id: z.number().optional(),
    name: z.string(),
    surname: z.string(),
    password: z.string(),
    gsmNumber: z.string().min(10, "en az 10 karakter olmalı").max(10, "en fazla 10 karakter olmalı").startsWith("5", "telefon numarası 5 ile baslamalı "),
    profileImg: z.file().optional(),
    adminPassword: z.string().optional(),
})
export const loginUserShemaForm = z.object({
    gsmNumber: z.string().min(10, "en az 10 karakter olmalı").max(10, "en fazla 10 karakter olmalı").startsWith("5", "telefon numarası 5 ile baslamalı "),
    password: z.string().min(4, "en az 4 karakter olmalı"),
})
export const editPersonShemaForm = z.object({
    id: z.number(),
    isAdmin: z.boolean(),
  
})