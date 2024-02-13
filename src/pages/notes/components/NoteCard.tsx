import { NoteGetDto } from "../../../models/noteModel";
import Options from "../../../components/Options";
import useToggle from "../../../hooks/useToggle";
import useNoteCard from "../hooks/useNoteCard";
import { selectDeletingNote, useAppStore } from "../../../store/store";

interface NoteCardProps {
  note: NoteGetDto;
  trashBean?: boolean;
}

const NoteCard = ({ note, trashBean = false }: NoteCardProps) => {
  const { toggle, setFalse, handleToggle } = useToggle(false);

  const { handleClick, handleDelete, handleDeletePermanently, handleRestore } =
    useNoteCard(note, trashBean);
  const deletingNote = useAppStore((state) =>
    selectDeletingNote(state, note.id)
  );

  return (
    <div
      onClick={deletingNote?.isDeleting ? () => {} : handleClick}
      style={{
        width: 250,
        height: 250,
        overflow: "hidden",
        backgroundColor: "beige",
      }}
    >
      {deletingNote?.isDeleting && (
        <span style={{ backgroundColor: "red" }}>
          {trashBean
            ? deletingNote?.isDeletingPermanently
              ? "Deleting note..."
              : "Restoring note..."
            : "Deleting note..."}
        </span>
      )}
      <button
        data-testid="options"
        onClick={(e) => {
          e.stopPropagation();
          handleToggle();
        }}
      >
        ...
      </button>
      <Options
        data-testid="options"
        show={toggle}
        onClose={() => {
          setFalse();
        }}
        values={[
          {
            name: trashBean ? "Restore note" : "Delete",
            onClick: trashBean ? handleRestore : handleDelete,
          },
          {
            name: "Delete permanently",
            onClick: handleDeletePermanently,
          },
        ]}
      />
      <span>{note.title}</span>
      <p>{note.content}</p>
    </div>
  );
};
export default NoteCard;
