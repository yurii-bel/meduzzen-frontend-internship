import { useState, useEffect } from "react";
import Counter from "../Components/Counter";
import api, { apiInstance } from "../Api/api";
import { useDispatch } from "react-redux";
import { setUser } from "../Store/userReducer";
import { setUserData } from "../Utils/setUserData";
import axios from "axios";

interface Props {
  title: string;
}

const HomePage: React.FC<Props> = ({ title }) => {
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();

  const checkHealth = async () => {
    // const response = await api.checkStatus();
    const response = await axios.get("http://3.75.186.163");
    console.log(response);
    console.log(response.data);
    console.log(response.data.status_code);
  };

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
            <button onClick={checkHealth}>CLick me</button>
          </div>
        </main>
      </header>
    </>
  );
};

export default HomePage;
