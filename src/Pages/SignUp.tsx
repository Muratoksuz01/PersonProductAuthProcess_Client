import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpUserShemaForm } from "@/Models/User";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import resim from "@/assets/NO_USER.png";
import { Badge } from "@/components/ui/badge"
import { useDispatch } from 'react-redux'
import { registerUser } from '@/features/auth/authActions'
import { Link, useNavigate } from "react-router-dom";
import type { AppDispatch } from "@/app/store";
import {TextInput} from "@/components/TextInput";
import FileInput from "@/components/FileInput";
import CustomForms from "@/components/CustomForms";
import { myRegex } from "@/lib/myRegex";

function SignUpPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const form = useForm<z.infer<typeof signUpUserShemaForm>>({
    resolver: zodResolver(signUpUserShemaForm),
    defaultValues: {
      gsmNumber: "",
      name: "",
      surname: "",
      password: "",
      profileImg: undefined,
    },
  });
  const handleSubmit = async() => {
    let data = form.getValues()
    console.log("sign up form:", data);
    console.log("sign up form typr",typeof data);
    // axiosInstance.post(API_PATH.register, data);
    await dispatch(registerUser(data)).then(res=>{
      console.log("dogru alan:",res)
      if(res.type!="auth/register/rejected")
          navigate("/login")
    }).catch(e=>{
      console.log("hata alan:",e)
    })
    

  };

  const ref = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState(resim);
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-tr from-blue-100 to-blue-300">
      <Card className="w-full max-w-lg bg-white shadow-2xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-blue-700">
            Kayıt Ol
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <CustomForms control={form.control} name="name" title="Ad">
                  {(field: any) => (
                    <TextInput placeholder="Adınızı girin"
                      value={field.value}
                      onchange={field.onChange} />
                  )}
                </CustomForms>

                <CustomForms control={form.control} name="surname" title="Soyad">
                  {(field: any) => (
                    <TextInput placeholder="Soyadınızı girin"
                      value={field.value}
                      onchange={field.onChange} />
                  )}
                </CustomForms>
              </div>
              <CustomForms control={form.control} name="gsmNumber" title="Telefon">
                {(field: any) => (
                  <TextInput placeholder="5XXXXXXXXX"
                  kisitlama={myRegex.telefon}
                    value={field.value}
                    onchange={field.onChange} />
                )}
              </CustomForms>

              <CustomForms control={form.control} name="password" title="Şifre">
                {(field: any) => (
                  <TextInput placeholder="********" type="password"
                    value={field.value}
                    kisitlama={myRegex.sifre}
                    onchange={field.onChange} />
                )}
              </CustomForms>
           
              <CustomForms control={form.control} name="profileImg" title="Kullanıcı resmi">
                {(field: any) => (
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative w-24 h-24">
                      <img
                        src={imagePreview}
                        alt="Kullanıcı Fotoğrafı"
                        className="w-24 h-24 rounded-full object-cover border border-gray-300 shadow"
                      />
                      {imagePreview != resim &&
                        <Badge
                          onClick={() => {
                            ref.current!.value = ""
                            setImagePreview(resim)
                          }}
                          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-red-500 text-white cursor-pointer"
                        >
                          X
                        </Badge>}

                    </div>
                    <FileInput ref={ref} onchange={field.onChange} setImagePreview={setImagePreview} className="hidden" />
                    <Button
                      type="button"
                      onClick={() => ref.current?.click()}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Fotoğraf Seç
                    </Button>
                  </div>

                )}
              </CustomForms>
              <CustomForms control={form.control} name="adminPassword" title="Yonetici sifresi">
                {(field: any) => (
                  <TextInput placeholder="yetki sifresi"
                    value={field.value}
                    onchange={field.onChange} />
                )}
              </CustomForms>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2"
              >
                Kayıt Ol
              </Button>
            </form>
          </Form>
          <Link to="/login" className="text-blue-400  underline">hesabım var</Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUpPage;
