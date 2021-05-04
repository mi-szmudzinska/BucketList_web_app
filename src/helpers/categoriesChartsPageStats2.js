import {randomColor} from "@/helpers/randomColor"
const getElLengthArrayIfIsCurrentStatus = (elementsArray ,status) => {
  return elementsArray.map(element => (element.filter(({statusKey}) => statusKey ===  status) || []).length)
}

export const createStatsCat2 = (backetList) => {
  const journey = backetList.filter(
    ({ categoryKey }) => categoryKey === "journey"
  );
  const food = backetList.filter(({ categoryKey }) => categoryKey === "food")
    ;
  const career = backetList.filter(
    ({ categoryKey }) => categoryKey === "career"
  );
  const love = backetList.filter(
    ({ categoryKey }) => categoryKey === "love"
  );
  const other = backetList.filter(
    ({ categoryKey }) => categoryKey === "other"
  );
  const sport = backetList.filter(
    ({ categoryKey }) => categoryKey === "sport"
  );

  const stats = {
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
        label: "Zadania ukonczone",
        data: getElLengthArrayIfIsCurrentStatus([journey, food, career, love, other, sport], 'done'),
        backgroundColor: [
            randomColor(),
            randomColor(),
            randomColor(),
            randomColor(),
            randomColor(),
            randomColor(),
        ]
      },
      {
        label: "Zadania w trakcie realizacji",
        data: getElLengthArrayIfIsCurrentStatus([journey, food, career, love, other, sport], 'now'),
        backgroundColor: [
            randomColor(),
            randomColor(),
            randomColor(),
            randomColor(),
            randomColor(),
            randomColor(),
        ]
      },
      {
        label: "Zadania w zaplanowane",
        data: getElLengthArrayIfIsCurrentStatus([journey, food, career, love, other, sport], 'todo'),
        backgroundColor: [
            randomColor(),
            randomColor(),
            randomColor(),
            randomColor(),
            randomColor(),
            randomColor(),
        ]
      },
    ],
  };
  console.log(stats)
  return stats
};
