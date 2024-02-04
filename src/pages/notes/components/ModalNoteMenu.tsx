import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { createNote } from "../../../services/noteService";
import { NoteContent, NoteGetDto } from "../../../models/noteModel";
import ROUTES from "../../../consts/routes";
import CACHE_KEYS from "../../../consts/cache-keys";
import { useAppStore } from "../../../store/store";

interface ModalNoteMenuProps {
  show?: boolean;
  onClose?: () => void;
}

const ModalNoteMenu = ({
  show = false,
  onClose = () => {},
}: ModalNoteMenuProps) => {
  const navigate = useNavigate();
  const setIsCreatingNote = useAppStore((state) => state.setIsCreatingNote);
  const isCreatingNote = useAppStore((state) => state.isCreatingNote);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data: NoteContent) => createNote(data),
    onSuccess: (response) => {
      const note = response.data.note;

      queryClient.setQueryData(
        [CACHE_KEYS.NOTE_LIST.ME, CACHE_KEYS.NOTE_LIST.NORMAL],
        (oldData?: NoteGetDto[]) => {
          if (!oldData) return [];
          return [response.data.note, ...oldData];
        }
      );
      setIsCreatingNote(false);

      navigate(ROUTES.NOTES.EDITORID(response.data.note.id), {
        state: { note },
      });
    },
    onError: () => {
      setIsCreatingNote(false);
    },
  });

  const handleClick = () => {
    mutate({ title: "Default title", content: "Default content" });
    setIsCreatingNote(true);
  };

  return (
    <div
      style={{
        display: show ? "flex" : "none",
        position: "fixed",
      }}
    >
      <h3>Create a new note</h3>
      <button onClick={handleClick} disabled={isCreatingNote}>
        {isCreatingNote ? "Creating..." : "create!"}
      </button>
      <button onClick={onClose} disabled={isCreatingNote}>
        cancel
      </button>
    </div>
  );
};
export default ModalNoteMenu;
