import generateChartData from "./generateChartData";

describe("generateChartData", () => {
  it("should generate chart data correctly", () => {
    const ratingA = [
      {
        user_id: 1,
        rating: [
          {
            average_rating: 4.5,
            current_rating: 4,
            pass_at: "2023-05-24",
          },
          {
            average_rating: 3.8,
            current_rating: 3.2,
            pass_at: "2023-05-25",
          },
        ],
      },
      {
        user_id: 2,
        rating: [
          {
            average_rating: 3.2,
            current_rating: 3.5,
            pass_at: "2023-05-23",
          },
        ],
      },
    ];

    const expectedChartData = {
      labels: [
        ["Date: 2023-05-24", "User id: 1"],
        ["Date: 2023-05-25", "User id: 1"],
        ["Date: 2023-05-23", "User id: 2"],
      ],
      datasets: [
        {
          label: "User Average Rating",
          data: [4.5, 3.8, 3.2],
          backgroundColor: "darkblue",
          borderColor: "darkblue",
          borderWidth: 1,
        },
        {
          label: "User Current Rating",
          data: [4, 3.2, 3.5],
          backgroundColor: "darkred",
          borderColor: "darkred",
          borderWidth: 1,
        },
      ],
    };

    const result = generateChartData(ratingA);
    expect(result.chartData).toEqual(expectedChartData);
  });

  it("should handle empty rating array correctly", () => {
    const ratingA = [
      {
        user_id: 1,
        rating: [],
      },
    ];

    const expectedChartData = {
      labels: [],
      datasets: [
        {
          label: "User Average Rating",
          data: [],
          backgroundColor: "darkblue",
          borderColor: "darkblue",
          borderWidth: 1,
        },
        {
          label: "User Current Rating",
          data: [],
          backgroundColor: "darkred",
          borderColor: "darkred",
          borderWidth: 1,
        },
      ],
    };

    const result = generateChartData(ratingA);
    expect(result.chartData).toEqual(expectedChartData);
  });
});
