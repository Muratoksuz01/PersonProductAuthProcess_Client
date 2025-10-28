import z from "zod";

const userShema=z.object({
    id:z.number(),
    name:z.string(),
    surname:z.string(),
    password:z.string(),
    gsmNumber:z.number(),
    userPhotoUrl:z.string(),
})
export type User=z.infer<typeof userShema>


export const signUpUserShemaForm=z.object({
    id:z.number().optional(),
    name:z.string(),
    surname:z.string(),
    password:z.string(),
    gsmNumber:z.string().min(10,"en az 10 karakter olmalı").max(10,"en fazla 10 karakter olmalı").startsWith("5","telefon numarası 5 ile baslamalı "),
    userPhotoUrl:z.file().optional(),
})
export const loginUserShemaForm=z.object({
    gsmNumber:z.string().min(10,"en az 10 karakter olmalı").max(10,"en fazla 10 karakter olmalı").startsWith("5","telefon numarası 5 ile baslamalı "),
    password:z.string().min(4,"en az 4 karakter olmalı"),
})
