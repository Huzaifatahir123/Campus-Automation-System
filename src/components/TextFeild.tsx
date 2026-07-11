import React from 'react'
import Image from 'next/image'
const TextFeild = () => {
  return (
    <div className="flex rounded-3xl gap-4 border-2 border-gray-200  px-2">
         <Image width={20} height={5} className='object-contain' src="/search.png" alt="search" />
         <input type="text" placeholder='...Search' className='border-none text-sm text-gray-500 outline-none p-2 w-30 max-sm:w-20' /> 
    </div>
  )
}

export default TextFeild