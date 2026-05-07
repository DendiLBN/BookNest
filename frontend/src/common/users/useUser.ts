import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/common/consts/local-storage";
import { useFetchUsersQuery } from "@/store/api/users";
import { selectIsLoggedIn, selectUser, setIsLoggedIn } from "@/store/reducers/auth";

const useUser = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const user = useSelector(selectUser);
  console.log("user", user);
  console.log("isLoggedIn", isLoggedIn);
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  const { refetch } = useFetchUsersQuery(undefined, {
    skip: !accessToken || !refreshToken,
  });

  useEffect(() => {
    if (accessToken && refreshToken) {
      refetch()
        .then(({ data }) => {
          dispatch(setIsLoggedIn({ isLoggedIn: !!data, user: data ?? null }));
        })
        .catch(() => {
          dispatch(setIsLoggedIn({ isLoggedIn: false, user: null }));
        });
    }
  }, [accessToken, refreshToken, dispatch, refetch]);

  return { user, isLoggedIn };
};

export default useUser;
