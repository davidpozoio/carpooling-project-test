import { Outlet } from "react-router-dom";
import Navigator from "./components/Navigator";
import "./styles/note-styles.css";

const Note = () => {
  return (
    <div className="note-grid">
      <Navigator />
      <Outlet />
    </div>
  );
};
export default Note;
