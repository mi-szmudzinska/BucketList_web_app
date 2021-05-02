<template>
  <md-card v-if="!isFriend">
    <b-avatar variant="light" :size="100">
      <img v-if="url" :src="url" />
    </b-avatar>
    <md-card-media>
      <span class="md-title">{{ firstName }} {{ lastName }}</span>
      <label>{{ gender }}</label>
      <md-button @click="addFriend()">Zaobserwuj</md-button>
    </md-card-media>
  </md-card>
</template>

<script>
import firebase from "firebase";

export default {
  name: "AddFriendCard",
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
    photoId: {
      type: String,
    },
    id: {
      type: String,
    },
    isFriend: {
      type: Boolean,
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
    async addFriend() {
      const { currentUser } = firebase.auth();
      if (!currentUser) {
        return;
      }
      const userDoc = firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid);

      userDoc.get().then((snapshot) => {
        const { friends, ...rest } = snapshot.data();

        const newFriendsList = friends || [];
        newFriendsList.push(this.id);
        userDoc.set({
          ...rest,
          friends: newFriendsList,
        });

        this.refreshFun();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.col-md-3 {
  display: flex;
  padding-right: 0px;
}
.md-card-media {
  display: inline-grid;
}
.b-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0.5em 1em 0.5em 0.5em;
  align-content: center;
  justify-content: center;
}
.md-title {
  color: #000;
}
.md-button {
  background-color: rgb(205, 239, 255);
  white-space: normal;
  color: rgb(0, 0, 0);
  border-radius: 0.5em;
  margin-left: 6px;
  width: 150px;
}
.friends-page {
  min-width: 100%;
}
.md-card {
  width: 400px;
  height: 100%;
  margin: 4px;
  align-items: center;
  display: flex;
  margin-left: 1.5em;
}
.k-progress {
  padding: 0;
  margin: 0;
}
label {
  margin: 0;
}
</style>
