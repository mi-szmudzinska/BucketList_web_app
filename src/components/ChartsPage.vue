<template>
  <div class="charts_page">
    <div class="container-fluid">
      <h2>TWOJE CELE</h2>
      <md-content>
        <div>
          <RandomChart />
        </div>
        <div class="rightstats">
          <h4>Gratulacje {{ firstName }}!</h4>
          <span class="sm-list-item-text"
            >Ukończyłaś {{ stats.completed }} swoich celów co daje
            {{ stats.completedPercentage }}%</span
          >
          <span class="sm-list-item-text"
            >W trakcie realizacji masz {{ stats.inProgress }} celów co daje
            {{ stats.inProgressPercentage }}%</span
          >
          <span class="sm-list-item-text"
            >W planach masz {{ stats.inPlans }} celów co daje
            {{ stats.inPlansPercentage }}%</span
          >
        </div>
      </md-content>
    </div>
    <hr />
    <div class="container-fluid">
      <h4>Podział na kategorie</h4>
      <md-content>
        <div>
          <PolarAreaChart />
        </div>
        <div class="rightstats">
          <span
            v-for="(category, index) in categories"
            :key="index"
            :id="category.key"
            >{{ category.name.toUpperCase() }}<br
          /></span>
        </div>
        <div class="numberstats">
          <span
            >masz {{ categoriesStats.journey }}
            {{ getEndOfWord(categoriesStats.journey) }} <br
          /></span>
          <span
            >masz {{ categoriesStats.food }}
            {{ getEndOfWord(categoriesStats.food) }} <br
          /></span>
          <span
            >masz {{ categoriesStats.career }}
            {{ getEndOfWord(categoriesStats.career) }} <br
          /></span>
          <span
            >masz {{ categoriesStats.love }}
            {{ getEndOfWord(categoriesStats.love) }} <br
          /></span>
          <span
            >masz {{ categoriesStats.other }}
            {{ getEndOfWord(categoriesStats.other) }}<br
          /></span>
          <span
            >masz {{ categoriesStats.sport }}
            {{ getEndOfWord(categoriesStats.sport) }} <br
          /></span>
        </div>
      </md-content>
    </div>
    <div class="container-fluid">
      <h4>Podział na kategorie</h4>
      <md-content>
        <div>
          <line-chart :chart-data="this.detailsStats"></line-chart>
        </div>
      </md-content>
    </div>
    <hr />
    <div class="container-fluid">
      <h4>Zobacz jak wypadasz na tle swoich znajomych</h4>
      <md-content class="downblock">
        <form class="chartfriend">Wykres</form>
        <div class="downstats">
          <h3>TY I %FRINEND%</h3>
          <hr class="friendHR" />
          <span class="item-text"
            >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error
            quibusdam, non molestias et! Earum magnam, similique, quo recusandae
            placeat dicta asperiores modi sint ea repudiandae maxime? Quae non
            explicabo, neque.</span
          >
        </div>
      </md-content>
    </div>
  </div>
</template>

<script>
import LineChart from "@/helpers/LineChartPolarArea.js";
import firebase from "firebase";
import { createStats } from "@/helpers/createChartsPageStats";
import { createStatsCat } from "@/helpers/categoriesChartsPageStats";
import { createStatsCat2 } from "@/helpers/categoriesChartsPageStats2";
import RandomChart from "@/components/charts/RandomChart.vue";
import PolarAreaChart from "@/components/charts/PolarAreaChart.vue";

export default {
  name: "ChartsPage",
  components: {
    LineChart,
    RandomChart,
    PolarAreaChart,
  },
  data: () => ({
    firstName: "",
    categories: [],
    detailsStats: null,
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
    categoriesStats: {
      journey: null,
      journeyPercentage: null,
      food: null,
      foodPercentage: null,
      career: null,
      careerPercentage: null,
      love: null,
      lovePercentage: null,
      other: null,
      otherPercentage: null,
      sport: null,
      sportPercentage: null,
      charts: {
        mainStats: null,
      },
    },
  }),
  methods: {
    getCategoryName(currentKey) {
      const category = this.categories.find(({ key }) => key === currentKey);
      return category ? category.name : "";
    },

    getEndOfWord(index) {
      switch (index) {
        case 1:
          return "cel";
        case 2:
        case 3:
        case 4:
          return "cele";
        case 0:
        default:
          return "celów";
      }
    },
  },
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
        this.detailsStats = createStatsCat2(backetList);
        this.stats = createStats(backetList);
        this.categoriesStats = createStatsCat(backetList);
        this.firstName = firstName;
      })
      .catch((error) => {
        console.log(error);
      });

    const app = firebase.firestore().collection("app");

    app
      .doc("category")
      .get()
      .then((snapshot) => {
        const { category } = snapshot.data();
        this.categories = category;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped>
.container-fluid {
  display: block;
}
form {
  width: 55%;
  height: 100%;
  background-color: rgb(184, 220, 221);
}
.charts_page {
  min-width: 98%;
}
.md-list-item-text {
  margin: 1em 1em 1em 1em;
  font-size: 16px;
  font-weight: bold;
}
.md-content {
  width: 98%;
  margin: 1em;
  align-content: center;
  justify-content: center;
  display: flex;
}
.rightstats {
  margin-left: 1.5em;
  display: block;
  align-self: center;
  text-align: end;
}
.numberstats {
  margin-left: 0.5em;
  display: block;
  align-self: center;
}
.sm-list-item-text {
  display: block;
}
.chartfriend {
  width: 80%;
  height: 100%;
}
.downblock {
  height: 600px;
}
hr {
  width: 95%;
  border-bottom: 3px solid #893774;
}
.friendHR {
  border-bottom: 5px solid #004aad;
  width: 80%;
}
.downstats {
  width: 40%;
  text-align: center;
  margin: 10% 4% 0 4%;
}
h2 {
  padding-top: 0.4em;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Tagger";
  font-size: 40px;
}
h3 {
  display: flex;
  justify-content: center;
  font-family: "LoveSummer";
  font-size: 35px;
}
h4 {
  display: flex;
  justify-content: center;
  font-family: "Tagger";
  font-size: 35px;
}
.item-text {
  color: #03a2dc;
}
#journey {
  color: #ff8a8f;
  font-weight: bold;
}
#food {
  color: #f6d6a6;
  font-weight: bold;
}
#career {
  color: #bad6ba;
  font-weight: bold;
}
#love {
  color: #dfb8f4;
  font-weight: bold;
}
#other {
  color: #92dcef;
  font-weight: bold;
}
#sport {
  color: #edb5db;
  font-weight: bold;
}
</style>
