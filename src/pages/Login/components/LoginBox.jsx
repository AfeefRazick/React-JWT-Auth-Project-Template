import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const LoginBox = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(from, { replace: true });
  };

  //no validation
  return (
    <form onSubmit={handleSubmit}>
      <h1>Log In</h1>

      <label htmlFor="email">Email</label>
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="email"
        name="email"
        id="email"
      />

      <label htmlFor="password">Password</label>
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        name="password"
        id="password"
      />

      <button>Log In</button>
      <Link to={"/settings"}>Forgot Password?</Link>

      <p>
        Don&#39;t have an account? <Link to={"/login"}>Log In</Link>
      </p>
    </form>
  );
};
