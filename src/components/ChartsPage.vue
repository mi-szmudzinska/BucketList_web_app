<template>
  <div class="charts_page">
    <span
      v-if="!stats.completed && !stats.inProgress && !stats.inPlans"
      class="infobefore"
    >
      By śledzić swój postęp dodaj zadanie do swojej listy!
    </span>
    <h4>Twoje cele</h4>
    <div class="container-fluid">
      <md-content>
        <div>
          <line-chart :chart-data="this.stats.chart"></line-chart>
        </div>
        <div
          v-if="stats.completed || stats.inProgress || stats.inPlans"
          class="rightstats"
        >
          <h4>Gratulacje {{ firstName }}!</h4>
          <span class="sm-list-item-text"
            >Ukończyłe(a)ś {{ stats.completed }} swoich
            {{ getEndOfWord(stats.completed) }} co daje
            {{ stats.completedPercentage }}%</span
          >
          <span class="sm-list-item-text"
            >W trakcie realizacji masz {{ stats.inProgress }}
            {{ getEndOfWord(stats.inProgress) }} co daje
            {{ stats.inProgressPercentage }}%</span
          >
          <span class="sm-list-item-text"
            >W planach masz {{ stats.inPlans }}
            {{ getEndOfWord(stats.inPlans) }} co daje
            {{ stats.inPlansPercentage }}%</span
          >
        </div>
      </md-content>
    </div>
    <hr />
    <div class="twocharts">
      <h4>Podział na kategorie</h4>
      <div class="container-fluid">
        <md-content>
          <div class="rightstats">
            <span
              v-for="(category, index) in categories"
              :key="index"
              :id="category.key"
              >{{ category.name.toUpperCase() }}<br
            /></span>
          </div>
          <div
            v-if="
              categoriesStats.journey ||
              categoriesStats.food ||
              categoriesStats.career ||
              categoriesStats.love ||
              categoriesStats.other ||
              categoriesStats.sport
            "
            class="numberstats"
          >
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
      <h4>Podział na statusy zadań w kategoriach</h4>
      <div class="container-fluid">
        <md-content>
          <div>
            <line-chart :chart-data="this.detailsStats.chart"></line-chart>
          </div>
          <div class="divatable">
            <CompareTable :data="this.detailsStats.tasks" />
          </div>
        </md-content>
      </div>
    </div>
    <hr />
    <div class="container-fluid">
      <h4>Zobacz jak wypadasz na tle swoich znajomych</h4>
      <md-content class="downblock">
        <div class="divfriends">
          <div v-if="friendsDetails">
            <div class="useravatar">
              <b-avatar variant="light" :size="150">
                <img v-if="url" :src="url" />
              </b-avatar>
            </div>

            <div class="dive1" @click="compareWithFriend(0)">
              <b-avatar
                :class="{
                  active: selectedFriend && selectedFriend.index === 0,
                }"
                variant="light"
                :size="150"
              >
                <img v-if="friendsDetails[0]" :src="friendsDetails[0].url" />
              </b-avatar>
            </div>
            <div class="dive2" @click="compareWithFriend(1)">
              <b-avatar
                :class="{
                  active: selectedFriend && selectedFriend.index === 1,
                }"
                variant="light"
                :size="150"
              >
                <img v-if="friendsDetails[1]" :src="friendsDetails[1].url" />
              </b-avatar>
            </div>
            <div class="dive3" @click="compareWithFriend(2)">
              <b-avatar
                :class="{
                  active: selectedFriend && selectedFriend.index === 2,
                }"
                variant="light"
                :size="150"
              >
                <img v-if="friendsDetails[2]" :src="friendsDetails[2].url" />
              </b-avatar>
            </div>
            <div class="dive4" @click="compareWithFriend(3)">
              <b-avatar
                :class="{
                  active: selectedFriend && selectedFriend.index === 3,
                }"
                variant="light"
                :size="150"
              >
                <img v-if="friendsDetails[3]" :src="friendsDetails[3].url" />
              </b-avatar>
            </div>
            <div class="dive5" @click="compareWithFriend(4)">
              <b-avatar
                :class="{
                  active: selectedFriend && selectedFriend.index === 4,
                }"
                variant="light"
                :size="150"
              >
                <img v-if="friendsDetails[4]" :src="friendsDetails[4].url" />
              </b-avatar>
            </div>
          </div>
        </div>
        <div class="downstats">
          <div v-if="selectedFriend">
            <h3>TY I {{ selectedFriend.name.toUpperCase() }}</h3>
            <hr class="friendHR" />
            <span class="item-text">Zobacz ile macie wspólnych celów! </span>

            <CompareTable :data="selectedFriend.data" />
          </div>
        </div>
      </md-content>
    </div>
  </div>
