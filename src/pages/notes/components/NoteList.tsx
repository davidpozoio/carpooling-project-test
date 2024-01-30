import { useQuery } from "react-query";
import { getMyNotes } from "../../../services/noteService";
import NoteCard from "./NoteCard";
import ModalNoteMenu from "./ModalNoteMenu";
import useToggle from "../../../hooks/useToggle";

const NoteList = () => {
  const { toggle, setTrue, setFalse } = useToggle(false);
  const { data: notes, isFetching } = useQuery(["notes"], () =>
    getMyNotes().then((res) => res.data.notes)
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
      <h2>My notes</h2>
      <span>fetching: {String(isFetching)}</span>
      {notes?.length === 0 && <span>There is no notes yet, create one!</span>}
      {notes?.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
      <button data-testid="add-note" onClick={addNote}>
        +
      </button>
    </>
  );
};
export default NoteList;
