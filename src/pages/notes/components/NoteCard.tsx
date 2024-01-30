import { useNavigate } from "react-router-dom";
import { NoteGetDto } from "../../../models/noteModel";
import ROUTES from "../../../consts/routes";

interface NoteCardProps {
  note: NoteGetDto;
}

const NoteCard = ({ note }: NoteCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.NOTES.EDITORID(note.id), { state: { note } });
  };

  return (
    <button onClick={handleClick}>
      <span>{note.title}</span>
      <p>{note.content}</p>
    </button>
  );
};
export default NoteCard;
