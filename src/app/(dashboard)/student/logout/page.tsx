"use client"
import React, { useEffect } from 'react'
import {toast} from "sonner"
const Logout = () => {
  const logout = async () => {
      try {
    const response =    await fetch("/api/auth/logout",{
            method:"POST",
          })
          toast.success("logout Successfully");
          window.location.href = "/login";
  
      } catch (error) {
        console.error(error);
        toast.error("internal error");
      }
    }
    useEffect(()=>{
      logout();
    },[])
  return (
    <>
    </>
  )
}

export default Logout