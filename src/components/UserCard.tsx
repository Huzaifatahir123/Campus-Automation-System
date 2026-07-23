import Image from 'next/image'
import React from 'react'

const UserCard = ({type}: {type:string}) => {
  return (
    <div className='flex flex-col justify-start gap-8 odd:bg-neutral-400 even:bg-accent-300 rounded-2xl p-4   shadow-sm max-lg:w-full min-w-50 flex-1 hover:shadow-md transition-shadow duration-200'>
  <div className='flex justify-between items-center'>
    <span className='text-xs bg-white/70 text-gray-600 px-2 py-1 rounded-full font-medium'>
      24/6/2026
    </span>
    <button className='p-1 rounded-full hover:bg-white/50 transition-colors duration-200'>
      <Image src="/more.png" alt="more" height={16} width={16} />
    </button>
  </div>

  <div className='flex flex-col gap-4 mt-3'>
    <span className='text-2xl font-semibold text-gray-800'>1024</span>
    <span className='text-sm text-gray-500 capitalize'>{type}</span>
  </div>
</div>
  )
}

export default UserCard