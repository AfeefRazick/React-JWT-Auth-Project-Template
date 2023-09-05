/* eslint react/prop-types: 0 */
import { useEffect } from "react";
import { useRefreshToken } from "../hooks/useRefreshToken";
import {
  PERSISTENT_LOGIN_FAIL,
  PERSISTENT_LOGIN_LOADING,
  PERSISTENT_LOGIN_SUCCESS,
} from "../actionTypes/authTypes";
import { useAuth } from "../hooks/useAuth";
import { Loading } from "./Loading";

export const PersistentLogin = ({ children }) => {
  const { auth, dispatch } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const persistentLogin = async () => {
      dispatch({ type: PERSISTENT_LOGIN_LOADING });

      const data = await refresh();
      if (data) {
        return dispatch({
          type: PERSISTENT_LOGIN_SUCCESS,
          payload: { ...data },
        });
      }
      return dispatch({ type: PERSISTENT_LOGIN_FAIL });
    };
    persistentLogin();
  }, [dispatch, refresh]);

  if (!auth.isAppLoaded) {
    return <Loading type={"circle"} />;
  }
  return <>{children}</>;
};
