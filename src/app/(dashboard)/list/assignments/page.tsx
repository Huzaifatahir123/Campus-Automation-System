import TextFeild from '@/components/TextFeild'
import Image from 'next/image'
import React from 'react'
import Table from '@/components/Table'
import {assignmentsData } from '@/lib/data'
const page = () => {
   
  const coloumn = [
     {
      accessor:"id",
    header: "Assignment-Id",
   className:"tabel-cell"
    },
    {
    header: "Class-Name",
    accessor: "name",
   className:"tabel-cell"
    },
   
   
    {
      accessor: "subject",
    header: "Subject",
   className:"tabel-cell max-md:hidden"
    },
    {
      accessor: "teacher",
    header: "Teacher",
   className:"tabel-cell max-md:hidden"
    },
    {
      accessor: "dueDate",
    header: "DueDate",
   className:"tabel-cell max-md:hidden"
    },
   
   
]

  return (
    <div className="px-6 md:px-10  py-4 w-full  h-full flex flex-col ">
     
    {/* top section */}
    <div className='w-full flex gap-2 justify-between max-sm:justify-center items-center '>
        <h1 className='text-xl text-gray-500 max-sm:text-sm'>All Assignments </h1>
        <div className="flex gap-2 justify-center  items-center">
        <TextFeild/>
        
        <div className='flex w-8 h-8  bg-lama-yellow rounded-full justify-center items-center'>

        <Image src="/filter.png" width={20} height={10}  alt="filter"  />
        
        </div>
        <div className='flex w-8 h-8  bg-lama-yellow rounded-full justify-center items-center'>

       <Image src="/sort.png" width={20} height={5} alt="sort"  />
        
        </div>
        <div className='flex w-8 h-8  bg-lama-yellow rounded-full justify-center items-center'>

        
        <Image src="/plus.png" width={20} height={5} alt="Add"  />
        
        </div>
        
        </div>
    </div>
 {/* bottom section */}

 <div className='w-full h-full mt-2'>
{
 assignmentsData ? (
    <Table coloumn={coloumn} Data={assignmentsData}/>
  ) : (
    <div>
      no teachers found 
    </div>
  )
}
  
</div>
    </div>
  )
}

export default page