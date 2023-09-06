import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import { useAuth } from "./useAuth";
import { useRefreshToken } from "./useRefreshToken";

// hook modifies the axiosPrivate custom instance and returnszs the custom instance
export const useAxiosPrivate = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    // by adding req interceptors to attach jwt accessToken to header
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (request) => {
        if (!request.headers["Authorization"]) {
          request.headers[
            "Authorization"
          ] = `Bearer ${auth?.user?.accessToken}`;
        }
        return request;
      },
      (err) => Promise.reject(err)
    );

    // by adding res interceptors to retry request if request failed due to expired accessToken
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (err) => {
        const previousRequest = err?.config;

        if (!previousRequest?.sent && err?.response?.status === 403) {
          previousRequest.sent = true;

          const { accessToken } = await refresh();
          if (accessToken) {
            previousRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            return axiosPrivate(previousRequest);
          }
        }

        return Promise.reject(err);
      }
    );

    // clean up function to remove interceptors on component unmount to prevent interceptors stacking
    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [auth?.user?.accessToken, refresh]);

  return axiosPrivate;
};
