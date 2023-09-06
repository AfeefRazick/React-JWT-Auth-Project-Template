import { Outlet } from "react-router-dom";

// layout component provides the layout such as navbar and footer to pages that require them
export const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
