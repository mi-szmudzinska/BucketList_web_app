export const createStatsCat = (backetList) => {
  const journey = backetList.filter(
    ({ categoryKey }) => categoryKey === "journey"
  ).length;
  const food = backetList.filter(({ categoryKey }) => categoryKey === "food")
    .length;
  const career = backetList.filter(
    ({ categoryKey }) => categoryKey === "career"
  ).length;
  const love = backetList.filter(
    ({ categoryKey }) => categoryKey === "love"
  ).length;
  const other = backetList.filter(
    ({ categoryKey }) => categoryKey === "other"
  ).length;
  const sport = backetList.filter(
    ({ categoryKey }) => categoryKey === "sport"
  ).length;

  const mainStats = {
    labels: [
      "Podróże",
      "Jedzenie i kuchnia",
      "Kariera",
      "Miłość i rodzina",
      "Inne",
      "Sport",
    ],
    datasets: [
      {
        label: "Zadania w kategoriach",
        data: [journey, food, career, love, other, sport],
        backgroundColor: [
            '#ff8a8f',
            '#f6d6a6',
            '#bad6ba',
            '#dfb8f4',
            '#92dcef',
            '#edb5db',
        ]
      },
    ],
  };

  return {
    journey: journey,
    food: food,
    career: career,
    love: love,
    other: other,
    sport: sport,
    chart: mainStats
  };
};
