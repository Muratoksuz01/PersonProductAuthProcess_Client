import { fi } from "zod/v4/locales";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

interface CustomFormsProps {
    name: string;
    control: any;
    children: any;
    title:string
    disabled?:boolean
    className?:string
}
function CustomForms({disabled, children, name, control ,title, className}: CustomFormsProps) {
    return (
        <FormField
            name={name}
            control={control}
            render={({ field ,fieldState}) => 
                <FormItem data-invalid={fieldState.invalid} className={className}>
                    <FormLabel className={"mx-auto"}>{title}</FormLabel>
                    <FormControl>
                        {children(field)}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            
            }
        />
    )
}

export default CustomForms