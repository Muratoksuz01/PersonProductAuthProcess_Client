import { Input } from './ui/input'
interface IProps {
    placeholder?: string;
    type?: string;
    value?: string;
    className?: string;
    onchange?: any
    kisitlama?: any
    disabled?: any

}
export function TextInput({ disabled, placeholder, type, value, className, onchange, kisitlama }: IProps) {
    return (
        <Input
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
