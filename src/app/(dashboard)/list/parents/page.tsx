import TextFeild from '@/components/TextFeild'
import Image from 'next/image'
import React from 'react'
import Table from '@/components/Table'
import { parentsData } from '@/lib/data'
const page = () => {
  const coloumn = [
    {
    name: "info",
    className:"tabel-cell"
    },
    {
    name: "Parent-Name",
    className:"tabel-cell"
    },
    {
    name: "email",
    className:"tabel-cell max-md:hidden"
    },
    {
    name: "address",
    className:"tabel-cell max-md:hidden"
    },
    {
    name: "phone",
    className:"tabel-cell max-md:hidden"
    },
    {
    name: "Students",
    className:"tabel-cell max-md:hidden"
    },
    {
    name: "Actions",
    className:"tabel-cell"
    },
]
  return (
    <div className="px-6 md:px-10 lg:px-24 py-4 w-full  h-full flex flex-col ">
     
    {/* top section */}
    <div className='w-full flex gap-2 justify-between max-sm:justify-center items-center '>
        <h1 className='text-xl max-sm:text-sm'>All Parent </h1>
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
  <Table coloumn={coloumn} Data={parentsData}/>
</div>
    </div>
  )
}

export default page