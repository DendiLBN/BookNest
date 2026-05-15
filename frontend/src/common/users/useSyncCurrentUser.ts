import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/common/consts/local-storage";
import { useFetchUsersQuery } from "@/features/users/api";
import { setIsLoggedIn } from "@/store/reducers/auth";

export const useSyncCurrentUser = () => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  const hasStoredSession = !!accessToken && !!refreshToken;

  const { data: user, isError } = useFetchUsersQuery(undefined, {
    skip: !hasStoredSession,
  });

  useEffect(() => {
    if (!hasStoredSession) {
      dispatch(setIsLoggedIn({ isLoggedIn: false, user: null }));
      return;
    }

    if (user) {
      dispatch(setIsLoggedIn({ isLoggedIn: true, user }));
      return;
    }

    if (isError) {
      dispatch(setIsLoggedIn({ isLoggedIn: false, user: null }));
    }
  }, [dispatch, hasStoredSession, isError, user]);
};
