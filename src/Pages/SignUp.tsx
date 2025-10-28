import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpUserShemaForm } from "@/Models/User";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import resim from "@/assets/NO_USER.png";
import { Badge } from "@/components/ui/badge"
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '@/features/auth/authActions'
import { useNavigate } from "react-router-dom";
import type { RootState ,AppDispatch} from "@/app/store";

function SignUpPage() {
  
const counter  =
  useSelector((state: RootState) => state.auth);
    const navigate = useNavigate()

    const dispatch = useDispatch<AppDispatch>()  
 useEffect(() => {
    // redirect user to login page if registration was successful
    if (counter.success) navigate('/login')
    // redirect authenticated user to profile screen
    if (counter.userInfo) navigate('/user-profile')
  }, [navigate, counter.userInfo, counter.success])

    
    const form = useForm<z.infer<typeof signUpUserShemaForm>>({
      resolver: zodResolver(signUpUserShemaForm),
      defaultValues: {
        gsmNumber: "",
        name: "",
        surname: "",
        password: "",
        userPhotoUrl: undefined,
      },
    });
  const handleSubmit = () => {
    let data=form.getValues()
    console.log("sign up form:", data);
    // axiosInstance.post(API_PATH.register, data);
        dispatch(registerUser(data))

  };

const ref = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState(resim);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
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
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ad</FormLabel>
                      <FormControl>
                        <Input placeholder="Adınızı girin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="surname"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Soyad</FormLabel>
                      <FormControl>
                        <Input placeholder="Soyadınızı girin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="gsmNumber"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefon</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="5XXXXXXXXX"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şifre</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Controller
                name="userPhotoUrl"
                control={form.control}
                render={({ field }) => (
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

                    <Input
                      type="file"
                      ref={ref}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                          setImagePreview(URL.createObjectURL(file));
                        }
                      }}
                    />

                    <Button
                      type="button"
                      onClick={() => ref.current?.click()}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Fotoğraf Seç
                    </Button>
                  </div>

                )}
              />

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2"
              >
                Kayıt Ol
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUpPage;
