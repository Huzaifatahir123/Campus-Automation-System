"use client"
import Image from "next/image";
import Link from "next/link";
import {role} from "@/lib/data"
import { useStore } from "@/store/useStore";

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
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Students",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/parent.png",
        label: "Parents",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/subject.png",
        label: "Subjects",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Classes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/lesson.png",
        label: "Lessons",
        href: "/list/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "Exams",
        href: "/list/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Assignments",
        href: "/list/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/result.png",
        label: "Results",
        href: "/list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/attendance.png",
        label: "Attendance",
        href: "/list/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/message.png",
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
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
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];
const Menu = () =>{
  const toggleNavbar = useStore((state) => state.toggleNavbar);
  return (
    <div className="mt-2 h-full pl-3  flex flex-col gap-6">
  {menuItems.map((ele, i) => (
    <div className="flex h-full flex-col gap-1 bg-white  " key={i}>
      <p className="text-xs bg-white font-semibold uppercase  tracking-wider text-gray-400 mb-2 px-3 self-start ">
        {ele.title}
      </p>

      {ele.items.map((item) => {
        if(item.visible.includes(role)){
          return (
        <Link
          
          href={`${item.href}`}
          onClick={toggleNavbar}
          className="flex items-center gap-3 px-3 py-2 rounded-lg   text-gray-500 hover:text-gray-800 hover:bg-lama-sky justify- transition-all duration-200  max-md:px-2"
          key={item.label}
        >
          <Image alt={item.label} src={item.icon} width={20} height={20} />
          <span className="text-sm font-medium ">{item.label}</span>
        </Link>)

        }
        })}
    </div>
  ))}
</div>
  )
}
export default Menu;  