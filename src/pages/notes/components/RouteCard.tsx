import Options from "../../../components/Options";
import useToggle from "../../../hooks/useToggle";
import useNoteCard from "../hooks/useNoteCard";
import { selectDeletingNote, useAppStore } from "../../../store/store";
import { MenuOutlined, LoadingOutlined } from "@ant-design/icons";
import { RouteGetResponse } from "../../../models/routeMode";
import "../styles/note-card-styles.css";

interface NoteCardProps {
  route: RouteGetResponse;
  trashBean?: boolean;
}

const RouteCard = ({ route, trashBean = false }: NoteCardProps) => {
  const { toggle, setFalse, handleToggle } = useToggle(false);

  const { handleClick, handleDeletePermanently } = useNoteCard(
    route,
    trashBean
  );
  const deletingNote = useAppStore((state) =>
    selectDeletingNote(state, route.id)
  );

  return (
    <div className="card-container">
      <span className="card-shadow"></span>
      <div
        onClick={deletingNote?.isDeleting ? () => {} : handleClick}
        className="note-card"
      >
        {deletingNote?.isDeleting && (
          <span className="deleting-overlay opacity-transition">
            <LoadingOutlined style={{ fontSize: "30px" }} />
            {trashBean
              ? deletingNote?.isDeletingPermanently
                ? "Eliminando ruta..."
                : "Restaurando ruta..."
              : "Eliminando ruta..."}
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
              name: "Eliminar",
              onClick: handleDeletePermanently,
            },
          ]}
        />
        <span className="card-title">{route.name}</span>
        <p className="card-content">{route.description}</p>
      </div>
    </div>
  );
};
export default RouteCard;
