import { NoteGetDto } from "../../../models/noteModel";
import Options from "../../../components/Options";
import useToggle from "../../../hooks/useToggle";
import useNoteCard from "../hooks/useNoteCard";
import { selectDeletingNote, useAppStore } from "../../../store/store";
import { MenuOutlined, LoadingOutlined } from "@ant-design/icons";
import "../styles/note-card-styles.css";

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
    <div className="card-container">
      <span className="card-shadow"></span>
      <div
        onClick={deletingNote?.isDeleting ? () => {} : handleClick}
        className="note-card"
      >
        {deletingNote?.isDeleting && (
          <span className="deleting-overlay">
            <LoadingOutlined style={{ fontSize: "30px" }} />
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
          className="options-button"
        >
          <MenuOutlined />
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
        <span className="card-title">{note.title}</span>
        <p className="card-content">{note.content}</p>
      </div>
    </div>
  );
};
export default NoteCard;
