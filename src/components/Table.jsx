import React from 'react'
import Image from 'next/image'
import {Trash2 , Pencil} from "lucide-react"
const Table = ({coloumn,Data}) => {
  
  return (
    <table className='w-full px-2 h-full border-collapse '>
    <thead>
      <tr className='border-b border-slate-200'>
        {coloumn.map((ele) => (
          <th
            key={ele.header}
            className={`${ele.className}    divide-y px-2 text-left text-xs font-medium uppercase tracking-wide text-slate-500 py-3`}
          >
            {ele.header} 
          </th>
          
        ))}
        <th className={` text-left text-xs px-2    font-medium uppercase tracking-wide text-slate-500 py-3 `}>Actions</th>
      </tr>
    </thead>
    <tbody>
        {Data.map((ele,i)=>(
              <tr key={i} className={` border-b border-slate-100 odd:bg-lama-yellow-light even:bg-lama-sky-light hover:bg-slate-50 transition-colors`}>
                
                {coloumn.map((col,colindex)=>(
                    <td key={colindex} className={`py-2 px-2 divide-y text-sm text-slate-600 ${col.className}`}>
                        
                        {ele[col.accessor]}
                        
                    </td>
                ))}
                <td className='py-3 px-4'>
                    <div className='flex justify-center items-center gap-3'>
              <Pencil
                
                width={16}
                height={16}
                className='cursor-pointer opacity-100   hover:opacity-100 transition-opacity'
              />
              <Trash2
                
                width={16}
                height={16}
               color='red'
                className='cursor-pointer opacity-100  hover:opacity-100 transition-opacity'
              />
            </div>
                </td>
            </tr>
        ))}
    </tbody>
  </table>
  )
}

export default Table