import { useState } from "react";

interface HttpError {
  code?: string;
  response?: {
    status?: number;
  };
}

const useHttpError = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const setError = (error: HttpError) => {
    if (error?.code === "ERR_NETWORK") {
      setErrorMessage("Sorry, there was a connection error, try again");
    }
    if (error?.response && error?.response?.status === 500) {
      setErrorMessage("Sorry, there was an error, try again");
    }
  };

  const reset = () => {
    setErrorMessage("");
  };

  return { errorMessage, setError, reset };
};

export default useHttpError;
