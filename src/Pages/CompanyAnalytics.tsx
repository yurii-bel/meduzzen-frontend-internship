import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { BarChart } from "../Components/BarChart";
import api from "../Api/api";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import ActionButton from "../Components/Core/ActionButton";
import { UsersTotal } from "../Types/types";

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
      const userTotal: UsersTotal[] = [];
      for (let r of ratingA) {
        if (r.rating.length !== 0) {
          r.rating.map((rdata: any) => {
            userTotal.push({
              id: r.quiz_id,
              avg_rating: rdata.average_rating,
              current_rating: rdata.current_rating,
              data_time: rdata.pass_at,
            });
          });
        }
      }

      setChartDataUser({
        labels: userTotal.map((data) => [
          `Date: ${data.data_time}`,
          `Quiz id: ${data.id}`,
        ]),
        datasets: [
          {
            label: "User Average Rating",
            data: userTotal.map((data) => data.avg_rating),
            backgroundColor: "darkblue",
            borderColor: "darkblue",
            borderWidth: 1,
          },
          {
            label: "User Current Rating",
            data: userTotal.map((data) => data.current_rating),
            backgroundColor: "darkred",
            borderColor: "darkred",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await api.getCompanySummaryRatingForUsersA(Number(id));
      const ratingA = response.data.result.rating;

      const usersIds: number[] = [];
      const usersTotal: UsersTotal[] = [];

      for (let r of ratingA) {
        if (r.rating.length !== 0) {
          r.rating.map((rdata: any) => {
            usersTotal.push({
              id: r.user_id,
              avg_rating: rdata.average_rating,
              current_rating: rdata.current_rating,
              data_time: rdata.pass_at,
            });
          });

          usersIds.push(r.user_id);
        }
      }

      setUsersIdsList(usersIds);

      setChartData({
        labels: usersTotal.map((data) => [
          `Date: ${data.data_time}`,
          `User id: ${data.id}`,
        ]),
        datasets: [
          {
            label: "User Average Rating",
            data: usersTotal.map((data) => data.avg_rating),
            backgroundColor: "darkblue",
            borderColor: "darkblue",
            borderWidth: 1,
          },
          {
            label: "User Current Rating",
            data: usersTotal.map((data) => data.current_rating),
            backgroundColor: "darkred",
            borderColor: "darkred",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      setError("Error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [selectedUser]);

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
