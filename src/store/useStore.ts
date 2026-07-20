import {create} from "zustand";
interface Store {
   isNavbarOpen:boolean;
   toggleNavbar:()=>void;
}
export const useStore = create<Store>((set)=>({
   isNavbarOpen:false,
   toggleNavbar:()=> set((state)=>({isNavbarOpen:!state.isNavbarOpen})),
}))