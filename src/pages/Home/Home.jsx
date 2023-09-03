import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <Link to={"/dashboard"}>Dashboard</Link>
    </div>
  );
};
