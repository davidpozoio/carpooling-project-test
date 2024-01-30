import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store/store";

type FetchFn<T> = (data: T) => Promise<unknown>;

interface UseAutomaticLoginProps<T> {
  fetchFn: FetchFn<T>;
  redirectWhenError?: string;
  redirectWhenSuccess?: string;
}

const useAutomaticLogin = <T>({
  fetchFn,
  redirectWhenError,
  redirectWhenSuccess,
}: UseAutomaticLoginProps<T>) => {
  const navigate = useNavigate();
  const setAuth = useAppStore((state) => state.setAuth);

  const { mutate } = useMutation({
    mutationFn: fetchFn,
    onError: () => {
      setAuth(false);
      if (redirectWhenError) {
        navigate(redirectWhenError);
      }
    },
    onSuccess: () => {
      setAuth(true);
      if (redirectWhenSuccess) {
        navigate(redirectWhenSuccess);
      }
    },
  });

  return { mutate };
};
export default useAutomaticLogin;
