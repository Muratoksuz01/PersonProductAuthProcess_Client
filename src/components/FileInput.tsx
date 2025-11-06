import React, { Children } from 'react'
import { Input } from './ui/input'
interface IProps {
    placeholder?: string;
    type?: string;
    value?: string;
    className?: string;
    ref: React.Ref<HTMLInputElement>;
    onchange: any
    setImagePreview:any

}
function FileInput({ placeholder, type, value, className, ref, onchange,setImagePreview }: IProps) {
    return (
        <Input
            ref={ref}
            accept='image/*'
            value={value}
            type={type || "file"}
            onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                    onchange(file)
                    setImagePreview(URL.createObjectURL(file));
                }
            }
            }
            placeholder={placeholder}
            className={className}
        />
    )
}

export default FileInput