"use client"
import Image from 'next/image'
import {Menu} from "lucide-react"
import { useStore } from '@/store/useStore'
const Navbar = () => {
  const toggleNavbar = useStore((state) => state.toggleNavbar);
  return (
    <div className='w-full py-4  px-4 sm:px-8 flex   justify-between items-center max-md:gap-8 border-b border-gray-100 bg-white'>

  <div className='hidden md:flex gap-2 items-center border border-gray-200 px-4 py-2 rounded-full w-64 focus-within:border-gray-400 transition-colors duration-200'>
    <Image src="/search.png" alt='search' height={16} width={16} className='opacity-50' />
    <input
      type="text"
      placeholder='Search...'
      className='text-sm outline-none w-full placeholder:text-gray-400'
    />
  </div>
   <Menu onClick={toggleNavbar} className='max-md:block hidden'/>
  <div className='flex justify-center items-center gap-5'>

    <div className='flex items-center gap-4'>
      <button className='p-2 rounded-full hover:bg-gray-100 transition-colors duration-200'>
        <Image alt='chat' src="/message.png" width={20} height={20} />
      </button>

      <button className='relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200'>
        <Image alt='announcements' src="/announcement.png" width={20} height={20} />
        <span className='absolute top-1 right-1 bg-green-400 text-white text-[10px] font-medium rounded-full w-4 h-4 flex justify-center items-center'>
          1
        </span>
      </button>
    </div>

   

    <div className='flex items-center gap-3'>
      <div className='flex flex-col items-end max-md:hidden'>
        <span className='text-sm font-medium text-gray-700 leading-tight'>huzaifa</span>
        <span className='text-xs text-gray-400 leading-tight'>Student</span>
      </div>
      <Image
        alt='profile'
        src="/profile.png"
        width={36}
        height={36}
        className='rounded-full ring-2 ring-gray-100'
      />
    </div>
  </div>

</div>
  )
}

export default Navbar