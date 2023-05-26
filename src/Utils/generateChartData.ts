import { UsersTotal } from "../Types/types";

const generateChartData = (ratingA: any[]) => {
  const usersIds: number[] = [];
  const usersTotal: UsersTotal[] = [];

  for (let r of ratingA) {
    if (r.rating.length !== 0) {
      r.rating.forEach((rdata: any) => {
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

  const chartData = {
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
  };

  return {
    usersIds,
    chartData,
  };
};

export default generateChartData;
