import { loginUserShemaForm } from "@/Models/User";
import type z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/Request/axiosInstance";
import { API_PATH } from "@/Request/API_PATH";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { myRegex } from "@/lib/myRegex";
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../features/auth/authActions'
import type { RootState ,AppDispatch} from "@/app/store";



function LoginPage() {
    //  const user = useSelector((state) => state.user.value);
    const counter = useSelector((state:RootState) => state.auth)
    const dispatch = useDispatch<AppDispatch>()



    const handleSubmit = () => {
        let data = form.getValues()
        console.log("login formu:", data)
        dispatch(userLogin(data))

    };
    const form = useForm<z.infer<typeof loginUserShemaForm>>({
        resolver: zodResolver(loginUserShemaForm),
        defaultValues: {
            gsmNumber: "",
            password: "",
        },
    });
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
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
                            <FormField
                                name="gsmNumber"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700">
                                            Telefon Numarası
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="5XXXXXXXXX"
                                                // {...field}
                                                onChange={(e) => {
                                                    let val = e.target.value
                                                    val.replace(myRegex.telefon, "")
                                                    field.onChange(val)
                                                }}
                                                className="border-gray-300 focus:ring-blue-500"
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
                                        <FormLabel className="text-sm font-medium text-gray-700">
                                            Şifre
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                //     {...field}
                                                type="password"
                                                onChange={(e) => {
                                                    let val = e.target.value
                                                    val.replace(myRegex.sifre, "")
                                                    field.onChange(val)
                                                }}
                                                placeholder="********"
                                                className="border-gray-300 focus:ring-blue-500"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2"
                            >
                                Giriş Yap
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

export default LoginPage;
