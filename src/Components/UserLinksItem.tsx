interface UserLinksItemProps {
  link: string;
}

const UserLinksItem: React.FC<UserLinksItemProps> = ({ link }) => {
  return (
    <li>
      <a href={link} className="text-blue-500 hover:underline">
        {link}
      </a>
    </li>
  );
};

export default UserLinksItem;
