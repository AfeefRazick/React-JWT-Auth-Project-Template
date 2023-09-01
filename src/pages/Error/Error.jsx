/* eslint react/prop-types: 0 */
import { useLocation } from "react-router-dom";
import { Unauthorized } from "./components/Unauthorized";
import { NotFound } from "./components/NotFound";

export const Error = () => {
  const location = useLocation();
  const pathname = location.pathname;
  switch (pathname) {
    case "/unauthorized":
      return <Unauthorized />;
    //other errors go here
    default:
      return <NotFound />;
  }
};
