import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const useAuthStatus = () => {
  const { user } = useSelector((state) => state.auth);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cheking, setCheking] = useState(true);

  useEffect(() => {
    user ? setIsLoggedIn(true) : setIsLoggedIn(false);
    setCheking(false);
  }, [user]);

  return { isLoggedIn, cheking };
};

export default useAuthStatus;
