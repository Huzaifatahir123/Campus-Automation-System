"use client"
import TextFeild from '@/components/TextFeild'
import Image from 'next/image'
import React, { useState ,useEffect} from 'react'
import Table from '@/components/Table'
import { teachersData } from '@/lib/data'
import AddRecord from '@/components/AddRecord'
import {useStore} from "@/store/useStore";
import {Plus} from "lucide-react"
import ListCard from '@/components/teacher/ListCard'
import { getTeachers } from '@/services/teacher/fetch'
const page = () => {
   const [data,setData] = useState<any[]>([]);
  const coloumn = [
    {
    header: "Teacher-Name",
    accessor: "name",
   className:"tabel-cell"
    },
    {
      accessor:"teacherId",
    header: "id",
   className:"tabel-cell max-md:hidden"
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
      accessor: "classes",
    header: "Classes",
   className:"tabel-cell max-md:hidden"
    },
    {
      accessor: "subjects",
    header: "Subjects",
   className:"tabel-cell "
    },
   
]
async function loadStudents() {
      const res:any = await getTeachers();
      if (res?.data.data) {
        setData(res.data.data)
      }
    }
useEffect(()=>{
  

    loadStudents();
},[])
const toggleForm = useStore((state)=>state.toggleForm);
  return (
    <div className="px-6 md:px-10  py-4 w-full  h-full flex flex-col ">
     <AddRecord role='teacher' type='create' />
    {/* top section */}
    <div className='w-full flex gap-2 justify-between max-sm:justify-between items-center '>
        <h1 className='text-xl text-gray-500 max-sm:text-sm'>All Teachers </h1>
        <div className="flex gap-2 justify-center  items-center">
        <TextFeild/>
        
        <div className='flex w-8 h-8  bg-lama-yellow rounded-full justify-center items-center'>

        <Image src="/filter.png" width={20} height={10}  alt="filter"  />
        
        </div>
        <div className='flex w-8 h-8  bg-lama-yellow rounded-full justify-center items-center'>

       <Image src="/sort.png" width={20} height={5} alt="sort"  />
        
        </div>
        <div className='flex w-8 h-8  bg-lama-yellow rounded-full justify-center items-center'>

        
         <Plus size={30} className='hover:bg-accent-300 rounded-full transition-all duration-150 o  ' onClick={()=>{toggleForm()}}   />
        
        </div>
        
        </div>
    </div>
 {/* bottom section */}

 <div className='w-full h-full mt-2'>
<ListCard data={data} role='teacher' />
  
</div>
    </div>
  )
}

export default page