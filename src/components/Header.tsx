import { Link } from "react-router-dom";
import ROUTES from "../consts/routes";
import BlockLink from "./BlockLink";

interface HeaderProps {
  path: string;
}

const Header = ({ path }: HeaderProps) => {
  return (
    <header className="header">
      <button className="options">...</button>
      <BlockLink to={path.match("/notes") ? ROUTES.NOTES.ME : ROUTES.HOME.ME}>
        Blocky
      </BlockLink>
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
