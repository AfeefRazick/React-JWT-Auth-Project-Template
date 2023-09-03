import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import { useAuth } from "./useAuth";

export const useAxiosPrivate = () => {
  const { auth } = useAuth();
  useEffect(() => {
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

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      (err) => {
        const previousRequest = err;
        console.log(err);
        return Promise.reject(err);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [auth?.accessToken]);

  return axiosPrivate;
};
