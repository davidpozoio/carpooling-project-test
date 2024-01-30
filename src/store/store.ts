import { create } from "zustand";

interface UserState {
  isAuth: boolean;
  setAuth: (auth: boolean) => void;
}

export const useAppStore = create<UserState>((set) => ({
  isAuth: false,
  setAuth: (auth) => {
    set({ isAuth: auth });
  },
}));
