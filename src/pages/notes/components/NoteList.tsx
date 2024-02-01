import { useQuery } from "react-query";
import { getMyNotes } from "../../../services/noteService";
import NoteCard from "./NoteCard";
import ModalNoteMenu from "./ModalNoteMenu";
import useToggle from "../../../hooks/useToggle";
import CACHE_KEYS from "../../../consts/cache-keys";

interface NoteListProps {
  trashBean?: boolean;
}

const NoteList = ({ trashBean }: NoteListProps) => {
  const { toggle, setTrue, setFalse } = useToggle(false);
  const { data: notes, isFetching } = useQuery(
    [CACHE_KEYS.NOTE_LIST, !!trashBean],
    () => getMyNotes(!!trashBean).then((res) => res.data.notes),
    {
      refetchOnWindowFocus: false,
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
      <ModalNoteMenu show={toggle} onClose={handleClose} />
      <h2>{trashBean ? "Trash" : "My notes"}</h2>
      <span>fetching: {String(isFetching)}</span>
      {notes?.length === 0 && <span>There is no notes yet, create one!</span>}
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
