import { MutableRefObject, useEffect } from "react";

const useOutsideAlerter = (
  ref: MutableRefObject<HTMLElement | null>,
  fn: () => void
) => {
  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (!event.target) {
        return;
      }
      if (!ref.current?.contains(event.target as Node)) {
        fn();
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref, fn]);
};

export default useOutsideAlerter;
