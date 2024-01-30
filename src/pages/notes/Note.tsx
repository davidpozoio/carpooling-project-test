import { Outlet } from "react-router-dom";
import Navigator from "./components/Navigator";

const Note = () => {
  return (
    <div>
      <Navigator />
      <Outlet />
    </div>
  );
};
export default Note;
