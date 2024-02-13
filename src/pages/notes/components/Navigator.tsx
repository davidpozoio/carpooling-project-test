import ROUTES from "../../../consts/routes";
import { useMutation, useQueryClient } from "react-query";
import { logout } from "../../../services/authService";
import { useAppStore } from "../../../store/store";
import CACHE_KEYS from "../../../consts/cache-keys";
import BlockLink from "../../../components/BlockLink";

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
    <nav>
      <ul>
        <li>
          <BlockLink to={ROUTES.NOTES.ME}>My notes</BlockLink>
        </li>
        <li>
          <BlockLink to={ROUTES.NOTES.TRASH}>Trash</BlockLink>
        </li>
        <li>
          <button onClick={handleLogout} disabled={isLoading}>
            Log out
          </button>
        </li>
      </ul>
    </nav>
  );
};
export default Navigator;
