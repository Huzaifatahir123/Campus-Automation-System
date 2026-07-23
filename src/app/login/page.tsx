'use client'
import {useState} from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import {Eye,EyeOff, Loader2} from "lucide-react"
interface formStates {
  email:string,
  password:string,
}
import {useStore} from "@/store/useStore";

const page = () => {
  const router = useRouter();
  const setRole = useStore((state)=>state.setRole);
  const [formData , setFormData] = useState<formStates>({
    email:"",
    password:"",
  });
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const [isVisible,setIsVisible] = useState<boolean>(false);
  const submit = async (e:React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
        try{
           setIsLoading(true);

           if(!formData.email || !formData.password){
                    toast.error("Email or password cannot be empty");
           }
           const response : any = await fetch("/api/auth/login",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
            ,
        }) 
        const data = await response.json();
        setRole(data.data.role.toLowerCase());
        console.log(data.data);
        
        if(data.data.role === "Admin") { 
          router.push("/admin")
        };
          if(data.data.role === "Student") router.push("/student");
            if(data.data.role === "Teacher") router.push("/teacher");
              if(data.data.role === "Parent") router.push("/parent");
                toast.success(data.message);
                
        
        
        
               
        }catch(error:any){
              toast.error("internal server error")
              setIsLoading(false);
        }
        finally{
          setIsLoading(false)
        }
  }
  return (
   <div className="min-h-screen flex items-center justify-center bg-white px-4">
  <div className="w-full max-w-sm">
    <div className="mb-10 text-center">
      <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-2">
        Student & Staff Portal
      </p>
      <h1 className="font-serif text-3xl text-black">
        Campus Login System
      </h1>
    </div>

    <form onSubmit={submit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-xs uppercase tracking-wide text-neutral-500 mb-1.5">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          placeholder="you@campus.edu"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          className="w-full border-0 border-b-2 border-neutral-300 bg-transparent py-2 text-black placeholder:text-neutral-400 focus:border-black focus:outline-none transition-colors"
        />
      </div>

      <div>
        <div className='flex  justify-between '>
        <label htmlFor="password" className="block text-xs uppercase tracking-wide text-neutral-500 mb-1.5">
          Password
        </label>
        {isVisible ? <Eye onClick={()=>{setIsVisible((prev)=>!prev)}} className='ml-18'/> : <EyeOff onClick={()=>{setIsVisible((prev)=>!prev)}}/> }

        </div>
          <input
          id="password"
          type={isVisible ? "text" : "password" }
          value={formData.password}
          placeholder="••••••••"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          className="w-full border-0 border-b-2 border-neutral-300 bg-transparent py-2 text-black placeholder:text-neutral-400 focus:border-black focus:outline-none transition-colors"
        />
        
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center mt-4 py-3 bg-black text-white text-sm uppercase tracking-wide hover:bg-neutral-800 disabled:bg-neutral-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? <Loader2 className='animate-spin'/> : "Sign In"}
      </button>
    </form>
  </div>
</div>
  )
}

export default page