<template>
  <div class="left_menu_bar">
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <div class="top_align">
        <b-avatar variant="light" :size="150">
          <img v-if="url" :src="url" />
        </b-avatar>
      </div>

      <div class="list">
        <md-list>
          <md-list-item md-expand>
            <md-icon>star</md-icon>
            <span class="md-list-item-text">BUCKETLIST</span>

            <md-list slot="md-expand">
              <md-list-item class="md-inset" @click="$router.push('yourlist')"
                >Twoja lista</md-list-item
              >
              <md-list-item class="md-inset" @click="$router.push('home')"
                >Statystki</md-list-item
              >
            </md-list>
          </md-list-item>

          <md-list-item md-expand>
            <md-icon>whatshot</md-icon>
            <span class="md-list-item-text">INSPIRACJE</span>

            <md-list slot="md-expand">
              <md-list-item
                class="md-inset"
                @click="$router.push('popularlist')"
                >Popularne</md-list-item
              >
            </md-list>
          </md-list-item>

          <md-list-item md-expand>
            <md-icon>face</md-icon>
            <span class="md-list-item-text">ZNAJOMI</span>

            <md-list slot="md-expand">
              <md-list-item class="md-inset" @click="$router.push('friends')"
                >Twoi znajomi</md-list-item
              >
              <md-list-item class="md-inset" @click="$router.push('addfriend')"
                >Dodaj znajomego</md-list-item
              >
            </md-list>
          </md-list-item>
          <md-list-item md-expand>
            <md-icon>settings</md-icon>
            <span class="md-list-item-text">USTAWIENIA</span>

            <md-list slot="md-expand">
              <md-list-item class="md-inset" @click="$router.push('settings')"
                >Informacje</md-list-item
              >
            </md-list>
          </md-list-item>
        </md-list>
      </div>
      <footer>
        <md-button
          v-b-popover.hover.top="'Wyloguj się'"
          type="submit"
          class="md-raised md-primary"
        >
          <md-icon>power_settings_new</md-icon>
        </md-button>
      </footer>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
import {refreshAvatarSubject$} from  './../main.js';

export default {
  name: "LeftMenuBar",
  data: () => ({
    url: null,
    sending: false,
  }),
  methods: {
    signOut() {
      this.sending = true;
      const auth = firebase.auth();

      auth
        .signOut()
        .then(() => {
          this.$router.push("/");
        })
        .catch();
    },
    validateUser() {
      this.signOut();
    },
    getAvatarPhoto() {
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
          const { photoId } = snapshot.data();
          this.photoId = photoId;
          const storage = firebase.storage();
          const img = storage.ref(this.photoId);
          img.getDownloadURL().then((url) => {
            this.url = url;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getAvatarPhoto();
    refreshAvatarSubject$.subscribe(() => {
      this.getAvatarPhoto();
    })
  },
};
</script>

<style lang="scss" scoped>
$list-width: 100%;
$list-height: 100%;

small {
  font-size: 18px;
  font-weight: bolder;
  display: block;
  text-align: center;
}
.left_menu_bar {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: rgba(161, 189, 243, 0.29);
  width: $list-width;
  height: $list-height;
}
.list {
  width: $list-width;
}
.left_menu_bar > .md-list {
  width: $list-width;
  max-width: 100%;
  height: 100%;
  display: inline-block;
  overflow: auto;
  border: 1px solid rgba(#000, 0.12);
  vertical-align: top;
}
.md-layout {
  width: 100%;
  justify-content: center;
}
.md-button {
  opacity: 0.9;
  border-radius: 0.5em;
}
.md-button.md-raised {
  box-shadow: none;
}
footer {
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: 0;
}
.top_align {
  margin-top: 0.5em;
}
</style>
