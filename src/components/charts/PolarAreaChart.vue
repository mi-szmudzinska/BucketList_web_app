<template>
  <div class="small">
    <line-chart
      :chart-data="this.categoriesStats.charts.mainStats"
    ></line-chart>
  </div>
</template>

<script>
import LineChart from "../../helpers/LineChartPolarArea.js";
import { createStatsCat } from "@/helpers/categoriesChartsPageStats";
import firebase from "firebase";

export default {
  name: "PolarAreaChart",
  components: {
    LineChart,
  },
  data: () => ({
    datacollection: null,
    categoriesStats: {
      journey: null,
      journeyPercentage: null,
      food: null,
      foodPercentage: null,
      career: null,
      careerPercentage: null,
      love: null,
      lovePercentage: null,
      sport: null,
      sportPercentage: null,
      other: null,
      otherPercentage: null,
      charts: {
        mainStats: null,
      },
    },
  }),
  created() {
    const { currentUser } = firebase.auth();
    const users = firebase.firestore().collection("users");

    if (!currentUser) {
      return;
    } else {
      this.uid = currentUser.uid;
    }

    users
      .doc(currentUser.uid)
      .get()
      .then((snapshot) => {
        const { backetList } = snapshot.data();
        this.categoriesStats = createStatsCat(backetList);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
.small {
  max-width: 600px;
}
</style>