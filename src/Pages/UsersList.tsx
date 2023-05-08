import User from "../Components/User";
import api from "../Api/api";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../Store/usersListReducer";
import { RootState } from "../Store";
import { Link } from "react-router-dom";

const UsersList: React.FC = () => {
  const dispath = useDispatch();
  const users = useSelector((state: RootState) => state.userList);

  useEffect(() => {
    api
      .getUsers()
      .then((response) => {
        const userList = response.data.result.users;
        dispath(setUsers(userList));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-12 mb-12">
      {users.map((user, id) => (
        <Link to={`/users-profile/${user.user_id}`} key={user.user_id}>
          <User user={user} key={id} />
        </Link>
      ))}
    </section>
  );
};

export default UsersList;
