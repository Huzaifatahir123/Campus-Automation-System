import React from 'react'
import Image from 'next/image'
const Table = ({coloumn,Data}) => {
  return (
    <table className='w-full border-collapse'>
    <thead>
      <tr className='border-b border-slate-200'>
        {coloumn.map((ele) => (
          <th
            key={ele.name}
            className={`${ele.className} text-left text-xs font-medium uppercase tracking-wide text-slate-500 py-3 px-4`}
          >
            {ele.name}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {Data.map((ele) => (
        <tr
          key={ele.id}
          className='border-b border-slate-100 odd:bg-lama-yellow-light even:bg-lama-sky-light hover:bg-slate-50 transition-colors'
        >
          <td className='py-3 px-4 text-sm text-slate-700'>{ele.id}</td>
          <td className='py-3 px-4 text-sm font-medium text-slate-800'>{ele.name}</td>
          <td className='py-3 px-4 text-sm text-slate-600'>{ele.email}</td>
          <td className='py-3 px-4 text-sm text-slate-600'>{ele.address}</td>
          <td className='py-3 px-4 text-sm text-slate-600'>{ele.phone}</td>
          
          <td className='py-3 px-4 text-sm text-slate-600'>{ele.students}</td>
          <td className='py-3 px-4'>
            <div className='flex justify-center items-center gap-3'>
              <Image
                src="/edit.png"
                width={16}
                height={16}
                alt="edit"
                className='cursor-pointer opacity-100 bg-lama-purple hover:opacity-100 transition-opacity'
              />
              <Image
                src="/delete.png"
                width={16}
                height={16}
                alt="delete"
                className='cursor-pointer opacity-100 hover:opacity-100 transition-opacity'
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