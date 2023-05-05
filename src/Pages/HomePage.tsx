import { useState, useEffect } from "react";
import Counter from "../Components/Counter";
import api, { apiInstance } from "../Api/api";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { setUser } from "../Store/userReducer";

interface Props {
  title: string;
}

const HomePage: React.FC<Props> = ({ title }) => {
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    api
      .checkStatus()
      .then((response) => {
        setStatus(response.data.status_code);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const setUserData = async () => {
    apiInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("accessToken")}`;
    const userData = await apiInstance.get("/auth/me/");
    dispatch(setUser(userData.data.result));
  };

  useEffect(() => {
    const getAccessToken = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently();
          localStorage.setItem("accessToken", accessToken);
          await setUserData();
        } catch (error) {
          console.log(error);
        }
      }
    };

    getAccessToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <>
      <header>
        <main className="container mx-auto pt-10">
          <h1 className="text-4xl font-bold mb-5">{title}</h1>
          <h2 className="text-2xl font-bold mb-5">Greetings!</h2>
          <p className="text-gray-700 leading-loose">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            eu nisi vel sapien euismod molestie ac vel dolor. Sed eu elit et
            eros efficitur auctor. Morbi lobortis velit ut ex pellentesque, vel
            pulvinar magna commodo. Praesent commodo ornare justo, id dapibus
            augue hendrerit sed. Sed sodales faucibus libero, ac eleifend nisl
            consectetur eu. Sed hendrerit orci vel enim ultrices, eu aliquet
            eros hendrerit. Nam elementum sapien at justo bibendum, ac ultricies
            odio sollicitudin. Morbi non ullamcorper augue. Sed in dui at quam
            volutpat aliquam.
          </p>
          <Counter />
          <div className="flex flex-col mt-2 mb-16 rounded-md bg-gray-800 text-white">
            <p className="p-4 text-sm italic text-gray-300">
              Get server status from http://3.75.186.163/
            </p>
            <div className="p-4 mb-4">
              Status code: <strong>{JSON.stringify(status)}</strong>
            </div>
          </div>
        </main>
      </header>
    </>
  );
};

export default HomePage;
