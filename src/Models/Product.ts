import { z } from "zod";

export const productSchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    barkod: z.number(),
    imageUrl: z.string().url()
});

export type Product = z.infer<typeof productSchema>;
export const editProductSchema = z.object({
    id: z.number().optional(),
    name: z.string("name is reqwuired ").nonempty("İsim zorunlu"),
    price: z.string().nonempty("price bos olamaz "),
    barkod: z.string().nonempty("bos olamaz "),
    // imageUrl: z.string(),
 //   imageFile: z.instanceof(File).optional()
});
export const createProductSchema = z.object({
    name: z.string("name is reqwuired ").nonempty("İsim zorunlu"),
    price: z.string().nonempty("price bos olamaz "),
    barkod: z.string().nonempty("bos olamaz "),
    imageFile: z.instanceof(File,{error:"file yuklenmelidir"})
});