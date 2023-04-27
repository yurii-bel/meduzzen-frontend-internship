import { users } from "../Data/usersData";
import User from "../Components/User";

const UsersList = () => {
  return (
    <section className="flex justify-evenly items-center">
      {users.map((user) => (
        <User user={user} />
      ))}
    </section>
  );
};

export default UsersList;
