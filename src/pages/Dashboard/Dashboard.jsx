import { useState } from "react";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { v4 } from "uuid";
import { useLogout } from "../../hooks/useLogout";

export const Dashboard = () => {
  const axiosPrivate = useAxiosPrivate();
  const logout = useLogout();
  const [users, setUsers] = useState();

  const getUsers = async () => {
    const response = await axiosPrivate.get("/users");
    const users = response?.data?.users;
    setUsers(users);
  };

  const handleSignOut = async () => {
    await logout();
  };

  return (
    <div>
      <button onClick={getUsers}>get users</button>
      {users?.map((user) => {
        return <p key={v4()}>{user.username}</p>;
      })}
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

// check his solution for if the refresh token return is invalid and how to cause user logout
