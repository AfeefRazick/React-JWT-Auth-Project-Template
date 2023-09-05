import { useNavigate } from "react-router-dom";
import { LOGOUT_SUCCESS, REFRESH_ACCESS_TOKEN } from "../actionTypes/authTypes";
import { axiosPublic } from "../api/axios";
import { useAuth } from "./useAuth";

export const useRefreshToken = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      const response = await axiosPublic.get("/refresh-token", {
        withCredentials: true,
      });

      dispatch({
        type: REFRESH_ACCESS_TOKEN,
        payload: { accessToken: response?.data?.accessToken },
      });
      return response?.data?.accessToken;
    } catch (err) {
      if (err?.response?.status === 403) {
        dispatch({ type: LOGOUT_SUCCESS });
        navigate("/login");
        return;
      }
    }
  };
  return refresh;
};
