"use client"
import { useEffect ,useState} from "react"
import {userFields} from "@/utils/fields"
import {studentFields} from "@/utils/fields"
import {parentFields} from "@/utils/fields"
import {teacherFields} from "@/utils/fields"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from "axios"
interface SectionOption {
  section_id: number;
  class_name: string;
  section_name: string;
  display_label: string;
}
const formSchema = z.object({
  first_name: z.string().min(2, 'First name must be at least 2 characters'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  section_id: z.coerce.number({ message: "Please select a section" }),

}).passthrough();

const AddRecord = ({type,role,data,isEdit}:{type?:string,role:string,data?:any,isEdit:boolean}) => {
     const [claSec,setClasSec] = useState<SectionOption[]>([]);
    const {register,handleSubmit ,formState:{errors}}  = useForm({
  resolver: zodResolver(formSchema),
}); 
    const onFormSubmit = (data:any)=>{
         console.log("form data",data)
    }
    let renderFeilds: any = [];
       if(role === "parent"){
        renderFeilds = parentFields;
       }else if(role === "student"){
        renderFeilds = studentFields;
       }
       else if (role === "teacher"){
        renderFeilds = teacherFields;
       }
       const renderArray = [...userFields, ...renderFeilds];

    const fetchSections = async ()=>{
         try {
            const res = await axios.get("/api/student/Section_classes")
            console.log(res.data[0].section_id)
            setClasSec(res.data);
         } catch (error:any) {
            console.error(error.message);
         }
    }
       useEffect(()=>{
 fetchSections();
       },[])
  return (

    <div className="absolute top-0 right-0 h-full w-96 bg-white border-l border-neutral-200 shadow-lg flex flex-col">
  <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
    <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-800">
      Add {role}
    </h2>
    <button
      type="button"
      className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
      aria-label="Close panel"
    >
    
    </button>
  </div>

  <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-5 px-5 py-6 overflow-y-auto">
  
  {role === "student" && (
    <div className="flex flex-col gap-1.5 mb-4">
      <label className="text-xs uppercase text-neutral-500 font-semibold">
        Class & Section
      </label>
      <select
        {...register("section_id", )}
        className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm"
      >
        <option value="">-- Select Class & Section --</option>
        {claSec.map((sec) => (
          <option key={sec.section_id} value={sec.section_id}>
            {sec.display_label}
          </option>
        ))}
      </select>
    </div>
  )}
    {renderArray.map((ele, i) => (
      <div className="flex flex-col gap-1.5" key={i}>
        <label className="text-xs uppercase tracking-wide text-neutral-500">
          {ele.placeholder}
        </label>
        <input
          {...register(ele.header)}
          type={ele.type}
          placeholder={ele.placeholder}
          className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 transition-colors"
        />
        {errors[ele.header] && (
      <span className="text-xs text-danger font-medium">
        {errors[ele.header]?.message as string}
      </span>
    )}
      </div>
    ))}
  <div className="mt-auto flex gap-2 px-5 py-4 border-t border-neutral-200">
    <button
      type="reset"
      className="flex-1 py-2.5 rounded-lg border border-neutral-300 text-neutral-700 text-sm font-medium hover:bg-neutral-50 transition-colors"
    >
      Reset
    </button>
    <button
      type="submit"
      
      className="flex-1 py-2.5 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-700 transition-colors"
    >
      Apply
    </button>
  </div>
  </form>

</div>
  )
}

export default AddRecord