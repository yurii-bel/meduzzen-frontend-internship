import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import api from "../Api/api";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import ActionButton from "../Components/Core/ActionButton";
import generateChartDataUser from "../Utils/generateChartDataUser";
import generateChartData from "../Utils/generateChartData";

Chart.register(CategoryScale);

const CompanyAnalytics: React.FC = () => {
  const [chartData, setChartData] = useState<any>({});
  const [chartDataUser, setChartDataUser] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showUsersChart, setShowUsersChart] = useState<boolean>(false);
  const [showUserChart, setShowUserChart] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [usersIdsList, setUsersIdsList] = useState<number[]>([]);

  const { id } = useParams();

  const handleToggleUsersChart = () => {
    setShowUsersChart((prevShowChart) => !prevShowChart);
    setShowUserChart(false);
  };

  const handleUserChange = (userId: number) => {
    setSelectedUser(userId);
    setShowUserChart(true);
  };

  const fetchUserData = async () => {
    try {
      const response = await api.getCompanySummaryRatingForUserA(
        Number(id),
        Number(selectedUser)
      );
      const ratingA = response.data.result.rating;

      const chartDataUser = generateChartDataUser(ratingA);
      setChartDataUser(chartDataUser);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await api.getCompanySummaryRatingForUsersA(Number(id));
      const ratingA = response.data.result.rating;

      const { usersIds, chartData } = generateChartData(ratingA);

      setUsersIdsList(usersIds);
      setChartData(chartData);
    } catch (error) {
      setError("Error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchUserData();
  }, [selectedUser, fetchUserData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="flex justify-center items-center text-2xl">
        Company Analytics
      </div>
      <div className="flex gap-2 ml-12">
        <ActionButton
          color="darkblue"
          label={`${showUsersChart ? "Hide" : "Show"} Users Chart`}
          onClick={handleToggleUsersChart}
        />
        {!showUsersChart && (
          <select
            className="bg-blue-900 text-white px-2 rounded-md hover:cursor-pointer"
            value={selectedUser || ""}
            onChange={(e) => handleUserChange(Number(e.target.value))}
          >
            {usersIdsList.map((uid, index) => {
              return (
                <option key={index} value={uid}>
                  Select a user {uid}
                </option>
              );
            })}
          </select>
        )}
      </div>
      <div className="flex px-32 py-12">
        {showUsersChart && (
          <Line
            data={chartData}
            height={500}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        )}
        {!showUsersChart && showUserChart && (
          <Line
            data={chartDataUser}
            height={500}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        )}
      </div>
    </>
  );
};

export default CompanyAnalytics;
