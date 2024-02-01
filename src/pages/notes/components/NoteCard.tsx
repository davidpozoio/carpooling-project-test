import { useNavigate } from "react-router-dom";
import { NoteGetDto } from "../../../models/noteModel";
import ROUTES from "../../../consts/routes";
import Options from "../../../components/Options";
import { MouseEventHandler } from "react";
import useToggle from "../../../hooks/useToggle";
import { useMutation, useQueryClient } from "react-query";
import { deleteNote } from "../../../services/noteService";
import CACHE_KEYS from "../../../consts/cache-keys";

interface NoteCardProps {
  note: NoteGetDto;
  trashBean?: boolean;
}

const NoteCard = ({ note, trashBean = false }: NoteCardProps) => {
  const navigate = useNavigate();
  const { toggle, setFalse, handleToggle } = useToggle(false);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteNote(id),
    onSuccess: () => {
      queryClient.setQueryData(
        [CACHE_KEYS.NOTE_LIST, !!trashBean],
        (oldData?: NoteGetDto[]) => {
          if (!oldData) return [];
          return oldData.filter((oldNote) => oldNote.id != note.id);
        }
      );
    },
  });

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (!trashBean)
      navigate(ROUTES.NOTES.EDITORID(note.id), { state: { note } });
  };

  const handleDelete = () => {};

  const handleDeletePermanently = () => {
    mutate(note.id);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: 250,
        height: 250,
        overflow: "hidden",
        backgroundColor: "beige",
      }}
    >
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
            name: "Delete",
            onClick: handleDelete,
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
