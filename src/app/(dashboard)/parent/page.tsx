import React from 'react'
import StudentSchdule from '@/components/StudentSchdule'
import Cal from '@/components/Calendar'
import Announcement from '@/components/Announcement'
import Event from '@/components/Event'
const page = () => {
  return (
    <div className="flex mt-2 h-full max-lg:flex-col gap-2">
      <div className='w-full h-full lg:w-2/3'>
         <h1>parent</h1>
         <StudentSchdule/>
      </div>
      <div className='w-full lg:w-1/3 '>
         <div className='flex w-full flex-col gap-2'>
          <Cal/>
          <Event/>
          <Announcement/>
         </div>
      </div>

    </div>
  )
}

export default page