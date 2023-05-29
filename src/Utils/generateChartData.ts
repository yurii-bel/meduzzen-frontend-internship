import { UsersTotal, UserRating } from "../Types/types";

const generateChartData = (ratingA: UserRating[]) => {
  const usersIds: number[] = [];
  const usersTotal: UsersTotal[] = [];

  const generateRandomColor = (): string => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  ratingA.forEach((r) => {
    if (r.rating.length !== 0) {
      r.rating.forEach((rdata) => {
        usersTotal.push({
          id: r.user_id,
          avg_rating: rdata.average_rating,
          current_rating: rdata.current_rating,
          data_time: rdata.pass_at,
        });
      });

      usersIds.push(r.user_id);
    }
  });

  const separatedUsers: { [id: number]: UsersTotal[] } = usersTotal.reduce(
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

  const usersData = Object.values(separatedUsers);

  const chartData = {
    labels: usersTotal.map((data) => [`${data.data_time}`]),
    datasets: usersData.map((array, index) => {
      const color = generateRandomColor();
      return {
        label: `User ${array[0].id}`,
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

  return {
    usersIds,
    chartData,
  };
};

export default generateChartData;
