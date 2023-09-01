/* eslint-disable react/prop-types */
import { useReducer } from "react";
import { authContext } from "../context/authContext";
import { Loading } from "./Loading";
import * as authTypes from "../actionTypes/authTypes";

const reducer = (auth, action) => {
  switch (action.type) {
    case authTypes.LOGIN_WITH_OAUTH_SUCCESS:
      localStorage.setItem("JWTTOKEN", action.payload.credential);
      return {
        ...auth,
        isLoading: false,
        isAppLoaded: true,
        isAuthenticated: true,
        user: { ...action.payload },
      };

    case authTypes.LOGOUT_SUCCESS:
      localStorage.removeItem("JWTTOKEN");
      return { ...auth, isAuthenticated: false, user: {} };

    case authTypes.UPDATE_USER_LOADING:
      return { ...auth, isLoading: true };

    case authTypes.UPDATE_USER_SUCCESS:
      return {
        ...auth,
        user: { ...action.payload },
        isLoading: false,
        isAuthenticated: true,
      };

    case authTypes.DELETE_USER_SUCCESS:
      localStorage.removeItem("JWTTOKEN");
      return {
        ...auth,
        isLoading: false,
        isAuthenticated: false,
        user: {},
      };

    case authTypes.PERSISTENT_LOGIN_LOADING:
      return { ...auth, isLoading: true, isAppLoaded: false };

    case authTypes.PERSISTENT_LOGIN_FAIL:
      return {
        ...auth,
        isLoading: false,
        isAuthenticated: false,
        isAppLoaded: true,
      };

    case authTypes.PERSISTENT_LOGIN_SUCCESS:
      localStorage.setItem("JWTTOKEN", action.payload.credential);

      return {
        ...auth,
        isLoading: false,
        isAppLoaded: true,
        isAuthenticated: true,
        user: { ...action.payload },
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(reducer, {
    isAuthenticated: false,
    isLoading: true,
    user: {},
    isAppLoaded: false,
  });
  // change to not
  if (auth.isAppLoaded) {
    return <Loading type={"circle"} />;
  }

  return (
    <authContext.Provider value={{ auth, dispatch }}>
      {children}
    </authContext.Provider>
  );
};
