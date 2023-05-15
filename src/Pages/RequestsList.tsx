import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Api/api";

const RequestsList: React.FC = () => {
  const [userRequestsList, setUserRequestsList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    api.getUserRequestsList(Number(id)).then((response) => {
      setUserRequestsList(response.data.result.companies);
      console.log(response.data.result.companies);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <h3 className="font-bold text-2xl mb-4"> RequestsList</h3>
      <div className="flex justify-center items-center gap-4">
        <p>
          {userRequestsList.length === 0 ? "No companies" : userRequestsList}
        </p>
        <button className="border border-blue-400 p-1">Cancel</button>
      </div>
    </div>
  );
};

export default RequestsList;
