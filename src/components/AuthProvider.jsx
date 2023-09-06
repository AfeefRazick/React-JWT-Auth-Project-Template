/* eslint-disable react/prop-types */
import { useReducer } from "react";
import { authContext } from "../context/authContext";
import * as authTypes from "../actionTypes/authTypes";

//  component provides the auth state to the entire component tree to access the user object
export const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(reducer, {
    isAuthenticated: false,
    isLoading: true,
    user: {},
    isAppLoaded: false,
  });
  console.log(auth);

  return (
    <authContext.Provider value={{ auth, dispatch }}>
      {children}
    </authContext.Provider>
  );
};

const reducer = (auth, action) => {
  switch (action.type) {
    case authTypes.LOGIN_WITH_OAUTH_SUCCESS:
    case authTypes.LOGIN_WITH_USERNAME_SUCCESS:
    case authTypes.REFRESH_ACCESS_TOKEN:
      return {
        ...auth,
        isLoading: false,
        isAppLoaded: true,
        isAuthenticated: true,
        user: { ...auth?.user, ...action.payload },
      };

    case authTypes.LOGOUT_SUCCESS:
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
