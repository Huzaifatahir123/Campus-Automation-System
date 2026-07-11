import React from 'react'
import Image from 'next/image'
import {Trash2 , Pencil} from "lucide-react"
const Table = ({coloumn,Data}) => {
  
  return (
    <table className='w-full border-collapse '>
    <thead>
      <tr className='border-b border-slate-200'>
        {coloumn.map((ele) => (
          <th
            key={ele.header}
            className={`${ele.className} text-left text-xs font-medium uppercase tracking-wide text-slate-500 py-3 px-4`}
          >
            {ele.header}
          </th>
          
        ))}
        <th className={` text-left text-xs font-medium uppercase tracking-wide text-slate-500 py-3 px-4`}>Actions</th>
      </tr>
    </thead>
    <tbody>
        {Data.map((ele,i)=>(
            <tr key={i} className=' border-b border-slate-100 odd:bg-lama-yellow-light even:bg-lama-sky-light hover:bg-slate-50 transition-colors'>
                {coloumn.map((col,colindex)=>(
                    <td key={colindex} className='py-6 px-6  text-sm text-slate-600'>
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