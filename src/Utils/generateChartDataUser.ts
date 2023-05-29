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

  const separatedArrays: { [id: number]: UsersTotal[] } = userTotal.reduce(
    (result, obj) => {
      const { id } = obj;
      if (!result[id]) {
        result[id] = [];
      }
      result[id].push(obj);
      return result;
    },
    {} as { [id: number]: UsersTotal[] }
  );

  const arrays = Object.values(separatedArrays);

  const generateRandomColor = (): string => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const chartDataUser: ChartData = {
    labels: userTotal.map((data) => [`${data.data_time}`]),
    datasets: arrays.map((array, index) => {
      const color = generateRandomColor();
      return {
        label: `Quiz ${array[0].id}`,
        data: array.map((data) => data.avg_rating),
        backgroundColor: "transparent",
        borderColor: color,
        borderWidth: 2,
        pointBackgroundColor: color,
        pointBorderColor: "#fff",
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.1,
      };
    }),
  };

  return chartDataUser;
};

export default generateChartDataUser;
