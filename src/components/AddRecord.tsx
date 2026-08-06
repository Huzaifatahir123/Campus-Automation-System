"use client"
import { useEffect ,useState} from "react"
import ParentSearch from "@/components/student/ParentSearch"
import {userFields} from "@/utils/fields"
import {studentFields} from "@/utils/fields"
import {parentFields} from "@/utils/fields"
import {teacherFields} from "@/utils/fields"
import { useForm,Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from "axios"
import {useStore} from "@/store/useStore";
import {X,Loader2} from "lucide-react"
import {toast} from "sonner"
import {createStudentSchema,createParentSchema,createTeacherSchema} from "@/utils/ZodSchema"
interface SectionOption {
  section_id: number;
  class_name: string;
  section_name: string;
  display_label: string;
}


const AddRecord = ({type,role,data}:{type?:string,role:string,data?:any,}) => {
  const schema =
  role === "student"
    ? createStudentSchema
    : role === "teacher"
    ? createTeacherSchema
    : createParentSchema;
  const isFormOpen = useStore((state)=>state.isFormOpen);
  const toggleForm = useStore((state)=>state.toggleForm);
   
  const [claSec,setClasSec] = useState<SectionOption[]>([]);
    const {register,handleSubmit,control,reset
       ,formState:{errors,isSubmitting}}  = useForm<any>({
  resolver: zodResolver(schema),
}); 
    
    const onFormSubmit = async (formData: any) => {
  try {
    let response;

    if (type === "edit") {
      response = await axios.patch(
        `/api/${role}/edit/${data.id}`,
        formData
      );
    } else {
      response = await axios.post(
        `/api/${role}/Add`,
        formData
      );

      reset();
    }

    toast.success(response.data.message);
  } catch (error) {
    console.error(error);
  }
}
    let renderFields: any = [];
       if(role === "parent"){
        renderFields = parentFields;
       }else if(role === "student"){
        renderFields = studentFields;
       }
       else if (role === "teacher"){
        renderFields  = teacherFields;
       }
       const renderArray =
  type === "edit"
    ? [...userFields.filter(field => field.header !== "password_hash"), ...renderFields]
    : [...userFields, ...renderFields];

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
       useEffect(() => {
  if (type === "edit" && data) {
    reset(data);
  }
}, [type, data, reset]);
  return (

    <div className={`${isFormOpen ? "flex" : "flex"} absolute top-0 right-0 h-full w-104 bg-white border-l border-neutral-200 shadow-lg flex flex-col`}>
  <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
    <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-800">
  {type === "edit" ? `Edit ${role}` : `Add ${role}`}
</h2>
    <button onClick={()=> toggleForm()}
      type="button"
      className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
      aria-label="Close panel"
    >
     <X/>
    </button>
  </div>

  <form onSubmit={handleSubmit(onFormSubmit,(errors) => console.log("Validation Errors:", errors))} className="flex flex-col  gap-5 px-5 py-6 overflow-y-auto ">
  

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
     {role === 'student' && (
      <Controller
      name="parent_id"
      control={control}
      render={({field})=>(
        <ParentSearch value={field.value} onChange={field.onChange} />
      )}
      />
      
     )}
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
       {errors.section_id && (
      <span className="text-xs text-danger font-medium">
        {errors.section_id?.message as string}
      </span>
      )}
    </div>
  )}
  {role === "student" && (
    <div className="flex flex-col gap-1.5 mb-4">
      <label className="text-xs uppercase text-neutral-500 font-semibold">
        Blood Group
      </label>
      <select
        {...register("blood_group" )}
        className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm"
      >
    <option value="">-- Select Blood Group --</option>
    <option value="A+">A+</option>
    <option value="A-">A-</option>
    <option value="B+">B+</option>
    <option value="B-">B-</option>
    <option value="O+">O+</option>
    <option value="O-">O-</option>
    <option value="AB+">AB+</option>
    <option value="AB-">AB-</option>
      </select>
      {errors.blood_group && (
      <span className="text-xs text-danger font-medium">
        {errors.blood_group?.message as string}
      </span>
      )}
    </div>
  )}
  {role === "student" && (
    <div className="flex flex-col gap-1.5 mb-4">
      <label className="text-xs uppercase text-neutral-500 font-semibold">
        Status
      </label>
      <select
        {...register("status" )}
        className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm"
      >
    <option value="">-- Select Status --</option>
    <option value="Active">Active</option>
    <option value="Graduated">Graduated</option>
    <option value="Suspended">Suspended</option>
    <option value="Transferred">Transferred</option>

      </select>
      {errors.status && (
      <span className="text-xs text-danger font-medium">
        {errors.status?.message as string}
      </span>
      )}
    </div>
  )}
  <div className="mt-auto  bg-neutral-100 rounded-sm sticky bottom-0 flex gap-2 px-5 py-4 border-t border-neutral-200">
    <button
      type="reset"
      className="flex-1 py-2.5 rounded-lg border border-neutral-300 text-neutral-700 text-sm font-medium hover:bg-neutral-50 cursor-pointer transition-colors"
    >
      Reset
    </button>
    <button
  type="submit"
  className="flex-1 flex cursor-pointer justify-center items-center py-2.5 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-700 transition-colors"
>
  {isSubmitting ? (
    <Loader2 className="animate-spin" />
  ) : type === "edit" ? (
    "Update"
  ) : (
    "Register"
  )}
</button>
  </div>
  </form>

</div>
  )
}

export default AddRecord