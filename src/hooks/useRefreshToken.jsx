import { REFRESH_ACCESS_TOKEN } from "../actionTypes/authTypes";
import { axiosPublic } from "../api/axios";
import { useAuth } from "./useAuth";

export const useRefreshToken = () => {
  const { dispatch } = useAuth();
  const refresh = async () => {
    const response = await axiosPublic.get("/refresh-token", {
      withCredentials: true,
    });
    dispatch({
      type: REFRESH_ACCESS_TOKEN,
      payload: { accessToken: response?.data?.accessToken },
    });

    return response?.data?.accessToken;
  };
  return refresh;
};
