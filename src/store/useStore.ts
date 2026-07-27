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
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
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