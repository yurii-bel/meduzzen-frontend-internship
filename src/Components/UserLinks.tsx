import UserLinksItem from "./UserLinksItem";

interface UserProps {
  user: {
    result: {
      user_links: string[];
    };
  };
}

const UserLinks: React.FC<UserProps> = ({ user }) => {
  return (
    <div>
      {user.result.user_links.map((link, index) => (
        <UserLinksItem key={index} link={link} />
      ))}
    </div>
  );
};

export default UserLinks;
