import { UsersTotal } from "../Types/types";

const generateChartDataUser = (ratingA: any[]): any => {
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

  const chartDataUser = {
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
  };

  return chartDataUser;
};

export default generateChartDataUser;
