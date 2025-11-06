import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input'
import { Label } from './ui/label';
import { Switch } from './ui/switch';
interface IProps {
    value?: boolean;
    className?: string;
    onchange?: any

}
export function CheckBoxInput({ value, className, onchange }: IProps) {
    return (
            <Switch
                className={className}
                onCheckedChange={(checked: boolean) => {onchange(checked) }}
                defaultChecked={value}
            />       
    )
}
