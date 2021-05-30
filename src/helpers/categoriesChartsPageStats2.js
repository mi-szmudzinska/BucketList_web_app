export const getElLengthArrayIfIsCurrentStatus = (elementsArray ,status) => {
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

  const doneTasks = getElLengthArrayIfIsCurrentStatus([journey, food, career, love, other, sport], 'done')
  const nowTasks = getElLengthArrayIfIsCurrentStatus([journey, food, career, love, other, sport], 'now')
  const todoTasks = getElLengthArrayIfIsCurrentStatus([journey, food, career, love, other, sport], 'todo')

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
        data: doneTasks,
        backgroundColor: [
          '#ff8a8f',
          '#f6d6a6',
          '#bad6ba',
          '#dfb8f4',
          '#92dcef',
          '#edb5db',
        ]
      },
      {
        label: "Zadania w trakcie realizacji",
        data: nowTasks,
        backgroundColor: [
          '#ff5960',
          '#f5ba62',
          '#76d676',
          '#c674f2',
          '#59d1f0',
          '#e364ba',
        ]
      },
      {
        label: "Zadania w zaplanowane",
        data: todoTasks,
        backgroundColor: [
          '#ff242d',
          '#f7a120',
          '#24d624',
          '#a924f0',
          '#02bbeb',
          '#e0099b',
        ]
      },
    ],
  };
    return {
     tasks: {
       done: doneTasks,
       now: nowTasks,
       todo: todoTasks
     },
      chart: stats
    };
};
