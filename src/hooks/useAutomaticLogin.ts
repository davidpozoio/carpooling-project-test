import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store/store";

type FetchFn<T> = (data: T) => Promise<unknown>;

interface UseAutomaticLoginProps<T> {
  fetchFn: FetchFn<T>;
  redirectWhenError?: string;
  redirectWhenSuccess?: string;
  onError?: (data: unknown) => void;
  onSettled?: () => void;
  onSuccess?: () => void;
}

const useAutomaticLogin = <T>({
  fetchFn,
  redirectWhenError,
  redirectWhenSuccess,
  onError,
  onSettled,
  onSuccess,
}: UseAutomaticLoginProps<T>) => {
  const navigate = useNavigate();
  const setAuth = useAppStore((state) => state.setAuth);
  const { mutate, isLoading, isError, isPaused } = useMutation({
    mutationFn: fetchFn,
    onError: (data) => {
      if (onError) onError(data);
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
      if (onSuccess) onSuccess();
    },
    onSettled,
  });

  return { mutate, isLoading, isError, isPaused };
};
export default useAutomaticLogin;
