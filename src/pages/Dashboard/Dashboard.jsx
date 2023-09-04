import { useEffect, useState } from "react";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { v4 } from "uuid";

export const Dashboard = () => {
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState();

  const getUsers = async () => {
    const response = await axiosPrivate.get("/users");
    const users = response?.data?.users;
    setUsers(users);
  };
  // useEffect(() => {
  //   setUsers(async () => {
  //     return await axiosPrivate.get("/users");
  //   });
  // }, [axiosPrivate]);

  return (
    <div>
      <button onClick={getUsers}>get users</button>
      {users?.map((user) => {
        return <p key={v4()}>{user.username}</p>;
      })}
    </div>
  );
};

// check his solution for if the reshresh token return is invalid and how to cause user logout
