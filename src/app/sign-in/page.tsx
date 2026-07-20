'use client'
import {useState} from 'react'
import { toast } from 'sonner'

interface formStates {
  email:string,
  password:string,
}
const page = () => {
  const [formData , setFormData] = useState<formStates>({
    email:"",
    password:"",
  });
  const [isLoading,setIsLoading] = useState<boolean>(false);

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
        console.log(data);
        
        
        
        
               
        }catch(error:any){
              toast.error("internal server error")
              setIsLoading(false);
        }
        finally{
          setIsLoading(false)
        }
  }
  return (
    <div>
         <h1>
          Campus Login System
         </h1>
         <form onSubmit={submit}>
          <input type="email" value={formData.email} placeholder='email' onChange={(e)=>{
            setFormData((prev)=>({
              ...prev,email:e.target.value
            }))
          }} />
          <input type="text" placeholder='password' value={formData.password} onChange={(e)=>{
            setFormData((prev)=>({
              ...prev , password:e.target.value
            }))
          }} />
          <button className='p-3 bg-lama-purple'>
              Submit
          </button>
         </form>
    </div>
  )
}

export default page