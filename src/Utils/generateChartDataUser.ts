import { UsersTotal, RatingData, UserRating, ChartData } from "../Types/types";

const generateChartDataUser = (ratingA: UserRating[]): ChartData => {
  const userTotal: UsersTotal[] = [];
  ratingA.forEach((r) => {
    if (r.rating.length !== 0) {
      r.rating.forEach((rdata) => {
        if (r.quiz_id) {
          userTotal.push({
            id: r.quiz_id,
            avg_rating: rdata.average_rating,
            current_rating: rdata.current_rating,
            data_time: rdata.pass_at,
          });
        }
      });
    }
  });

  const chartDataUser: ChartData = {
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
