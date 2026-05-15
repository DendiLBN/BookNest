import { useSelector } from "react-redux";

import { selectIsLoggedIn, selectUser } from "@/store/reducers/auth";

const useUser = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  return { user, isLoggedIn };
};

export default useUser;
