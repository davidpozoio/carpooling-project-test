import { create } from "zustand";

interface InitialState {
  name: string;
}

export const useAppStore = create<InitialState>(() => ({
  name: "",
}));
