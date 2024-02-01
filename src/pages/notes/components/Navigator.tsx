import { Link } from "react-router-dom";
import ROUTES from "../../../consts/routes";
import { useMutation } from "react-query";
import { logout } from "../../../services/authService";
import { useAppStore } from "../../../store/store";

const Navigator = () => {
  const setAuth = useAppStore((state) => state.setAuth);
  const { mutate } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => setAuth(false),
  });

  const handleLogout = () => {
    mutate();
  };

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
          <button onClick={handleLogout}>Log out</button>
        </li>
      </ul>
    </nav>
  );
};
export default Navigator;
