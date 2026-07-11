import React from 'react'
import Image from 'next/image'
const Table = ({coloumn,Data}) => {
  
  return (
    <table className='w-full border-collapse'>
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
      </tr>
    </thead>
    <tbody>
        {Data.map((ele,i)=>(
            <tr key={i}>
                {coloumn.map((col,colindex)=>(
                    <td key={colindex}>
                        {ele[col.accessor]}
                    </td>
                ))}
                <td>
                    <div className='flex justify-center items-center gap-3'>
              <Image
                src="/edit.png"
                width={16}
                height={16}
                alt="edit"
                className='cursor-pointer opacity-70 hover:opacity-100 transition-opacity'
              />
              <Image
                src="/delete.png"
                width={16}
                height={16}
                alt="delete"
                className='cursor-pointer opacity-70 hover:opacity-100 transition-opacity'
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