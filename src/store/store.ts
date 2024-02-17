import { create } from "zustand";

interface UserState {
  isAuth: boolean;
  setAuth: (auth: boolean) => void;
}

interface NoteState {
  id: number;
  isDeleting: boolean;
  isDeletingPermanently?: boolean;
}

interface NoteListState {
  notes: NoteState[];
  setIsDeletingState: (
    isDeleting: boolean,
    noteId: number,
    isDeletingPermanently?: boolean
  ) => void;
  isCreatingNote: boolean;
  setIsCreatingNote: (state: boolean) => void;
}

interface AppState extends UserState, NoteListState {
  blockLinks: boolean;
  setBlockLinks: (state: boolean) => void;
  isAuthenticating: boolean;
  setIsAuthenticating: (state: boolean) => void;
}

export const selectDeletingNote = (state: AppState, noteId: number) =>
  state.notes.find((note) => note.id === noteId);

export const useAppStore = create<AppState>((set, get) => ({
  isAuth: false,
  setAuth: (auth) => {
    set({ isAuth: auth });
  },
  notes: [],
  setIsDeletingState: (isDeleting, id, isDeletingPermanently = false) => {
    const state = get();
    if (!isDeleting) {
      set({ notes: state.notes.filter((note) => note.id !== id) });
      return;
    }
    set({ notes: [...state.notes, { id, isDeleting, isDeletingPermanently }] });
  },
  isCreatingNote: false,
  setIsCreatingNote: (state) => {
    set({ isCreatingNote: state });
  },
  blockLinks: false,
  setBlockLinks: (state) => {
    set({ blockLinks: state });
  },
  isAuthenticating: false,
  setIsAuthenticating: (state) => {
    set({ isAuthenticating: state });
  },
}));
