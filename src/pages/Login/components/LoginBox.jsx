import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosPublic } from "../../../api/axios";
import { useAuth } from "../../../hooks/useAuth";
import { LOGIN_WITH_USERNAME_SUCCESS } from "../../../actionTypes/authTypes";

export const LoginBox = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axiosPublic.post("/login", {
      username,
      password,
    });
    const accessToken = response?.data?.accessToken;

    if (accessToken) {
      dispatch({
        type: LOGIN_WITH_USERNAME_SUCCESS,
        payload: { ...response?.data },
      });

      setPassword("");
      setUsername("");
      navigate(from, { replace: true });
    }
  };

  //no validation
  return (
    <form onSubmit={handleSubmit}>
      <h1>Log In</h1>

      <label htmlFor="username">username</label>
      <input
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        type="username"
        name="username"
        id="username"
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
        Don&#39;t have an account? <Link to={"/signup"}>Sign Up</Link>
      </p>
    </form>
  );
};
