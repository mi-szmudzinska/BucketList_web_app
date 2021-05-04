<template>
  <div class="small">
    <line-chart :chart-data="this.stats.charts.mainStats"></line-chart>
  </div>
</template>

<script>
import LineChart from "./../../helpers/LineChartDonaught.js";
import { createStats } from "@/helpers/createChartsPageStats";
import firebase from "firebase";

export default {
  name: "DonaughtChart",
  components: {
    LineChart,
  },
  data: () => ({
    datacollection: null,
    stats: {
      completed: null,
      completedPercentage: null,
      inProgress: null,
      inProgressPercentage: null,
      inPlans: null,
      inPlansPercentage: null,
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
        const { firstName, backetList } = snapshot.data();
        this.stats = createStats(backetList);
        this.firstName = firstName;
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