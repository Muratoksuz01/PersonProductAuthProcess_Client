import { fi } from "zod/v4/locales";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { FieldError } from "./ui/field";

interface CustomFormsProps {
    name: string;
    control: any;
    children: any;
    title:string
    disabled?:boolean
    className?:string
}
function CustomForms({ children, name, control ,title, className}: CustomFormsProps) {
    return (
        <FormField
            name={name}
            control={control}
            render={({ field,fieldState }) => 
                <FormItem 
            // data-invalid={fieldState.invalid}
                 className={className}>
                    <FormLabel className={"mx-auto"}>{title}</FormLabel>
                    <FormControl>
                        {children(field,fieldState)}
                    </FormControl>
                        {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                   
                </FormItem>
            
            }
        />
    )
}

export default CustomForms