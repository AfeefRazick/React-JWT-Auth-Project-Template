import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useRefreshToken } from "./useRefreshToken";
import {
  PERSISTENT_LOGIN_FAIL,
  PERSISTENT_LOGIN_LOADING,
  PERSISTENT_LOGIN_SUCCESS,
} from "../actionTypes/authTypes";

export const usePersistLogin = () => {
  const { dispatch } = useAuth();
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
};
