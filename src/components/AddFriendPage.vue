<template>
  <div class="friends_page">
    <div class="centeritems">
      <h2>Szukaj znajomego</h2>
    </div>
    <div class="flexsearch">
      <md-autocomplete
        class="search"
        v-model="searchinbase"
        :md-options="names"
      >
        <label>Wyszukaj...</label>
      </md-autocomplete>
    </div>

    <div class="grid-container">
      <div class="row row-content">
        <AddFriendCard
          v-for="(element, index) in filteredData"
          :key="index"
          :firstName="element.firstName"
          :lastName="element.lastName"
          :gender="element.gender"
          :photoId="element.photoId"
          :id="element.id"
          :refreshFun="getUsersList"
        />
      </div>
    </div>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<script>
import AddFriendCard from "@/components/AddFriendCard.vue";
import firebase from "firebase";
import "./../styles/popularListPage.css";

export default {
  components: { AddFriendCard },
  name: "AddFriends",
  data: () => ({
    searchinbase: null,
    data: [],
    perPage: 10,
    currentPage: 1,
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
              const { firstName, lastName, photoId, gender } = snapshot.data();
              const isUserAFriend = currentUserFriendsList.find(
                (id) => id === snapshot.id
              );
              const isUserOnFriendsList = isUserAFriend ? true : false;
              if (!isUserOnFriendsList) {
                usersArray.push({
                  firstName,
                  lastName,
                  photoId,
                  gender,
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
      return this.filteredData.length;
    },
    filteredData() {
      return this.data.filter(({ firstName, lastName }) => {
        if (!this.searchinbase) {
          return true;
        }

        const userFullName = `${firstName} ${lastName}`;
        const clearUserFullName = userFullName.toLowerCase();
        const cleardNameToFind = this.searchinbase.toLowerCase();
        return clearUserFullName.includes(cleardNameToFind);
      });
    },
    currentData() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.filteredData.slice(start, start + this.perPage);
    },
    names() {
      return this.filteredData.map(
        ({ firstName, lastName }) => `${firstName} ${lastName}`
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.friends_page {
  width: 100%;
}
h2 {
  padding-top: 0.2em;
  display: flex;
  justify-content: center;
  font-family: "Tagger";
  font-size: 55px;
}
.centeritems {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flexsearch {
  justify-content: center;
  display: flex;
  align-items: center;
  width: 100%;
}
.search {
  background-color: #eeeeee;
  border-radius: 10px;
  width: 30%;
}
</style>
