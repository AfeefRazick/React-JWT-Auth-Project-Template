import { useCallback } from "react";
import { useAuth } from "./useAuth";
import { LOGOUT_SUCCESS } from "../actionTypes/authTypes";
import { axiosPrivate } from "../api/axios";

export const useLogout = () => {
  const { dispatch } = useAuth();

  const logout = useCallback(async () => {
    await axiosPrivate.get("/logout");
    dispatch({ type: LOGOUT_SUCCESS });
  }, [dispatch]);

  return logout;
};
