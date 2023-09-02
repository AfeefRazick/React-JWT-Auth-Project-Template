import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignupBox = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/");
  };

  //no validation
  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>

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

      <button>Sign Up</button>

      <p>
        Already a user? <Link to={"/login"}>Log In</Link>
      </p>
    </form>
  );
};
