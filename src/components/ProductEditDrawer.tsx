"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
// import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { editProductSchema, type Product } from "@/Models/Product"
import { Separator } from "@radix-ui/react-separator"
import { useForm } from "react-hook-form"
import type z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "./ui/form"
import CustomForms from "./CustomForms"
import { TextInput } from "./TextInput"
import { myRegex } from "@/lib/myRegex"
import { useEffect, useRef, useState } from "react"
import { axiosInstance } from "@/Request/axiosInstance"
import { API_PATH } from "@/Request/API_PATH"
import { NumberInput } from "./NumberInput"
import { toast } from "sonner"
import { toastSuccessStyle } from "@/lib/ToastStyles"
interface Gelenler {
    product: Product
    setOpenDrawer: Function
    openDrawer: boolean
    getProducts: Function,
    onClick?: React.MouseEventHandler<HTMLButtonElement>

}
export function ProductEditDrawer({ product, openDrawer, getProducts, setOpenDrawer }: Gelenler) {
    // const isDesktop = useMediaQuery("(min-width: 768px)")
    // const imageRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("")
    const [selectedImage, setSelectedImage] = useState("")
    const form = useForm<z.infer<typeof editProductSchema>>({
        resolver: zodResolver(editProductSchema),
        defaultValues: {
            name: "",
            price: 0,
            barkod: 0,
            // imageUrl: "",
            // imageFile: undefined,
        },
    });
    useEffect(() => {
        if (product.imageUrl) {
            setSelectedImage(product.imageUrl)
            console.log(product)
        }
        form.reset({
            name: product.name,
            price: product.price,
            barkod: product.barkod,
            //   imageUrl: product.imageUrl,
            //  imageFile: undefined,
        })
    }, [product])

    const handleEdit = async () => {                                                                                                                 //doldur burayı 
        const data = form.getValues()
        console.log("gonderilen data:", data)
        // gelen datatyı direk gonder backendde kontrol edecegiz fiel varmı yokmu varsa kayıt yoksa aynen devam 
        await axiosInstance.put(API_PATH.editProduct(String(product.id)), data).then((res => {
            if (!res.data.error) {
                toast.success("uurn guncellendi", { style: toastSuccessStyle })
                getProducts()
                setOpenDrawer(false)
            }
            else {
                setError(error.toString())
            }
        })).catch(err => {
            console.log(err)
            setError(error.toString())

        })
    }
    return (
        <Dialog open={openDrawer} onOpenChange={(state) => {
            setOpenDrawer(state)
            // form.reset()

        }}>
            <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold ">Edit Product</DialogTitle>
                    {/* <Separator /> */}
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleEdit)}
                        className="flex flex-col md:flex-row gap-8 "
                    >
                        {/* Sol kısım - Resim */}
                        <div className="flex flex-col items-center justify-center w-full md:w-1/2">
                            <img
                                src={selectedImage}
                                alt="Preview"
                                className="rounded-lg shadow-md w-full max-w-xs h-52 object-cover"
                            />
                        </div>

                        {/* Sağ kısım - Inputlar */}
                        <div className="w-full md:w-1/2 space-y-6">
                            <CustomForms control={form.control} name="name" title="İsmi">
                                {(field: any) => (
                                    <TextInput
                                        placeholder="Ürün İsmi"
                                        value={field.value}
                                        onchange={field.onChange}
                                    />
                                )}
                            </CustomForms>

                            <CustomForms control={form.control} name="price" title="Fiyatı">
                                {(field: any) => (
                                    <NumberInput
                                        placeholder="Ürün Fiyatı"
                                        value={field.value}
                                        onchange={field.onChange}
                                    />
                                )}
                            </CustomForms>

                            <CustomForms control={form.control} name="barkod" title="Barkod">
                                {(field: any) => (
                                    <NumberInput
                                        placeholder="Ürün Barkod"
                                        value={field.value}
                                        onchange={field.onChange}
                                    />
                                )}
                            </CustomForms>

                            <Button type="submit" className="w-full">Güncelle</Button>
                        </div>
                    </form>
                </Form>

                {error && <p className="text-red-900 text-center mt-4">{error}</p>}
            </DialogContent>

        </Dialog>
    )

}


{/* <CustomForms control={form.control} name="imageFile" title="urun resmi">
                                {(field: any) => (
                                    <div>
                                       
                                        <div
                                            onClick={() => imageRef.current!.click()}
                                            className="w-full h-40 border-2 border-dashed flex items-center justify-center cursor-pointer rounded"
                                        >
                                            {selectedImage ? (
                                                <img
                                                    src={selectedImage}
                                                    alt="Preview"
                                                    className="  h-full  rounded"

                                                />
                                            ) : (
                                                <span>Resim Sec</span>
                                            )}
                                        </div>

                                        <Input
                                            type="file"
                                            ref={imageRef}
                                            accept="image/*"
                                            name={field.name}
                                            onBlur={field.onBlur}
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                field.onChange(file);
                                                setSelectedImage(file ? URL.createObjectURL(file) : "");
                                                //    setIsChangedImage(true)
                                            }}
                                        /> 

                                    </div>
                                )}
                            </CustomForms> */}