import User from "../Components/User";
import api from "../Api/api";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const UsersList: React.FC = () => {
  if (localStorage.getItem("loggedIn") !== "yes") {
    // redirect_to_login()
  }

  // const user: any = useSelector((state) => state);
  // console.log(user.user);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    api
      .getUsers()
      .then((response) => {
        const userList = response.data.result.users;
        setUsers(userList);
        console.log();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-12 mb-12">
      {users.map((user, id) => (
        <User user={user} key={id} />
      ))}
    </section>
  );
};

export default UsersList;
