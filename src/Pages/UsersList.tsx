import { users } from "../Data/usersData";

const UsersList = () => {
  return (
    <section className="flex justify-evenly items-center">
      {users.map((user) => (
        <div key={user.result.user_id}>
          <div className="border rounded p-4">
            <div className="flex items-center mb-4">
              <img
                className="h-12 w-12 rounded-full mr-4"
                src={user.result.user_avatar}
                alt="User Avatar"
              />
              <div>
                <h2 className="text-lg font-bold">{`${user.result.user_firstname} ${user.result.user_lastname}`}</h2>
                <p className="text-gray-600">{user.result.user_city}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-600">Email: {user.result.user_email}</p>
              <p className="text-gray-600">Phone: {user.result.user_phone}</p>
              <p className="text-gray-600">Status: {user.result.user_status}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-bold">Links:</h3>
              <ul className="list-disc list-inside">
                {user.result.user_links.map((link, index) => (
                  <li key={index}>
                    <a href={link} className="text-blue-500 hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default UsersList;
