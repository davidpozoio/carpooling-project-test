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
  onClick?: () => void;
}

const RouteCard = ({ route, trashBean = false, onClick }: NoteCardProps) => {
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
        onClick={
          deletingNote?.isDeleting
            ? () => {}
            : (e) => {
                if (onClick) onClick();
                handleClick(e);
              }
        }
        className="note-card"
      >
        {deletingNote?.isDeleting && (
          <span className="deleting-overlay opacity-transition">
            <LoadingOutlined style={{ fontSize: "30px" }} />
            {trashBean
              ? deletingNote?.isDeletingPermanently
                ? "Deleting route..."
                : "Restoring route..."
              : "Deleting route..."}
          </span>
        )}
        {!trashBean && (
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
        )}

        <Options
          data-testid="options"
          show={toggle}
          onClose={() => {
            setFalse();
          }}
          values={[
            {
              name: "Delete",
              onClick: handleDeletePermanently,
            },
          ]}
        />
        <span className="card-title">{route.name}</span>
        <p className="card-content">{route.description}</p>
        <span>{new Date(route.startDate).toDateString()}</span>
      </div>
    </div>
  );
};
export default RouteCard;
