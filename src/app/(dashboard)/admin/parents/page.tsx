"use client"
import TextFeild from '@/components/TextFeild'
import Image from 'next/image'
import Table from '@/components/Table'
import { parentsData } from '@/lib/data'
import AddRecord from "@/components/AddRecord"
import {useStore} from "@/store/useStore";
import {Plus} from "lucide-react"
const page = () => {
  const toggleForm = useStore((state)=>state.toggleForm);
  const coloumn = [
    {
      accessor:"id",
    header: "id",
   className:"tabel-cell"
    },
    {
    header: "Parent-Name",
    accessor: "name",
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
      accessor: "students",
    header: "Students",
   className:"tabel-cell max-md:hidden"
    },
   
]
  return (
    <div className="px-6 md:px-10  py-4 w-full  h-full flex flex-col ">
     <AddRecord role="parent" type="create"/>
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

        
        <Plus size={30} className='hover:bg-accent-300 rounded-full transition-all duration-150 o  ' onClick={()=>{toggleForm()}}   />
        
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