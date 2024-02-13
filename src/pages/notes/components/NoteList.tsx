import { useQuery } from "react-query";
import { getMyNotes } from "../../../services/noteService";
import NoteCard from "./NoteCard";
import ModalNoteMenu from "./ModalNoteMenu";
import useToggle from "../../../hooks/useToggle";
import CACHE_KEYS from "../../../consts/cache-keys";
import { useAppStore } from "../../../store/store";
import { useState } from "react";

interface NoteListProps {
  trashBean?: boolean;
}

const NoteList = ({ trashBean }: NoteListProps) => {
  const { toggle, setTrue, setFalse } = useToggle(false);
  const isCreatingNote = useAppStore((state) => state.isCreatingNote);
  const [error, setError] = useState<string | undefined>(undefined);
  const {
    data: notes,
    refetch,
    isLoading,
  } = useQuery(
    [
      CACHE_KEYS.NOTE_LIST.ME,
      trashBean ? CACHE_KEYS.NOTE_LIST.TRASH : CACHE_KEYS.NOTE_LIST.NORMAL,
    ],
    () => getMyNotes(!!trashBean).then((res) => res.data.notes),
    {
      onError: (err) => {
        const error = err as { response: { status: number } };
        if (error?.response?.status === 500) {
          setError("Sorry, there was an error to get the notes, try again!");
        }
      },
      onSuccess: () => {
        setError(undefined);
      },
    }
  );

  const addNote = () => {
    setTrue();
  };

  const handleClose = () => {
    setFalse();
  };

  return (
    <>
      <ModalNoteMenu
        show={(toggle && !trashBean) || (isCreatingNote && !trashBean)}
        onClose={handleClose}
      />
      <h2>{trashBean ? "Trash" : "My notes"}</h2>
      {notes?.length === 0 && (
        <span>
          {trashBean ? "Trash empty" : "There is no notes yet, create one!"}
        </span>
      )}
      {error && (
        <>
          <span>{error}</span>
          <button onClick={() => refetch()} disabled={isLoading}>
            Reload notes
          </button>
        </>
      )}
      {notes?.map((note) => (
        <NoteCard key={note.id} note={note} trashBean={!!trashBean} />
      ))}
      {!trashBean && (
        <button data-testid="add-note" onClick={addNote}>
          +
        </button>
      )}
    </>
  );
};
export default NoteList;
