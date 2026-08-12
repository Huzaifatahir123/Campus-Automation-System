"use client"
import TextFeild from '@/components/TextFeild'
import Image from 'next/image'
import Table from '@/components/Table'
import { parentsData } from '@/lib/data'
import AddRecord from "@/components/AddRecord"
import {useStore} from "@/store/useStore";
import {Plus} from "lucide-react"
import { getParents } from '@/services/parent/fetchData'
import { useEffect, useState } from 'react'
import ListCard from '@/components/parent/ListCard'
const page =  () => {
  const [parents,setParents] = useState<any[]>([]);
  const [search,setSearch] = useState<string>("");
  const toggleForm = useStore((state)=>state.toggleForm);
  const data = async ()=>{
    const res:any = await getParents(search);
    setParents(res.data.data);

  }
  useEffect(()=>{
    data();
  },[search])
  

  return (
    <div className="px-6 md:px-10  py-4 w-full  h-full flex flex-col ">
     <AddRecord role="parent" type="create"/>
    {/* top section */}
    <div className='w-full flex gap-2 justify-between max-sm:justify-center items-center '>
        <h1 className='text-xl max-sm:text-sm'>All Parent </h1>
        <div className="flex gap-2 justify-center  items-center">
        <TextFeild value={search} onChange={setSearch} placeholder="Search parents..." />
         {/* <div className='flex w-8 h-8  bg-lama-yellow rounded-full justify-center items-center'>

        <Image src="/filter.png" width={20} height={10}  alt="filter"  />
        
        </div>
       <div className='flex w-8 h-8  bg-lama-yellow rounded-full justify-center items-center'>

       <Image src="/sort.png" width={20} height={5} alt="sort"  />
        
        </div>*/} 
        
        <div className='flex w-8 h-8  bg-lama-yellow rounded-full justify-center items-center'>

        
        <Plus size={30} className='hover:bg-accent-300 rounded-full transition-all duration-150 o  ' onClick={()=>{toggleForm()}}   />
        
        </div>
        
        </div>
    </div>
 {/* bottom section */}
 <div className='w-full mt-4'>

<ListCard role='parent' data={parents}/>
 </div>
    </div>
  )
}

export default page