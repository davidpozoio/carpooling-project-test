import { Link } from "react-router-dom";
import ROUTES from "../consts/routes";

interface HeaderProps {
  path: string;
}

const Header = ({ path }: HeaderProps) => {
  return (
    <header className="header">
      <button className="options">...</button>
      <Link to={path.match("/notes") ? ROUTES.NOTES.ME : ROUTES.HOME.ME}>
        Blocky
      </Link>
      {path === ROUTES.HOME.ME && (
        <>
          <Link to={ROUTES.AUTH.LOGIN}>Log in</Link>
          <Link to={ROUTES.AUTH.SIGNUP}>Sign up</Link>
        </>
      )}
    </header>
  );
};
export default Header;
