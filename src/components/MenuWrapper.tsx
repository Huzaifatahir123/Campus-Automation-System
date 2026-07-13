"use client"
import React from 'react'
import Image from "next/image";
import Menu from "@/components/Menu";
  import { useStore }  from "@/store/useStore";
import { X } from 'lucide-react';
const MenuWrapper = () => {
    
           const IsSideBarOpen = useStore((state) => state.isNavbarOpen);
           const toggleNavbar = useStore((state) => state.toggleNavbar);

  return (
    <div className={`md:w-[14%] w-fit max-md:top-0  max-md:absolute h-full  max-md:left-0 bg-white max-md:z-50 ${IsSideBarOpen ? "inline-block":"max-md:hidden"}    py-6  `}>
        <div className="flex px-4   gap-1">
        <X onClick={toggleNavbar} className='md:hidden absolute right-0 mr-10' />
                <span className="text-black text-lg max-md:hidden">School Dev</span>
        <Image src="/logo.png" width={40} height={50} alt="logo" className="max-md:hidden" />
        </div>
        <Menu/>
       </div>
  )
}

export default MenuWrapper