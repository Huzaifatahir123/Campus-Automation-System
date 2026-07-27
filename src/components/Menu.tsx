"use client"
import Image from "next/image";
import Link from "next/link";
import axios from "axios"
import { useStore } from "@/store/useStore";
import {toast} from "sonner"
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
 const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "Teachers",
        href: "/teachers",
        visible: ["admin"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/students",
        visible: ["admin"],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/parents",
        visible: ["admin", ],
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/subjects",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Classes",
        href: "/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "marks",
        href: "/marks",
        visible: ["student", "teacher"],
      },
      {
        icon: "/attendance.png",
        label: "Attendance",
        href: "/attendance",
        visible: ["teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/announcements",
        visible: ["admin"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
     
    
    ],
  },
];
const Menu = () =>{
 const router = useRouter();
  
  const toggleNavbar = useStore((state) => state.toggleNavbar);
  const Role:string = useStore((state)=> state.Role);
  console.log(Role)
  const logout  = async ()=>{
    try{
        const res = await axios.post("/api/auth/logout");
        router.push("/login")

    }catch(error){
          console.error(error)
    }
  }
  return (
    <div className="mt-2  pl-3  flex flex-col gap-6">
  {menuItems.map((ele, i) => (
    <div className="flex h-full flex-col gap-1 bg-white  " key={i}>
      <p className="text-xs bg-white font-semibold uppercase  tracking-wider text-neutral-400  px-3 self-start ">
        {ele.title}
      </p>

      {ele.items.map((item) => {
        if(item.visible.includes(Role)){
          return (
        <Link
          
          href={`/${Role}${item.href}`}
          onClick={toggleNavbar}
          className="flex items-center gap-3 px-3 py-2 rounded-lg   text-neutral-500 hover:text-neutral-800 hover:bg-accent-300 justify- transition-all duration-200  max-md:px-2"
          key={item.label}
        >
          <Image alt={item.label} src={item.icon} width={20} height={20} />
          <span className="text-sm font-medium ">{item.label}</span>
        </Link>)

        }
        })}
    </div>
  ))}
  <div onClick={logout} className="flex px-3 hover:bg-accent-300 cursor-pointer py-2 rounded-sm gap-2">
  <LogOut size={20} className="  text-danger hover:text-neutral-300 cursor-pointer "  />
    <h1 className="text-sm text-neutral-600 font-medium">Logout</h1>
  </div>
</div>
  )
}
export default Menu;