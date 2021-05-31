export const createStats = (backetList) => {
    const all = backetList.length !== 0 ? backetList.length : 1;
    const completed = backetList.filter(({statusKey}) =>  statusKey === 'done').length;
    const inProgress = backetList.filter(({statusKey}) =>  statusKey === 'now').length;
    const inPlans = backetList.filter(({statusKey}) =>  statusKey === 'todo').length;


    const mainStats = {
        labels: ['Ukończone zadania','W trakcie realizacji','W planach'],
        datasets: [
          {
            label: "Twoje cele",
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            data: [completed, inProgress, inPlans],
          }
        ]
    }

    return {
        completed: completed,
        completedPercentage: Math.floor((completed/all)*100),
        inProgress: inProgress,
        inProgressPercentage: Math.floor((inProgress/all)*100),
        inPlans: inPlans,
        inPlansPercentage: Math.floor((inPlans/all)*100),
        chart: mainStats
    }
}