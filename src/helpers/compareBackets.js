import { getElLengthArrayIfIsCurrentStatus } from "./categoriesChartsPageStats2";

export const compareBackets = (backetList, friendBacketList) => {
    const commonBackets = backetList.filter(userBacket => {
        return friendBacketList.find(({defaultBacketListElementId}) => 
        defaultBacketListElementId === userBacket.defaultBacketListElementId) ? true : false
    });

    const journey = commonBackets.filter(
        ({ categoryKey }) => categoryKey === "journey"
      );
      const food = commonBackets.filter(({ categoryKey }) => categoryKey === "food")
        ;
      const career = commonBackets.filter(
        ({ categoryKey }) => categoryKey === "career"
      );
      const love = commonBackets.filter(
        ({ categoryKey }) => categoryKey === "love"
      );
      const other = commonBackets.filter(
        ({ categoryKey }) => categoryKey === "other"
      );
      const sport = commonBackets.filter(
        ({ categoryKey }) => categoryKey === "sport"
      );
    
      const doneTasks = getElLengthArrayIfIsCurrentStatus([journey, food, career, love, other, sport], 'done')
      const nowTasks = getElLengthArrayIfIsCurrentStatus([journey, food, career, love, other, sport], 'now')
      const todoTasks = getElLengthArrayIfIsCurrentStatus([journey, food, career, love, other, sport], 'todo')

    return {
        done: doneTasks,
        now: nowTasks,
        todo: todoTasks
    }
}