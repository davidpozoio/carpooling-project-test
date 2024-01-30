export const debounce = (fn: () => void, time: number) => {
  let key: number | undefined = undefined;
  return () => {
    key = setTimeout(() => {
      if (key) {
        clearTimeout(key);
      }
      fn();
    }, time);
  };
};
