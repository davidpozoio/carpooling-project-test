import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  deleteNote,
  markNoteAsDeleted,
  restoreNote,
} from "../../../services/noteService";
import CACHE_KEYS from "../../../consts/cache-keys";
import { NoteGetDto } from "../../../models/noteModel";
import { MouseEventHandler } from "react";
import ROUTES from "../../../consts/routes";
import { useAppStore } from "../../../store/store";

const useNoteCard = (note: NoteGetDto, trashBean: boolean) => {
  const navigate = useNavigate();
  const setIsDeletingState = useAppStore((state) => state.setIsDeletingState);
  const queryClient = useQueryClient();

  const deletePermanently = useMutation({
    mutationFn: (id: number) => deleteNote(id),
    onSuccess: () => {
      queryClient.setQueryData(
        [
          CACHE_KEYS.NOTE_LIST.ME,
          trashBean ? CACHE_KEYS.NOTE_LIST.TRASH : CACHE_KEYS.NOTE_LIST.NORMAL,
        ],
        (oldData?: NoteGetDto[]) => {
          if (!oldData) return [];
          return oldData.filter((oldNote) => oldNote.id != note.id);
        }
      );
      setIsDeletingState(false, note.id, false);
    },
    onError: () => {
      setIsDeletingState(false, note.id, false);
    },
  });

  const markAsDeleted = useMutation({
    mutationFn: (id: number) => markNoteAsDeleted(id),
    onSuccess: () => {
      queryClient.setQueryData(
        [CACHE_KEYS.NOTE_LIST.ME, CACHE_KEYS.NOTE_LIST.NORMAL],
        (oldData?: NoteGetDto[]) => {
          if (!oldData) return [];
          return oldData.filter((oldNote) => oldNote.id != note.id);
        }
      );

      queryClient.setQueriesData(
        [CACHE_KEYS.NOTE_LIST.ME, CACHE_KEYS.NOTE_LIST.TRASH],
        (oldData?: NoteGetDto[]) => {
          if (!oldData) return [];
          return [...oldData, note];
        }
      );
      setIsDeletingState(false, note.id);
    },
    onError: () => {
      setIsDeletingState(false, note.id);
    },
  });

  const restore = useMutation({
    mutationFn: (id: number) => restoreNote(id),
    onSuccess: () => {
      queryClient.setQueryData(
        [CACHE_KEYS.NOTE_LIST.ME, CACHE_KEYS.NOTE_LIST.TRASH],
        (oldData?: NoteGetDto[]) => {
          if (!oldData) return [];
          return oldData.filter((oldNote) => oldNote.id != note.id);
        }
      );

      queryClient.setQueriesData(
        [CACHE_KEYS.NOTE_LIST.ME, CACHE_KEYS.NOTE_LIST.NORMAL],
        (oldData?: NoteGetDto[]) => {
          if (!oldData) return [];
          return [...oldData, note];
        }
      );
      setIsDeletingState(false, note.id);
    },
    onError: () => {
      setIsDeletingState(false, note.id);
    },
  });

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (!trashBean)
      navigate(ROUTES.NOTES.EDITORID(note.id), { state: { note } });
  };

  const handleRestore = () => {
    setIsDeletingState(true, note.id);
    restore.mutate(note.id);
  };

  const handleDelete = () => {
    setIsDeletingState(true, note.id);
    markAsDeleted.mutate(note.id);
  };

  const handleDeletePermanently = () => {
    setIsDeletingState(true, note.id, true);
    deletePermanently.mutate(note.id);
  };

  return {
    handleClick,
    handleRestore,
    handleDelete,
    handleDeletePermanently,
  };
};

export default useNoteCard;
