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
  selectDeletingNote: (id: number) => NoteState | undefined;
  isCreatingNote: boolean;
  setIsCreatingNote: (state: boolean) => void;
}

interface AppState extends UserState, NoteListState {}

export const useAppStore = create<AppState>((set, get) => ({
  isAuth: false,
  setAuth: (auth) => {
    set({ isAuth: auth });
  },
  notes: [],
  selectDeletingNote: (noteId) => {
    return get().notes.find((note) => note.id === noteId);
  },
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
}));
