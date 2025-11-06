import { loginUserShemaForm } from "@/Models/User";
import type z from "zod";
import { Form, } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { myRegex } from "@/lib/myRegex";
import { useDispatch } from 'react-redux'
import { userLogin } from '../features/auth/authActions'
import type { AppDispatch } from "@/app/store";
import {TextInput} from "@/components/TextInput";
import CustomForms from "@/components/CustomForms";
import { Link, useNavigate } from "react-router-dom";



function LoginPage() {
    
   
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();
    const handleSubmit = async () => {
        let data = form.getValues()
        console.log("login formu:", data)
        dispatch(userLogin(data)).then(res=>{
            console.log(res)
            if(res.type!="auth/login/rejected"){
                localStorage.setItem("userToken",res.payload.token)
                navigate("/dashboard")
            }
        })
    };
    const form = useForm<z.infer<typeof loginUserShemaForm>>({
        resolver: zodResolver(loginUserShemaForm),
        defaultValues: {
            gsmNumber: "5555555554",
            password: "55555",
        },
    });
    return (
        <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-100 to-blue-300">
            <Card className="w-full max-w-md bg-white shadow-2xl rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-semibold text-blue-700">
                        Giriş Yap
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className="space-y-6"
                        >

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

                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2"
                            >
                                Giriş Yap
                            </Button>
                        </form>
                    </Form>
                    <Link to="/signup" className="text-blue-400  underline">hesabım yok mu?</Link>

                </CardContent>
            </Card>
        </div>
    );
}

export default LoginPage;
