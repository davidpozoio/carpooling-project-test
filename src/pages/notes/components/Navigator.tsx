import ROUTES from "../../../consts/routes";
import { useMutation, useQueryClient } from "react-query";
import { logout } from "../../../services/authService";
import { useAppStore } from "../../../store/store";
import CACHE_KEYS from "../../../consts/cache-keys";
import BlockLink from "../../../components/BlockLink";
import {
  CopyOutlined,
  DeleteOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "../styles/navigator-styles.css";

const Navigator = () => {
  const queryClient = useQueryClient();
  const setAuth = useAppStore((state) => state.setAuth);
  const setBlockLinks = useAppStore((state) => state.setBlockLinks);
  const { mutate, isLoading } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      setBlockLinks(false);
      setAuth(false);
      queryClient.setQueryData([CACHE_KEYS.NOTE], () => []);
      queryClient.setQueryData([CACHE_KEYS.NOTE_LIST], () => []);
    },
    onError: () => {
      setBlockLinks(false);
    },
  });

  const handleLogout = () => {
    setBlockLinks(true);
    mutate();
  };

  return (
    <nav className="--nav navigator">
      <ul>
        <li>
          <BlockLink to={ROUTES.ROUTES.ME} className="nav-link">
            <CopyOutlined className="icon" />
            <span>My routes</span>
          </BlockLink>
        </li>
        <li>
          <BlockLink to={ROUTES.ROUTES.TRASH} className="nav-link">
            <DeleteOutlined className="icon" />
            All routes
          </BlockLink>
        </li>
        <li>
          <button
            className="nav-link logout"
            onClick={handleLogout}
            disabled={isLoading}
          >
            <LogoutOutlined className="icon" />
            <span>Log out</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};
export default Navigator;
