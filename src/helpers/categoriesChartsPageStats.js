export const createStatsCat = (backetList) => {
  const all = backetList.length;
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
    journeyPercentage: Math.floor((journey / all) * 100),
    food: food,
    foodPercentage: Math.floor((food / all) * 100),
    career: career,
    careerPercentage: Math.floor((career / all) * 100),
    love: love,
    lovePercentage: Math.floor((love / all) * 100),
    other: other,
    otherPercentage: Math.floor((other / all) * 100),
    sport: sport,
    sportPercentage: Math.floor((sport / all) * 100),
    charts: {
      mainStats
    },
  };
};
