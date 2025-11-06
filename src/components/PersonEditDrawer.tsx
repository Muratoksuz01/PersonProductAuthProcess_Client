"use client"

import * as React from "react"
// import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import { Separator } from "@radix-ui/react-separator"
import { useForm } from "react-hook-form"
import type z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "./ui/form"
import CustomForms from "./CustomForms"
import { TextInput } from "./TextInput"
import { useEffect, useState } from "react"
import { axiosInstance } from "@/Request/axiosInstance"
import { API_PATH } from "@/Request/API_PATH"
import { toast } from "sonner"
import { toastSuccessStyle } from "@/lib/ToastStyles"
import { editPersonShemaForm, type User } from "@/Models/User"
import { CheckBoxInput } from "./CheckBoxInput"
interface Gelenler {
    person: User,
    setOpenDrawer: Function
    openDrawer: boolean
    getPersons: Function,
    onClick?: React.MouseEventHandler<HTMLButtonElement>

}
export function PersonEditDrawer({ person, openDrawer, getPersons, setOpenDrawer }: Gelenler) {
    // const isDesktop = useMediaQuery("(min-width: 768px)")
    // const imageRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("")
   // const [selectedImage, setSelectedImage] = useState("")
    const form = useForm<z.infer<typeof editPersonShemaForm>>({
        resolver: zodResolver(editPersonShemaForm),
        defaultValues: {
            id: undefined,
            isAdmin: undefined,
            
        },
    });
    useEffect(() => {
        
        form.reset({
            id: person.id,
            isAdmin: person.isAdmin,
          
        })
    }, [person])

    const handleEdit = async () => {                                                                                                                 //doldur burayı 
        const data = form.getValues()
        console.log("gonderilen data:", data)
        // gelen datatyı direk gonder backendde kontrol edecegiz fiel varmı yokmu varsa kayıt yoksa aynen devam 
        await axiosInstance.put(API_PATH.editPerson(String(person.id)), data).then((res => {
            console.log("edit sonrasi resposne:",res)
            if (res.data.success) {
                toast.success("kişi guncellendi", { style: toastSuccessStyle })
                getPersons()
                setOpenDrawer(false)
            }
            else {
                setError(res.data.message)
            }
        })).catch(err => {
            console.log(err)
            setError(err)

        })
    }
    return (
        <Dialog open={openDrawer} onOpenChange={(state) => {
            setOpenDrawer(state)
            

        }}>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Person</DialogTitle>
                    <Separator />
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleEdit)}
                            className="space-y-6"
                        >
                            <CustomForms control={form.control} name="id" title="id'si" className="hidden">
                                {(field: any) => (
                                    <TextInput
                                        //  kisitlama={myRegex.telefon}
                                        value={field.value}
                                        onchange={field.onChange} />
                                )}
                            </CustomForms>
                            <CustomForms control={form.control} name="isAdmin" title="Yetkisi">
                                {(field: any) => (
                                    <CheckBoxInput
                                        value={field.value}
                                        onchange={field.onChange} />
                                )}
                            </CustomForms>
                           <Button type="submit" > update</Button>
                        </form>
                    </Form>
                    <p className="text-red-900">{error}</p>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )

}

 {/* <CustomForms control={form.control} name="name" title="İsmi">
                                {(field: any) => (
                                    <TextInput placeholder="Uurn İsmi"
                                        //  kisitlama={myRegex.telefon}
                                        value={field.value}
                                        onchange={field.onChange} />
                                )}
                            </CustomForms>
                            <CustomForms control={form.control} name="surname" title="Surname">
                                {(field: any) => (
                                    <TextInput placeholder="kisi Soyadı"
                                        //  kisitlama={myRegex.telefon}
                                        value={field.value}
                                        onchange={field.onChange} />
                                )}
                            </CustomForms>
                            <CustomForms control={form.control} name="number" title="tlefon numarsaı">
                                {(field: any) => (
                                    <NumberInput placeholder="telefon numarası"
                                        //  kisitlama={myRegex.telefon}
                                        value={field.value}
                                        onchange={field.onChange} />
                                )}
                            </CustomForms> */}