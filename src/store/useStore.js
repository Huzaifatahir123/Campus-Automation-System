import {create} from "zustand";
export const useStore = create((set)=>{
   isNavbarOpen:false;
   toggleNavbar:()=> set((state)=>({isNavbarOpen:!state.isNavbarOpen}));
})