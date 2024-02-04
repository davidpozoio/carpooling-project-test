import { useQuery } from "react-query";
import { getMyNotes } from "../../../services/noteService";
import NoteCard from "./NoteCard";
import ModalNoteMenu from "./ModalNoteMenu";
import useToggle from "../../../hooks/useToggle";
import CACHE_KEYS from "../../../consts/cache-keys";
import { useAppStore } from "../../../store/store";

interface NoteListProps {
  trashBean?: boolean;
}

const NoteList = ({ trashBean }: NoteListProps) => {
  const { toggle, setTrue, setFalse } = useToggle(false);
  const isCreatingNote = useAppStore((state) => state.isCreatingNote);
  const { data: notes } = useQuery(
    [
      CACHE_KEYS.NOTE_LIST.ME,
      trashBean ? CACHE_KEYS.NOTE_LIST.TRASH : CACHE_KEYS.NOTE_LIST.NORMAL,
    ],
    () => getMyNotes(!!trashBean).then((res) => res.data.notes)
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
