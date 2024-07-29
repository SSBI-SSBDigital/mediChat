import { create } from "zustand";

interface DrawerState {
  isOpen: boolean;
  drawerWidth: number;
  appDrawerWidth: string;
  toggleDrawerOpen: (open: boolean) => void;
  toggleDrawerWidth: (width: number) => void;
}

const useDrawerStore = create<DrawerState>((set) => ({
  isOpen: true,
  drawerWidth: 260,
  appDrawerWidth: "300px",
  toggleDrawerOpen: (open) => set({ isOpen: open }),
  toggleDrawerWidth: (width) => set({ drawerWidth: width }),
}));

export default useDrawerStore;
