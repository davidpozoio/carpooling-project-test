import { Link } from "react-router-dom";
import ROUTES from "../consts/routes";

interface HeaderProps {
  isHome: boolean;
}

const Header = ({ isHome = true }: HeaderProps) => {
  return (
    <header className="header">
      <button className="options">...</button>
      <span>Blocky</span>
      {isHome && (
        <>
          <Link to={ROUTES.AUTH.LOGIN}>Log in</Link>
          <Link to={ROUTES.AUTH.SIGNUP}>Sign up</Link>
        </>
      )}
    </header>
  );
};
export default Header;
