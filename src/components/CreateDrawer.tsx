"use client"

import * as React from "react"
// import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import { createProductSchema } from "@/Models/Product"
import { Separator } from "@radix-ui/react-separator"
import { useForm } from "react-hook-form"
import type z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "./ui/form"
import CustomForms from "./CustomForms"
import { myRegex } from "@/lib/myRegex"
import { useRef, useState } from "react"
import { TextInput } from "./TextInput"
import { axiosInstance } from "@/Request/axiosInstance"
import { API_PATH } from "@/Request/API_PATH"
import FileInput from "./FileInput"
import { toast } from "sonner"
import { toastSuccessStyle } from "@/lib/ToastStyles"
interface Gelenler {
    setOpenCreateDrawer: Function
    openCreateDrawer: boolean
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    getProducts: Function

}
export function DrawerCreateDialog({ openCreateDrawer, setOpenCreateDrawer, getProducts }: Gelenler) {
    // const isDesktop = useMediaQuery("(min-width: 768px)")
    const [error, setError] = useState("")

    const ref = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<string>()
    const form = useForm<z.infer<typeof createProductSchema>>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            name: "",
            price: "",
            barkod: "",
            imageFile: undefined,
        },
    });
    const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }

    const handleCreate = async () => {                                                                                                                 //doldur burayı 
        let data = form.getValues()

        console.log("gonderilen data:", data)
        await axiosInstance.post(API_PATH.createProduct, data,config).then(res => {
            if (!res.data.error) {
                toast.success("uurn eklendi", { style: toastSuccessStyle })
                getProducts()
                setOpenCreateDrawer(false)

                form.reset()
                setSelectedImage("")
                ref.current!.value = ""
            } else {
                setError(error.toString())
            }
        }).catch(err => {
            console.log("create error:",err)
            setError(err.toString())

        })

    }
    return (
        <Dialog open={openCreateDrawer} onOpenChange={(state) => {
            setOpenCreateDrawer(state)
            form.reset()
            setSelectedImage("")
            setError("")
            ref.current!.value = ""

        }}>

            <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-center mb-2">
                        Create Product
                    </DialogTitle>
                    <Separator className="mb-4" />
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleCreate)}
                        className="flex flex-col md:flex-row gap-1"
                    >
                        {/* Sol kısım - Resim */}
                        <div className="flex flex-col items-center justify-center w-full md:w-1/2">
                            <CustomForms control={form.control} name="imageFile" title="Ürün Görseli">
                                {(field: any) => (
                                    <div className="flex flex-col items-center gap-6 w-full">
                                        {selectedImage ? (
                                            <img
                                                src={selectedImage}
                                                alt="Ürün Fotoğrafı"
                                                className="rounded-xl shadow-lg w-full max-w-sm h-72 object-contain  bg-gray-50"
                                            />
                                        ) : (
                                            <div
                                                className="p-16 border-2 border-dashed border-gray-400 shadow-sm cursor-pointer rounded-xl text-gray-500 hover:bg-gray-100 transition"
                                                onClick={() => ref.current?.click()}
                                            >
                                                Resim ekle
                                            </div>
                                        )}
                                        <FileInput
                                            ref={ref}
                                            onchange={field.onChange}
                                            setImagePreview={setSelectedImage}
                                            className="hidden"
                                        />
                                    </div>
                                )}
                            </CustomForms>
                        </div>


                        {/* Sağ kısım - Form inputları */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6">
                            <CustomForms control={form.control} name="name" title="Ürün İsmi">
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
                                    <TextInput
                                        placeholder="Ürün Fiyatı"
                                        kisitlama={myRegex.fiyat}
                                        value={field.value}
                                        onchange={field.onChange}
                                    />
                                )}
                            </CustomForms>

                            <CustomForms control={form.control} name="barkod" title="Barkod">
                                {(field: any) => (
                                    <TextInput
                                        placeholder="Ürün Barkodu"
                                        kisitlama={myRegex.fiyat}
                                        value={field.value}
                                        onchange={field.onChange}
                                    />
                                )}
                            </CustomForms>

                            <Button type="submit" className="w-full">
                                Kaydet
                            </Button>
                        </div>
                    </form>
                </Form>

                <p className="text-red-900 text-center mt-3">{error}</p>
            </DialogContent>

        </Dialog>
    )


}