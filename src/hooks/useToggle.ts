import { useState } from "react";

const useToggle = (intialValue: boolean = true) => {
  const [toggle, setToggle] = useState(intialValue);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  const setFalse = () => {
    setToggle(false);
  };

  const setTrue = () => {
    setToggle(true);
  };

  return { handleToggle, setFalse, setTrue, toggle };
};

export default useToggle;
