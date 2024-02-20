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
import { RouteGetResponse } from "../../../models/routeMode";

const useNoteCard = (route: RouteGetResponse, trashBean: boolean) => {
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
          return oldData.filter((oldNote) => oldNote.id != route.id);
        }
      );
      setIsDeletingState(false, route.id, false);
    },
    onError: () => {
      setIsDeletingState(false, route.id, false);
    },
  });

  const markAsDeleted = useMutation({
    mutationFn: (id: number) => markNoteAsDeleted(id),
    onSuccess: () => {
      queryClient.setQueryData(
        [CACHE_KEYS.NOTE_LIST.ME, CACHE_KEYS.NOTE_LIST.NORMAL],
        (oldData?: NoteGetDto[]) => {
          if (!oldData) return [];
          return oldData.filter((oldNote) => oldNote.id != route.id);
        }
      );

      /*     queryClient.setQueriesData(
        [CACHE_KEYS.NOTE_LIST.ME, CACHE_KEYS.NOTE_LIST.TRASH],
        (oldData?: NoteGetDto[]) => {
          if (!oldData) return [];
          return [...oldData, route];
        }
      ); */
      setIsDeletingState(false, route.id);
    },
    onError: () => {
      setIsDeletingState(false, route.id);
    },
  });

  const restore = useMutation({
    mutationFn: (id: number) => restoreNote(id),
    onSuccess: () => {
      queryClient.setQueryData(
        [CACHE_KEYS.NOTE_LIST.ME, CACHE_KEYS.NOTE_LIST.TRASH],
        (oldData?: NoteGetDto[]) => {
          if (!oldData) return [];
          return oldData.filter((oldNote) => oldNote.id != route.id);
        }
      );

      /*    queryClient.setQueriesData(
        [CACHE_KEYS.NOTE_LIST.ME, CACHE_KEYS.NOTE_LIST.NORMAL],
        (oldData?: NoteGetDto[]) => {
          if (!oldData) return [];
          return [...oldData, route];
        }
      ); */
      setIsDeletingState(false, route.id);
    },
    onError: () => {
      setIsDeletingState(false, route.id);
    },
  });

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (!trashBean)
      navigate(ROUTES.ROUTES.EDITORID(route.id), { state: { route } });
  };

  const handleRestore = () => {
    setIsDeletingState(true, route.id);
    restore.mutate(route.id);
  };

  const handleDelete = () => {
    setIsDeletingState(true, route.id);
    markAsDeleted.mutate(route.id);
  };

  const handleDeletePermanently = () => {
    setIsDeletingState(true, route.id, true);
    deletePermanently.mutate(route.id);
  };

  return {
    handleClick,
    handleRestore,
    handleDelete,
    handleDeletePermanently,
  };
};

export default useNoteCard;
