import { useState } from "react";

const useDebounce = <T>(fn: (param: T) => void, time: number) => {
  const [key, setKey] = useState<number | undefined>(undefined);

  const debounce: typeof fn = (param) => {
    if (key) {
      clearTimeout(key);
    }

    setKey(
      setTimeout(() => {
        fn(param);
      }, time)
    );
  };

  return { debounce };
};

export default useDebounce;
