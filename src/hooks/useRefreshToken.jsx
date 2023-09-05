import { LOGOUT_SUCCESS, REFRESH_ACCESS_TOKEN } from "../actionTypes/authTypes";
import { axiosPublic } from "../api/axios";
import { useAuth } from "./useAuth";

export const useRefreshToken = () => {
  const { dispatch } = useAuth();

  const refresh = async () => {
    try {
      const response = await axiosPublic.get("/refresh-token", {
        withCredentials: true,
      });

      dispatch({
        type: REFRESH_ACCESS_TOKEN,
        payload: { accessToken: response?.data?.accessToken },
      });

      return { ...response?.data };
    } catch (err) {
      if (err?.response?.status === 403) {
        dispatch({ type: LOGOUT_SUCCESS });
        // navigate("/login", { state: { from: location } });
        return;
      }
    }
  };
  return refresh;
};
