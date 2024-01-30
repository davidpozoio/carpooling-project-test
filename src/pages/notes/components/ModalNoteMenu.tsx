import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { createNote } from "../../../services/noteService";
import { NoteContent } from "../../../models/noteModel";
import ROUTES from "../../../consts/routes";

interface ModalNoteMenuProps {
  show?: boolean;
  onClose?: () => void;
}

const ModalNoteMenu = ({
  show = false,
  onClose = () => {},
}: ModalNoteMenuProps) => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (data: NoteContent) => createNote(data),
    onSuccess: (response) => {
      const note = response.data.note;
      navigate(ROUTES.NOTES.EDITORID(response.data.note.id), {
        state: { note },
      });
    },
  });

  const handleClick = () => {
    mutate({ title: "Default title", content: "Default content" });
  };

  return (
    <div style={{ display: show ? "flex" : "none", position: "fixed" }}>
      <h3>Create a new note</h3>
      <button onClick={handleClick}>create!</button>
      <button onClick={onClose}>cancel</button>
    </div>
  );
};
export default ModalNoteMenu;
