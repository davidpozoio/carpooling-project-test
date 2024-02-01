import { useEffect } from "react";

const useStopPropagation = () => {
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      // Prevent event propagation for all click events in the entire application
      event.stopPropagation();
    };

    document.addEventListener("click", handleGlobalClick);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);
};
export default useStopPropagation;
