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
    <div class="twocharts">
      <div class="container-fluid">
        <h4>Podział na kategorie</h4>
        <md-content>
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
          <div>
            <line-chart :chart-data="this.categoriesStats.chart"></line-chart>
          </div>
        </md-content>
      </div>
      <hr />
      <div class="container-fluid">
        <h4>Podział na statusy zadań w kategoriach</h4>
        <md-content>
          <div>
            <line-chart :chart-data="this.detailsStats.chart"></line-chart>
          </div>
          <table>
            <tr>
              <th></th>
              <th>Ukonczone</th>
              <th>W trakcie realizacji</th>
              <th>W planach</th>
            </tr>
            <tr>
              <th>Podroze</th>
              <td>{{ this.detailsStats.tasks.done[0] }}</td>
              <td>{{ this.detailsStats.tasks.now[0] }}</td>
              <td>{{ this.detailsStats.tasks.todo[0] }}</td>
            </tr>
            <tr>
              <th>Jedzenie</th>
              <td>{{ this.detailsStats.tasks.done[1] }}</td>
              <td>{{ this.detailsStats.tasks.now[1] }}</td>
              <td>{{ this.detailsStats.tasks.todo[1] }}</td>
            </tr>
            <tr>
              <th>Kariera</th>
              <td>{{ this.detailsStats.tasks.done[2] }}</td>
              <td>{{ this.detailsStats.tasks.now[2] }}</td>
              <td>{{ this.detailsStats.tasks.todo[2] }}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th></th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th></th>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </md-content>
      </div>
    </div>
    <hr />
    <div class="container-fluid">
      <h4>Zobacz jak wypadasz na tle swoich znajomych</h4>
      <md-content class="downblock">
        <div class="divfriends">
          <div class="useravatar">
            <b-avatar variant="light" :size="150">
              <img v-if="url" :src="url" />
            </b-avatar>
          </div>
          <div v-if="friendsDetails">
          <div class="dive1">
            <b-avatar variant="light" :size="150">
              <img v-if="friendsDetails[0]" :src="friendsDetails[0].url" />
            </b-avatar>
          </div>
          <div class="dive2">
            <b-avatar variant="light" :size="150">
              <img v-if="friendsDetails[1]" :src="friendsDetails[1].url" />
            </b-avatar>
          </div>
          <div class="dive3">
            <b-avatar variant="light" :size="150">
              <img v-if="friendsDetails[2]" :src="friendsDetails[2].url" />
            </b-avatar>
          </div>
          <div class="dive4">
            <b-avatar variant="light" :size="150">
              <img v-if="friendsDetails[3]" :src="friendsDetails[3].url" />
            </b-avatar>
          </div>
          <div class="dive5">
            <b-avatar variant="light" :size="150">
              <img v-if="friendsDetails[4]" :src="friendsDetails[4].url" />
            </b-avatar>
          </div>
          </div>
          
        </div>
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

export default {
  name: "ChartsPage",
  components: {
    LineChart,
    RandomChart,
  },
  data: () => ({
    firstName: "",
    categories: [],
    url: null,
    friendsDetails: null,
    detailsStats: {
      tasks: {
        done: null,
        now: null,
        todo: null,
      },
      chart: null,
    },
    stats: {
      completed: null,
      completedPercentage: null,
      inProgress: null,
      inProgressPercentage: null,
      inPlans: null,
      inPlansPercentage: null,
      chart: null,
    },
    categoriesStats: {
      journey: null,
      food: null,
      career: null,
      love: null,
      other: null,
      sport: null,
      chart: null,
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

    if (!currentUser) {
      return;
    } else {
      this.uid = currentUser.uid;
    }

    const userDoc = firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid);

    const users = firebase.firestore().collection("users");
    const app = firebase.firestore().collection("app");

    const urlArray = [];

    Promise.all([users.get(), userDoc.get()])
      .then(([snapshotOfUsers, snapshotOfCurrentUser]) => {
        const { firstName, backetList, photoId } = snapshotOfCurrentUser.data();
        this.detailsStats = createStatsCat2(backetList);
        this.stats = createStats(backetList);
        this.categoriesStats = createStatsCat(backetList);
        this.firstName = firstName;
        this.photoId = photoId;
        const storage = firebase.storage();
        const img = storage.ref(this.photoId);
        img.getDownloadURL().then((url) => {
          this.url = url;
        });

        snapshotOfUsers.docs.forEach((snapshot) => {
          if (snapshot.id !== currentUser.uid) {
            const { photoId, firstName/* backetList*/ } = snapshot.data();
            const currentPhotoId = storage.ref(photoId);
            currentPhotoId.getDownloadURL().then((url) => {
              urlArray.push({
                url,
                firstName,
                data: null // funkcja przetwarzajca backet
              });
            });
          }
        });

        this.friendsDetails = urlArray;
      })
      .catch((error) => {
        console.log(error);
      });

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
.divfriends {
  position: relative;
  background-color: #03a2dc;
  background-image: url("../assets/back.png");
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
}
.twocharts {
  width: 100%;
}
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
  width: 25%;
  margin: 4em 0 0 4.5em;
  text-align: center;
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
  font-size: 55px;
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
.useravatar {
  position: absolute;
}
.dive1 {
  position: absolute;
  top: 10px;
  right: 290px;
}
.dive2 {
  position: absolute;
  top: 150px;
  right: 65px;
}
.dive3 {
  position: absolute;
  top: 410px;
  right: 160px;
}
.dive4 {
  position: absolute;
  top: 410px;
  right: 430px;
}
.dive5 {
  position: absolute;
  top: 150px;
  right: 510px;
}
</style>
