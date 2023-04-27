import { users } from "../Data/usersData";
import Users from "../Components/Users";

const UsersList = () => {
  return (
    <section className="flex justify-evenly items-center">
      <Users users={users} />
    </section>
  );
};

export default UsersList;
