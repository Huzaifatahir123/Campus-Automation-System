"use client"
import { useParams } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import StudentSchdule from '@/components/StudentSchdule'
import Announcement from '@/components/Announcement'
import Barchart from '@/components/BarChart'
import Performance from '@/components/Performance'

const page = () => {
    const {id} = useParams();
  return (
    <div className='w-full h-full mt-4  flex max-md:flex-col gap-2'>
        {/* top section */}
        <div className='w-full lg:w-2/3 flex flex-col  h-full'>
          <div className='bg-white rounded-md mb-2 flex flex-col md:flex-row gap-4 p-4 shadow-sm border border-gray-100'>
  <div className="w-full md:w-[20%] flex justify-center items-center">
    <Image
      src="/profile.png"
      width={100}
      height={100}
      alt="profile"
      className="w-24 h-24 rounded-full object-cover ring-2 ring-lama-sky"
    />
  </div>

  <div className='flex flex-col bg-lama-sky-light rounded-md p-3 justify-between gap-2 w-full md:w-[40%]'>
    <h1 className="text-lg font-semibold text-slate-800">Huzaifa Tahir</h1>
    <p className="text-xs text-slate-500 leading-relaxed">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta nostrum suscipit
      maiores dolorum, delectus quo, dolorem
    </p>
    <div className='flex items-center gap-2'>
      <Image src="/blood.png" width={14} height={14} alt="blood" />
      <span className="text-xs text-slate-600">12/07/2026</span>
    </div>
    <div className='flex items-center gap-2 flex-wrap'>
      <Image src="/mail.png" width={14} height={14} alt="email" />
      <span className="text-xs text-slate-600">email@gmail.com</span>
    </div>
    <div className='flex items-center gap-2'>
      <Image src="/phone.png" width={14} height={14} alt="phone" />
      <span className="text-xs text-slate-600">00000000000</span>
    </div>
  </div>

  <div className='w-full md:w-[40%] grid grid-cols-2 gap-4'>
    <div className='bg-lama-sky-light rounded-md p-4 flex flex-col justify-center gap-1'>
      <span className="text-lg font-semibold text-slate-800">90%</span>
      <span className="text-xs text-slate-500">Attendance</span>
    </div>
    <div className='bg-lama-yellow-light rounded-md p-4 flex flex-col justify-center gap-1'>
      <span className="text-lg font-semibold text-slate-800">2</span>
      <span className="text-xs text-slate-500">grade</span>
    </div>
    <div className='bg-lama-yellow-light rounded-md p-4 flex flex-col justify-center gap-1'>
      <span className="text-lg font-semibold text-slate-800">90%</span>
      <span className="text-xs text-slate-500">Attendance</span>
    </div>
    <div className='bg-lama-sky-light rounded-md p-4 flex flex-col justify-center gap-1'>
      <span className="text-lg font-semibold text-slate-800">2</span>
      <span className="text-xs text-slate-500">Branches</span>
    </div>
  </div>
</div>
             
             <div className='h-full'>

        <StudentSchdule/>    
             </div>
        </div>
       <div className='w-full lg:w-1/3 p-4   flex flex-col gap-3 h-screen   '>
  <h2 className="text-sm font-semibold text-slate-800 mb-3">Shortcuts</h2>
  <div className="w-full flex gap-2 justify-center items-center flex-wrap">
    <div className="text-xs font-medium text-slate-700 bg-lama-sky-light px-3 py-2.5 flex-1 min-w-[45%] rounded-md text-center hover:opacity-80 cursor-pointer transition-opacity">
      students Classes
    </div>
    <div className="text-xs font-medium text-slate-700 bg-lama-yellow-light px-3 py-2.5 flex-1 min-w-[45%] rounded-md text-center hover:opacity-80 cursor-pointer transition-opacity">
      students Lessons
    </div>
    <div className="text-xs font-medium text-slate-700 bg-lama-yellow-light px-3 py-2.5 flex-1 min-w-[45%] rounded-md text-center hover:opacity-80 cursor-pointer transition-opacity">
      students Assignments
    </div>
    <div className="text-xs font-medium text-slate-700 bg-lama-sky-light px-3 py-2.5 flex-1 min-w-[45%] rounded-md text-center hover:opacity-80 cursor-pointer transition-opacity">
      students Exams
    </div>
    <div className="text-xs font-medium text-slate-700 bg-lama-sky-light px-3 py-2.5 flex-1 min-w-[45%] rounded-md text-center hover:opacity-80 cursor-pointer transition-opacity">
      students Results
    </div>
  </div>
  <div className="h-80 mb-10">
   <Performance/>
  </div>
  

  <Announcement/>
</div>
    </div>
  )
}

export default page