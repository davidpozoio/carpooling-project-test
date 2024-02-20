import { Link } from "react-router-dom";
import ROUTES from "../consts/routes";
import BlockLink from "./BlockLink";
import "./styles/header-styles.css";

interface HeaderProps {
  path: string;
}

const Header = ({ path }: HeaderProps) => {
  return (
    <header className="header content-grid">
      <div className="content">
        <button className="options">...</button>
        <BlockLink
          to={path.match("/notes") ? ROUTES.ROUTES.ME : ROUTES.HOME.ME}
          className="gradient-title"
        >
          Carpooling
        </BlockLink>
        {path === ROUTES.HOME.ME && (
          <nav className="nav">
            <Link to={ROUTES.AUTH.LOGIN} className="button --dark">
              Log in
            </Link>
            <Link to={ROUTES.AUTH.SIGNUP} className="button --dark">
              Sign up
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};
export default Header;
