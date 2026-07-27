"use client"
import TextFeild from '@/components/TextFeild'
import Image from 'next/image'
import React from 'react'
import Table from '@/components/Table'
import { studentsData } from '@/lib/data'
import AddRecord from '@/components/AddRecord'
import {useStore} from "@/store/useStore";
import {Plus} from "lucide-react"
const page = () => {
    const toggleForm = useStore((state)=>state.toggleForm);
    const isFormOpen = useStore((state)=>state.isFormOpen);
  const coloumn = [
    {
    header: "Student-Name",
    accessor: "name",
   className:"tabel-cell"
    },
    {
      accessor:"studentId",
    header: "id",
   className:"tabel-cell"
    },
   
    {
      accessor: "email",
    header: "Email",
   className:"tabel-cell max-md:hidden"
    },
    {
      accessor: "address",
    header: "Address",
   className:"tabel-cell max-md:hidden"
    },
    {
      accessor: "phone",
    header: "Phone",
   className:"tabel-cell max-md:hidden"
    },
    {
      accessor: "class",
    header: "Class",
   className:"tabel-cell max-md:hidden"
    },
    {
      accessor: "grade",
    header: "Grade",
   className:"tabel-cell "
    },
   
]

  return (
    <div className="px-4 relative md:px-8  py-4 w-full  h-full flex flex-col ">
      
      <AddRecord role='student' type='create'  isEdit={false} />
     
    {/* top section */}
    <div className='w-full flex justify-around md:justify-between  items-center '>
        <h1 className='text-xl text-gray-500 max-sm:text-sm'>All Students </h1>
        <div className="flex gap-4 justify-center  items-center">
        <TextFeild/>
        
        <div className='flex w-8 h-8  bg-lama-yellow rounded-full justify-center items-center'>

        <Image src="/filter.png" width={20} height={10}  alt="filter"  />
        
        </div>
        <div className='flex w-8 h-8  bg-lama-yellow rounded-full justify-center items-center'>

       <Image src="/sort.png" width={20} height={5} alt="sort"  />
        
        </div>
        

        
        <Plus size={30} className='hover:bg-accent-300 rounded-full transition-all duration-150 o  ' onClick={()=>{toggleForm()}}   />
        
        
        
        </div>
    </div>
 {/* bottom section */}

 <div className='w-full h-full     mt-2'>
{
  studentsData ? (
    <Table coloumn={coloumn} Data={studentsData}/>
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