import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Store {
  isNavbarOpen: boolean;
  toggleNavbar: () => void;
  Role: string;
  setRole: (role: string) => void;
  Logout: () => void;
  isFormOpen:boolean;
  toggleForm:()=>void;
  User:any;
  setUser:(user:any)=>void;
  
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      User:{},
      setUser:(user:any)=>set({User:user}),
      isFormOpen:false,
      toggleForm:()=>set((state)=>({isFormOpen:!state.isFormOpen})),
      isNavbarOpen: false,
      toggleNavbar: () => set((state) => ({ isNavbarOpen: !state.isNavbarOpen })),
      Role: "",
      setRole: (role) => set({ Role: role }),
      Logout:()=> {
        
      }
    }),
    {
      name: "user-role-storage",
      partialize: (state) => ({ Role: state.Role }),
    }
  )
);