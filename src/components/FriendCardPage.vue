<template>
  <md-card>
    <div class="row row-content">
      <div class="col-md-3 col-lg-3">
        <b-avatar variant="light" :size="100">
          <img v-if="url" :src="url" />
        </b-avatar>
      </div>
      <div class="col-md-9 col-lg-9">
        <md-card-media>
          <span class="md-title">{{ firstName }} {{ lastName }}</span>
          <label>{{ gender }}, {{ age }} lat</label>

          <label>Zadania ukończone</label>
          <k-progress :percent="stats.completedPercentage" status="success"></k-progress>
          <label>Zadania w trakcie realizacji</label>
          <k-progress :percent="stats.inProgressPercentage" status="warning"></k-progress>
          <label>Zadania w planach</label>
          <k-progress :percent="stats.inPlansPercentage"  status="error"></k-progress>
          <div class="friendbuttons">
            <button @click="deleteFriend()">
              <md-icon>delete</md-icon>
            </button>
          </div>
        </md-card-media>
      </div>
    </div>
  </md-card>
</template>

<script>
import firebase from "firebase";

export default {
  name: "FriendCard",
  data: () => ({
    url: null,
  }),
  props: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    gender: {
      type: String,
    },
    age: {
      type: String,
    },
    photoId: {
      type: String,
    },
    stats: {
      type: Object,
    },
    id: {
      type: String,
    },
    refreshFun: {
      type: Function,
    },
  },
  created() {
    this.photoUrl();
  },
  watch: {
    photoId() {
      this.photoUrl();
    },
  },
  methods: {
    photoUrl() {
      if (!this.photoId) {
        return;
      }
      const storage = firebase.storage();
      const img = storage.ref(this.photoId);
      img.getDownloadURL().then((url) => {
        this.url = url;
      });
    },
    makeToast(variant = null) {
      if (variant === "success") {
        this.$bvToast.toast("Udało się pomyślnie usunąć znajomego", {
          title: `Sukces!`,
          autoHideDelay: 9000,
          variant: variant,
          solid: true,
        });
      } else {
        this.$bvToast.toast("Coś poszło nie tak, spróbuj jeszcze raz", {
          title: `Błąd!`,
          variant: variant,
          solid: true,
        });
      }
    },
    async deleteFriend() {
      const { currentUser } = firebase.auth();
      if (!currentUser) {
        return;
      }

      const users = firebase.firestore().collection("users");

      try {
        const snapshot = await users.doc(currentUser.uid).get();

        const { friends, ...rest } = snapshot.data();

        const currentFriends = friends.filter((id) => id !== this.id);

        this.makeToast("success"); //? xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

        await users.doc(currentUser.uid).set({
          ...rest,
          friends: currentFriends,
        });

        this.refreshFun(true);
      } catch (error) {
        this.makeToast("danger");
        console.log(error);
      }
    },
    async updatedata() {
      const { currentUser } = firebase.auth();
      if (!currentUser) {
        return;
      }

      const users = firebase.firestore().collection("users");

      try {
        const snapshot = await users.doc(currentUser.uid).get();

        const { friends, ...rest } = snapshot.data();

        const currentFriends = friends.filter(
          (friend) => friend.id !== this.friend.id
        );
        const index = friends.indexOf(currentFriends);
        friends[index].id = this.id; //?

        await users.doc(currentUser.uid).set({
          ...rest,
          friends,
        });
        this.makeToast("info");
        this.getUsersList();
        this.closeModal();
      } catch (error) {
        console.log(error);
      }
    },
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
              } = snapshot.data();
              const isUserAFriend = currentUserFriendsList.find(
                (id) => id === snapshot.id
              );
              const isUserOnFriendsList = isUserAFriend ? true : false;
              usersArray.push({
                firstName,
                lastName,
                photoId,
                gender,
                age,
                id: snapshot.id,
                isFriend: isUserOnFriendsList,
              });
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });

      this.data = usersArray;
    },
  },
};
</script>

<style lang="scss" scoped>
.md-card md-theme-default {
  width: 50%;
}
.col-md-3 {
  display: flex;
  padding-right: 0px;
  align-items: center;
  justify-content: center;
}
.md-card-media {
  display: grid;
}
.b-avatar {
  margin-left: 0.5em;
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
button {
  margin: 0.5em;
  border-radius: 30%;
  background-color: rgb(224, 224, 224);
  border: none;
}
.md-title {
  color: #000;
}
.md-button {
  background-color: rgb(205, 239, 255);
  color: rgb(0, 0, 0);
  border-radius: 0.5em;
}
.friendbuttons {
  display: flex;
  justify-content: flex-end;
}
.md-card {
  width: 500px;
  height: 20%px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
.k-progress {
  padding: 0;
  margin: 0;
}
label {
  margin: 0;
}
</style>
