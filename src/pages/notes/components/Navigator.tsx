import { Link } from "react-router-dom";
import ROUTES from "../../../consts/routes";

const Navigator = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={ROUTES.NOTES.ME}>My notes</Link>
        </li>
        <li>
          <Link to={ROUTES.NOTES.TRASH}>Trash</Link>
        </li>
        <li>
          <button>Log out</button>
        </li>
      </ul>
    </nav>
  );
};
export default Navigator;
