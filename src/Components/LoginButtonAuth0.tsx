import { useAuth0 } from "@auth0/auth0-react";

const LoginButtonAuth0: React.FC = () => {
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently } =
    useAuth0();
  const handleAuth0Login = async () => {
    const accessToken = await getAccessTokenSilently();
    console.log(accessToken);
  };

  return (
    <>
      {!isAuthenticated && (
        <button
          onClick={() => {
            loginWithRedirect();
            handleAuth0Login();
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Auth0
        </button>
      )}
    </>
  );
};

export default LoginButtonAuth0;
