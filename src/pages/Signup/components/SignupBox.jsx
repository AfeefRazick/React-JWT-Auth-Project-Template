import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosPublic } from "../../../api/axios";

export const SignupBox = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axiosPublic.post("/signup", { username, password });
    setPassword("");
    setUsername("");
    navigate("/login");
  };

  //no validation
  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>

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

      <button>Sign Up</button>

      <p>
        Already a user? <Link to={"/login"}>Log In</Link>
      </p>
    </form>
  );
};
