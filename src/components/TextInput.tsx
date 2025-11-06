import { Input } from './ui/input'
interface IProps {
    placeholder?: string;
    type?: string;
    value?: string;
    className?: string;
    onchange?: any
    kisitlama?: any
    disabled?: any
    inValid?:any

}
export function TextInput({ disabled,inValid, placeholder, type, value, className, onchange, kisitlama }: IProps) {
    return (
        <Input
        aria-invalid={inValid}
            disabled={disabled}
            value={value}
            type={"text"}
            onChange={(e) => {
                let val = e.target.value
                val = kisitlama ? kisitlama(val) : val
                onchange(val)
            }}
            placeholder={placeholder}
            className={className}
        />
    )
}
