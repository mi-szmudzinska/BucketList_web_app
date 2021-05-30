<template>
  <div class="friends_page">
    <h2>ZNAJOMI</h2>

    <FriendCardPage
      v-for="(element, index) in data"
      :key="index"
      :firstName="element.firstName"
      :lastName="element.lastName"
      :gender="element.gender"
      :age="element.age"
      :photoId="element.photoId"
      :stats="element.stats"
      :id="element.id"
      :isFriend="element.isFriend"
      :refreshFun="getUsersList"
    />

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<script>
import FriendCardPage from "@/components/FriendCardPage.vue";
import "./../styles/popularListPage.css";
import firebase from "firebase";
import { createStats } from "@/helpers/createChartsPageStats";

export default {
  components: { FriendCardPage },
  name: "FriendsList",
  data: () => ({
    amount: 0,
    perPage: 10,
    currentPage: 1,
    data: [],
  }),
  created() {
    this.getUsersList();
  },
  methods: {
    getUsersList() {
      const { currentUser } = firebase.auth();
      if (!currentUser) {
        return;
      }
      const userDoc = firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid);

      const users = firebase.firestore().collection("users");

      const usersArray = [];

      Promise.all([users.get(), userDoc.get()])
        .then(([snapshotOfUsers, snapshotOfCurrentUser]) => {
          const { friends } = snapshotOfCurrentUser.data();
          const currentUserFriendsList = friends || [];

          snapshotOfUsers.docs.forEach((snapshot) => {
            if (snapshot.id !== currentUser.uid) {
              const {
                firstName,
                lastName,
                photoId,
                gender,
                age,
                backetList,
              } = snapshot.data();
              const isUserAFriend = currentUserFriendsList.find(
                (id) => id === snapshot.id
              );
              const isUserOnFriendsList = isUserAFriend ? true : false;
              if (isUserOnFriendsList) {
                usersArray.push({
                  firstName,
                  lastName,
                  photoId,
                  gender,
                  age,
                  stats: createStats(backetList),
                  id: snapshot.id,
                });
              }
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });

      this.data = usersArray;
    },
  },
  computed: {
    rows() {
      return this.data.length;
    },
    currentData() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.filteredData.slice(start, start + this.perPage);
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  padding-top: 0.2em;
  display: flex;
  justify-content: center;
  font-family: "Tagger";
  font-size: 55px;
}
.friends_page {
  width: 100%;
}
.md-card {
  width: 49%;
}
</style>
