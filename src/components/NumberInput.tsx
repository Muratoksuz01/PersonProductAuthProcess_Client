import { Input } from './ui/input'
interface IProps {
    placeholder?: string;
    value?: string;
    className?: string;
    onchange?: any
    kisitlama?: any

}
export function NumberInput({ placeholder, value, className, onchange, kisitlama }: IProps) {
    return (
        <Input
            value={value}
            type="number"
            onChange={(e) => {
                let val = e.target.value
                val = kisitlama ? kisitlama(val) : val
                onchange(Number(val))
            }}
            placeholder={placeholder}
            className={className}
        />
    )
}
