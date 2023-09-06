import { useState } from "react";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { v4 } from "uuid";
import { useLogout } from "../../hooks/useLogout";

export const Dashboard = () => {
  const axiosPrivate = useAxiosPrivate();
  const logout = useLogout();
  const [users, setUsers] = useState();
  const [me, setMe] = useState();

  const getUsers = async () => {
    const response = await axiosPrivate.get("/users");
    const users = response?.data?.users;
    setUsers(users);
  };

  const getUser = async () => {
    const response = await axiosPrivate.get("/user");
    const user = response?.data?.user;
    setMe(user);
  };

  const handleSignOut = async () => {
    await logout();
  };

  const makeAdmin = async () => {
    await axiosPrivate.get("/make-admin");
  };

  return (
    <div>
      <button onClick={getUsers}>get users</button>
      {users?.map((user) => {
        return <p key={v4()}>{user.username}</p>;
      })}
      <button onClick={getUser}>get user</button>
      {me?.username}
      <button onClick={handleSignOut}>Sign Out</button>
      <button onClick={makeAdmin}>Make me admin</button>
    </div>
  );
};

// check his solution for if the refresh token return is invalid and how to cause user logout
