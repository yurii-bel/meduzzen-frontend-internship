import User from "../Components/User";
import api from "../Api/api";
import { useEffect, useState } from "react";

const UsersList: React.FC = () => {
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
      {users.map((user) => (
        <User user={user} />
      ))}
    </section>
  );
};

export default UsersList;
