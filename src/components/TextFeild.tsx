import React from 'react'
import Image from 'next/image'
interface TextFieldProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
}
const TextFeild = ({ value, onChange, placeholder }: TextFieldProps) => {
  return (
    <div className="flex rounded-3xl max-sm:hidden gap-4 border-2 border-gray-200  px-2">
         <Image width={20} height={5} className='object-contain' src="/search.png" alt="search" />
         <input 
           type="text" 
           placeholder={placeholder} 
           className='border-none text-sm text-gray-500 outline-none p-2 w-60 max-sm:w-20' 
           value={value}
           onChange={(e) => onChange(e.target.value)}
         /> 
    </div>
  )
}

export default TextFeild