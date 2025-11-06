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
import { myRegex } from "@/lib/myRegex"
import { useEffect, useRef, useState } from "react"
import { TextInput } from "./TextInput"
import { NumberInput } from "./NumberInput"
import { axiosInstance } from "@/Request/axiosInstance"
import { API_PATH } from "@/Request/API_PATH"
import FileInput from "./FileInput"
import axios from "axios"
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
    const form = useForm<z.infer<typeof editProductSchema>>({
        resolver: zodResolver(editProductSchema),
        defaultValues: {
            name: "",
            price: 0,
            barkod: 0,
         //   imageUrl: "",
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
    //    const formData=new FormData()
    //     formData.append("name",data.name)
    //     formData.append("barkod",String(data.barkod))
    //     formData.append("imageFile",selectedImage! )
    //     formData.append("price",String(data.price))
        console.log("gonderilen data:", data)
        console.log("gonderilen data typr:", typeof data)
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

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>create Product</DialogTitle>
                    <Separator />
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleCreate)}
                            className="space-y-6"
                        >

                            <CustomForms control={form.control} name="name" title="İsmi">
                                {(field: any) => (
                                    <TextInput placeholder="Uurn İsmi"
                                        //  kisitlama={myRegex.telefon}
                                        value={field.value}
                                        onchange={field.onChange} />
                                )}
                            </CustomForms>
                            <CustomForms control={form.control} name="price" title="Fiyatı">
                                {(field: any) => (
                                    <NumberInput placeholder="Uurn Fiyatı"
                                        //  kisitlama={myRegex.telefon}
                                        value={field.value}
                                        onchange={field.onChange} />
                                )}
                            </CustomForms>
                            <CustomForms control={form.control} name="barkod" title="Barkod">
                                {(field: any) => (
                                    <NumberInput placeholder="Uurn Barkod"
                                        //  kisitlama={myRegex.telefon}
                                        value={field.value}
                                        onchange={field.onChange} />
                                )}
                            </CustomForms>
                           <CustomForms control={form.control} name="imageFile" title="Kullanıcı resmi">
                                {(field: any) => (
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="">
                                            {selectedImage ? (
                                                <img
                                                    src={selectedImage}
                                                    alt="Kullanıcı Fotoğrafı"
                                                    className="w-24 h-24  object-cover border border-gray-300 shadow"
                                                />

                                            ) :
                                                (
                                                    <div className="p-10 border border-gray-300 shadow cursor-pointer" onClick={() => ref.current?.click()}>Resim ekle</div>
                                                )
                                            }
                                        </div>
                                        <FileInput ref={ref} onchange={field.onChange} setImagePreview={setSelectedImage} className="hidden" />

                                    </div>

                                )}
                            </CustomForms>
                         
                            <Button type="submit" > kayıt</Button>


                        </form>
                    </Form>
                    <p className="text-red-900">{error}</p>

                </DialogHeader>
            </DialogContent>
        </Dialog>
    )


}