</template>

<script>
import LineChart from "@/helpers/LineChartPolarArea.js";
import CompareTable from "@/components/CompareTable.vue";
import firebase from "firebase";
import { createStats } from "@/helpers/createChartsPageStats";
import { createStatsCat } from "@/helpers/categoriesChartsPageStats";
import { createStatsCat2 } from "@/helpers/categoriesChartsPageStats2";
import { compareBackets } from "@/helpers/compareBackets";

export default {
  name: "ChartsPage",
  components: {
    LineChart,
    CompareTable,
  },
  data: () => ({
    active: false,
    selectedFriend: null,
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
    compareWithFriend(index) {
      if (!this.friendsDetails[index]) {
        return;
      }

      if (this.selectedFriend && this.selectedFriend.index === index) {
        this.selectedFriend = null;
        return;
      }

      const friend = this.friendsDetails[index];

      this.selectedFriend = {
        index,
        name: friend.firstName,
        data: friend.data,
      };
    },
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
        const {
          firstName,
          backetList,
          photoId,
          friends,
        } = snapshotOfCurrentUser.data();

        this.stats = createStats(backetList);
        this.categoriesStats = createStatsCat(backetList);
        this.detailsStats = createStatsCat2(backetList);
        this.firstName = firstName;
        this.photoId = photoId;
        const storage = firebase.storage();
        const img = storage.ref(this.photoId);
        img.getDownloadURL().then((url) => {
          this.url = url;
        });

        snapshotOfUsers.docs.forEach((snapshot) => {
          const isFriend = friends.find((id) => id === snapshot.id);
          if (snapshot.id !== currentUser.uid && isFriend) {
            const {
              photoId,
              firstName,
              backetList: friendBacketList,
            } = snapshot.data();
            const currentPhotoId = storage.ref(photoId);
            currentPhotoId.getDownloadURL().then((url) => {
              urlArray.push({
                url,
                firstName,
                data: compareBackets(backetList, friendBacketList),
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
.active {
  border: 3px outset rgb(0, 140, 255);
  width: 170px !important;
  height: 170px !important;
}
.divfriends {
  position: relative;
  display: flex;
  background-image: url("../assets/wykres.png");
  background-repeat: no-repeat;
  background-position: 45px 45px;
  background-size: 500px 500px;
  object-fit: cover;
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
  width: 50%;
  margin: 4em 0 0 0.5em;
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
  margin-top: 0.5em;
  justify-content: center;
  font-family: "Tagger";
  font-size: 35px;
}

.item-text {
  color: #03a2dc;
  margin-bottom: 2em;
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
  top: 220px;
  right: 280px;
}
table {
  margin-top: 1em;
}
.divatable {
  display: flex;
  align-items: center;
  justify-content: center;
}
.dive1 {
  position: absolute;
  top: 5%;
  right: 45%;
}
.dive2 {
  position: absolute;
  top: 23%;
  right: 8%;
}
.dive3 {
  position: absolute;
  top: 60%;
  right: 20%;
}
.dive4 {
  position: absolute;
  top: 65%;
  right: 65%;
}
.dive5 {
  position: absolute;
  top: 28%;
  right: 80%;
}
.card {
  border: none;
}
.infobefore {
  display: flex;
  justify-content: center;
  font-family: "Lemon Tuesday";
  margin: 1em 0 1em 0;
  font-size: 30px;
}
</style>
