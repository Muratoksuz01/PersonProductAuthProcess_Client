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
    name: z.string(),
    price: z.number(),
    barkod: z.number(),
    // imageUrl: z.string(),
 //   imageFile: z.instanceof(File).optional()
});